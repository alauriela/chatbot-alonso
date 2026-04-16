import { Settings, VectorStoreIndex, Document } from "llamaindex";
import { Groq } from "groq-sdk";
import { loadNotionFAQ } from "./notion/loader";

let cachedIndex: VectorStoreIndex | null = null;

// Embeddings simples usando hash MD5 (alternativa gratuita)
async function getSimpleEmbedding(text: string): Promise<number[]> {
  const md5 = require("js-md5");
  const hash = md5(text);
  
  // Convertir hash a vector de 384 dimensiones (compatible con modelos pequeños)
  const embedding: number[] = [];
  for (let i = 0; i < 384; i++) {
    const charCode = hash.charCodeAt(i % hash.length);
    embedding.push((charCode - 65) / 26); // Normalizar entre 0 y 1
  }
  return embedding;
}

export async function initSettings() {
  // Groq se configura directamente en queryIndex()
  console.log("Configuración de Groq lista (modelo: Llama 3)");
}

export async function getIndex(): Promise<VectorStoreIndex> {
  if (cachedIndex) {
    return cachedIndex;
  }

  await initSettings();

  console.log("Cargando preguntas frecuentes de Notion...");
  const documents = await loadNotionFAQ();

  if (documents.length === 0) {
    throw new Error(
      "No se encontraron preguntas frecuentes en Notion. Verifica tu base de datos."
    );
  }

  console.log(`Creando índice con ${documents.length} documentos...`);
  
  // Crear índice simple en memoria con embeddings básicos
  for (const doc of documents) {
    doc.embedding = await getSimpleEmbedding(doc.text);
  }

  cachedIndex = await VectorStoreIndex.fromDocuments(documents);

  return cachedIndex;
}

export async function queryIndex(query: string): Promise<string> {
  const groqApiKey = process.env.GROQ_API_KEY;

  if (!groqApiKey) {
    throw new Error("GROQ_API_KEY no está configurada");
  }

  const groq = new Groq({ apiKey: groqApiKey });

  try {
    // Cargar el índice para obtener contexto relevante
    const index = await getIndex();
    const queryEngine = index.asQueryEngine();
    const response = await queryEngine.query({ query_str: query });

    // Usar Groq para mejorar la respuesta con Llama 3
    const contextualResponse = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Eres un asistente de Alonso & Espinosa, una consultoría operativa especializada en pymes. 
          Responde de forma profesional, clara y concisa. Si no sabes la respuesta, indica que consultes directamente con el equipo.
          Contexto de la base de datos: ${response.response}`,
        },
        {
          role: "user",
          content: query,
        },
      ],
      model: "llama-3.1-70b-versatile",
      max_tokens: 1024,
      temperature: 0.7,
    });

    return (
      contextualResponse.choices[0]?.message?.content ||
      "No pude procesar tu pregunta. Por favor, intenta de nuevo."
    );
  } catch (error) {
    console.error("Error al consultar Groq:", error);
    throw error;
  }
}

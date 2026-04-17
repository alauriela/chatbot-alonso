import { VectorStoreIndex, Document } from "llamaindex";
import { Groq } from "groq-sdk";
import { loadNotionFAQ } from "./notion/loader";
import * as md5 from "js-md5";

let cachedIndex: VectorStoreIndex | null = null;

async function getSimpleEmbedding(text: string): Promise<number[]> {
  const hash = md5(text);
  const embedding: number[] = [];
  for (let i = 0; i < 384; i++) {
    const charCode = hash.charCodeAt(i % hash.length);
    embedding.push((charCode - 65) / 26);
  }
  return embedding;
}

export async function getIndex(): Promise<VectorStoreIndex> {
  if (cachedIndex) return cachedIndex;

  const documents = await loadNotionFAQ();
  if (documents.length === 0) {
    throw new Error("No se encontraron datos en Notion ni locales.");
  }

  for (const doc of documents) {
    doc.embedding = await getSimpleEmbedding(doc.text);
  }

  cachedIndex = await VectorStoreIndex.fromDocuments(documents);
  return cachedIndex;
}

export async function queryIndex(query: string): Promise<string> {
  const groqApiKey = process.env.GROQ_API_KEY;
  if (!groqApiKey) throw new Error("GROQ_API_KEY no configurada");

  const groq = new Groq({ apiKey: groqApiKey });

  try {
    const index = await getIndex();
    const queryEngine = index.asQueryEngine();
    const response = await queryEngine.query({ query_str: query });

    const contextualResponse = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Eres un asistente virtual de Alonso & Espinosa, una consultoría operativa especializada en pymes y en el sector de la construcción.
          Tu objetivo es ayudar a los clientes a entender cómo el "Método A&E" (Orden > Tecnología) puede mejorar sus negocios.
          Especialidades:
          - Gestión de proyectos de construcción y reformas.
          - Optimización de presupuestos de obra.
          - Digitalización y orden operativo para pymes.
          
          Responde de forma profesional, clara y concisa. Si no sabes la respuesta, indica que consultes directamente con el equipo en alonsoespinosa.com.
          Contexto relevante: ${response.response}`,
        },
        { role: "user", content: query },
      ],
      model: "llama-3.1-70b-versatile",
      max_tokens: 1024,
      temperature: 0.7,
    });

    return contextualResponse.choices[0]?.message?.content || "No pude procesar tu pregunta.";
  } catch (error) {
    console.error("Error en queryIndex:", error);
    throw error;
  }
}

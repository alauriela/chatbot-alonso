import { Settings, VectorStoreIndex, Document } from "llamaindex";
import { OpenAI, OpenAIEmbedding } from "@llamaindex/openai";
import { loadNotionFAQ } from "./notion/loader";

let cachedIndex: VectorStoreIndex | null = null;

export async function initSettings() {
  Settings.llm = new OpenAI({
    model: process.env.MODEL ?? "gpt-4o-mini",
    apiKey: process.env.OPENAI_API_KEY,
    maxTokens: process.env.LLM_MAX_TOKENS
      ? Number(process.env.LLM_MAX_TOKENS)
      : 1024,
  });

  Settings.embedModel = new OpenAIEmbedding({
    model: process.env.EMBEDDING_MODEL ?? "text-embedding-3-small",
    apiKey: process.env.OPENAI_API_KEY,
    dimensions: process.env.EMBEDDING_DIM
      ? parseInt(process.env.EMBEDDING_DIM)
      : 1536,
  });
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
  cachedIndex = await VectorStoreIndex.fromDocuments(documents);

  return cachedIndex;
}

export async function queryIndex(query: string): Promise<string> {
  const index = await getIndex();
  const queryEngine = index.asQueryEngine();
  const response = await queryEngine.query({ query_str: query });
  return response.response;
}

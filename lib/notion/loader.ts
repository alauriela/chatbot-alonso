import { Client } from "@notionhq/client";
import { Document } from "llamaindex";
import { SimpleDirectoryReader } from "@llamaindex/readers/directory";
import path from "path";

export async function loadNotionFAQ(): Promise<Document[]> {
  const notionToken = process.env.NOTION_INTEGRATION_TOKEN;
  const databaseIds = process.env.NOTION_DATABASE_ID?.split(",") || [];

  const documents: Document[] = [];

  // 1. Cargar desde Notion
  if (notionToken && databaseIds.length > 0) {
    const notion = new Client({ auth: notionToken });
    for (const databaseId of databaseIds) {
      try {
        console.log(`Consultando Notion: ${databaseId.trim()}`);
        const response = await notion.databases.query({
          database_id: databaseId.trim(),
        });

        for (const page of response.results) {
          const properties = (page as any).properties;
          let question = "";
          let answer = "";

          // Mapeo flexible de propiedades de Notion
          const qProps = ["Pregunta", "Question", "Título", "Title"];
          const aProps = ["Respuesta", "Answer", "Contenido", "Content"];

          for (const p of qProps) {
            if (properties[p]?.rich_text) question = properties[p].rich_text.map((t: any) => t.plain_text).join("");
            else if (properties[p]?.title) question = properties[p].title.map((t: any) => t.plain_text).join("");
            if (question) break;
          }

          for (const p of aProps) {
            if (properties[p]?.rich_text) answer = properties[p].rich_text.map((t: any) => t.plain_text).join("");
            if (answer) break;
          }

          if (question && answer) {
            documents.push(new Document({
              text: `Pregunta: ${question}\n\nRespuesta: ${answer}`,
              metadata: { source: "notion", pageId: page.id }
            }));
          }
        }
      } catch (e) {
        console.error(`Error en base de datos ${databaseId}:`, e);
      }
    }
  }

  // 2. Cargar archivos locales (Construcción)
  try {
    const dataPath = path.join(process.cwd(), "data/construccion");
    const reader = new SimpleDirectoryReader();
    const localDocs = await reader.loadData(dataPath);
    for (const doc of localDocs) {
      documents.push(new Document({
        text: doc.text,
        metadata: { ...doc.metadata, source: "local_file" }
      }));
    }
  } catch (e) {
    console.warn("No se encontraron archivos locales en data/construccion");
  }

  return documents;
}

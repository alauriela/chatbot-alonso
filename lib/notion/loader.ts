import { Client } from "@notionhq/client";
import { Document } from "llamaindex";
import { SimpleDirectoryReader } from "@llamaindex/readers/directory";
import path from "path";

export async function loadNotionFAQ(): Promise<Document[]> {
  const notionToken = process.env.NOTION_INTEGRATION_TOKEN;
  const databaseIds = process.env.NOTION_DATABASE_ID?.split(",") || [];

  if (!notionToken || databaseIds.length === 0) {
    console.warn("NOTION_INTEGRATION_TOKEN o NOTION_DATABASE_ID no están configurados correctamente");
  }

  const documents: Document[] = [];

  // Cargar desde Notion si hay token e IDs
  if (notionToken && databaseIds.length > 0) {
    const notion = new Client({ auth: notionToken });

    for (const databaseId of databaseIds) {
      try {
        console.log(`Consultando base de datos de Notion: ${databaseId.trim()}`);
        const response = await notion.databases.query({
          database_id: databaseId.trim(),
        });

        for (const page of response.results) {
          const pageId = page.id;
          const properties = (page as any).properties;

          let question = "";
          let answer = "";

          // Extraer pregunta
          if (properties.Pregunta?.rich_text) {
            question = properties.Pregunta.rich_text.map((t: any) => t.plain_text).join("");
          } else if (properties.Question?.rich_text) {
            question = properties.Question.rich_text.map((t: any) => t.plain_text).join("");
          } else if (properties.Título?.title) {
            question = properties.Título.title.map((t: any) => t.plain_text).join("");
          } else if (properties.Title?.title) {
            question = properties.Title.title.map((t: any) => t.plain_text).join("");
          }

          // Extraer respuesta
          if (properties.Respuesta?.rich_text) {
            answer = properties.Respuesta.rich_text.map((t: any) => t.plain_text).join("");
          } else if (properties.Answer?.rich_text) {
            answer = properties.Answer.rich_text.map((t: any) => t.plain_text).join("");
          } else if (properties.Contenido?.rich_text) {
            answer = properties.Contenido.rich_text.map((t: any) => t.plain_text).join("");
          } else if (properties.Content?.rich_text) {
            answer = properties.Content.rich_text.map((t: any) => t.plain_text).join("");
          }

          if (question && answer) {
            documents.push(
              new Document({
                id_: pageId,
                text: `Pregunta: ${question}\n\nRespuesta: ${answer}`,
                metadata: {
                  source: "notion",
                  databaseId,
                  question,
                  pageId,
                },
              })
            );
          }
        }
      } catch (error) {
        console.error(`Error al cargar datos de la base de datos ${databaseId}:`, error);
      }
    }
  }

  // Cargar archivos locales (Sector Construcción)
  try {
    const dataPath = path.join(process.cwd(), "data/construccion");
    console.log(`Cargando documentos locales desde: ${dataPath}`);
    const reader = new SimpleDirectoryReader();
    const localDocs = await reader.loadData(dataPath);
    
    for (const doc of localDocs) {
      documents.push(new Document({
        text: doc.text,
        metadata: {
          ...doc.metadata,
          source: "local_file"
        }
      }));
    }
    console.log(`Cargados ${localDocs.length} documentos locales.`);
  } catch (error) {
    console.error("Error al cargar documentos locales:", error);
  }

  console.log(`Total de documentos cargados para el índice: ${documents.length}`);
  return documents;
}

import { Client } from "@notionhq/client";
import { Document } from "llamaindex";

export async function loadNotionFAQ(): Promise<Document[]> {
  const notionToken = process.env.NOTION_INTEGRATION_TOKEN;
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!notionToken || !databaseId) {
    throw new Error(
      "NOTION_INTEGRATION_TOKEN y NOTION_DATABASE_ID no están configurados"
    );
  }

  const notion = new Client({ auth: notionToken });

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
    });

    const documents: Document[] = [];

    for (const page of response.results) {
      const pageId = page.id;
      const properties = page.properties as any;

      // Extrae pregunta y respuesta según la estructura de tu Notion
      let question = "";
      let answer = "";

      // Busca campos comunes: "Pregunta", "Question", "Título", "Title"
      if (properties.Pregunta?.rich_text) {
        question = properties.Pregunta.rich_text.map((t: any) => t.plain_text).join("");
      } else if (properties.Question?.rich_text) {
        question = properties.Question.rich_text.map((t: any) => t.plain_text).join("");
      } else if (properties.Título?.title) {
        question = properties.Título.title.map((t: any) => t.plain_text).join("");
      } else if (properties.Title?.title) {
        question = properties.Title.title.map((t: any) => t.plain_text).join("");
      }

      // Busca respuesta: "Respuesta", "Answer", "Contenido", "Content"
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
              question,
              pageId,
            },
          })
        );
      }
    }

    console.log(`Cargadas ${documents.length} preguntas frecuentes de Notion`);
    return documents;
  } catch (error) {
    console.error("Error al cargar datos de Notion:", error);
    throw error;
  }
}

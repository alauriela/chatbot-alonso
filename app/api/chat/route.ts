import { NextRequest, NextResponse } from "next/server";
import { queryIndex } from "@/lib/llama-index";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!messages || messages.length === 0) {
      return NextResponse.json(
        { error: "No messages provided" },
        { status: 400 }
      );
    }

    // Obtén el último mensaje del usuario
    const userMessage = messages[messages.length - 1];
    if (userMessage.role !== "user") {
      return NextResponse.json(
        { error: "Last message must be from user" },
        { status: 400 }
      );
    }

    const query = userMessage.content;
    console.log(`[Chat API] Query: ${query}`);

    // Consulta el índice de LlamaIndex
    const response = await queryIndex(query);

    return NextResponse.json({
      role: "assistant",
      content: response,
    });
  } catch (error) {
    console.error("[Chat API Error]", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Error procesando la consulta",
      },
      { status: 500 }
    );
  }
}

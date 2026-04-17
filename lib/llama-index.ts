import { Groq } from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function getSimpleEmbedding(text: string): Promise<number[]> {
  const embedding: number[] = new Array(384).fill(0).map((_, i) => (text.charCodeAt(i % text.length) || 0) / 255);
  return embedding;
}

export async function queryChatbot(message: string, context: string) {
  const completion = await groq.chat.completions.create({
    messages: [
      { role: "system", content: "Eres un asistente experto en el Método A&E y construcción. Contexto: " + context },
      { role: "user", content: message }
    ],
    model: "llama-3.1-70b-versatile",
  });
  return (completion.choices[0] as any).message.content;
}

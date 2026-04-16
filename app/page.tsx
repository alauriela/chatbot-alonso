import { ChatBot } from "@/components/ChatBot";

export default function Home() {
  return (
    <main style={{ padding: "40px 20px", minHeight: "100vh" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h1
          style={{
            textAlign: "center",
            marginBottom: "10px",
            color: "#2e4a5a",
            fontFamily: "Lora, Georgia, serif",
          }}
        >
          Alonso & Espinosa
        </h1>
        <p
          style={{
            textAlign: "center",
            marginBottom: "30px",
            color: "#6b6b6b",
          }}
        >
          Preguntas Frecuentes
        </p>
        <ChatBot />
      </div>
    </main>
  );
}

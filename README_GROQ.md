# Chatbot Alonso & Espinosa - Versión Groq (100% Gratuita)

Chatbot de preguntas frecuentes conectado a Notion, usando **Groq** (gratuito) en lugar de OpenAI.

## 🚀 Características

- ✅ **100% Gratuito**: Usa Groq con Llama 3 (sin costes de API)
- ✅ **Conectado a Notion**: Lee tus FAQs directamente de tu base de datos
- ✅ **Respuestas Inteligentes**: Powered by Llama 3 (modelo de IA de código abierto)
- ✅ **Rápido**: Groq es uno de los proveedores más rápidos del mercado
- ✅ **Embebible**: Integrable en cualquier página web

## 📋 Requisitos (Solo 2 Claves Gratuitas)

1. **Groq API Key**: Obtén una GRATIS en https://console.groq.com/ (1 minuto)
2. **Notion Integration Token**: Crea una integración en https://www.notion.so/my-integrations (1 minuto)
3. **Notion Database ID**: El ID de tu base de datos de FAQs

## 🔧 Configuración Local

### 1. Instalar dependencias

```bash
npm install
```

### 2. Obtener Groq API Key (GRATIS)

1. Ve a https://console.groq.com/
2. Regístrate con tu email (es gratis)
3. Ve a "API Keys" y copia tu clave
4. Pégala en `.env.local`

### 3. Crear archivo `.env.local`

```bash
cp .env.example .env.local
```

Edita `.env.local`:

```
GROQ_API_KEY=gsk_tu-clave-aqui
NOTION_INTEGRATION_TOKEN=notiontok_tu-token-aqui
NOTION_DATABASE_ID=tu-database-id-aqui
```

### 4. Ejecutar localmente

```bash
npm run dev
```

Abre http://localhost:3000

## 🌐 Desplegar en Vercel (GRATIS)

### 1. Conectar GitHub a Vercel

1. Ve a https://vercel.com/new
2. Selecciona tu repositorio `chatbot-alonso`
3. Vercel detectará automáticamente que es Next.js

### 2. Configurar Variables de Entorno

En el panel de Vercel, ve a **Settings** → **Environment Variables** y añade:

```
GROQ_API_KEY = gsk_...
NOTION_INTEGRATION_TOKEN = notiontok_...
NOTION_DATABASE_ID = ...
```

### 3. Desplegar

Haz clic en **Deploy**. ¡Listo!

Tu chatbot estará disponible en: `https://chatbot-alonso.vercel.app`

## 📱 Embeber en tu Web

Para embeber el chatbot en `alonsoespinosa.com`:

```html
<iframe
  src="https://chatbot-alonso.vercel.app"
  width="100%"
  height="600px"
  style="border: none; border-radius: 12px;"
></iframe>
```

O crea una página específica:

```html
<!-- preguntas-frecuentes.html -->
<section style="max-width: 800px; margin: 0 auto; padding: 40px 20px;">
  <h1>Preguntas Frecuentes</h1>
  <iframe
    src="https://chatbot-alonso.vercel.app"
    width="100%"
    height="600px"
    style="border: none; border-radius: 12px; margin-top: 20px;"
  ></iframe>
</section>
```

## 💰 Costes

| Servicio | Coste |
| --- | --- |
| Groq (Llama 3) | **GRATIS** (hasta 30 req/min) |
| Notion API | **GRATIS** (hasta 3 req/seg) |
| Vercel Hosting | **GRATIS** (hasta 100 GB/mes) |
| **TOTAL** | **$0 USD** |

## 🔌 Estructura de la Base de Datos en Notion

Tu base de datos debe tener al menos estas propiedades:

| Campo | Tipo | Descripción |
| --- | --- | --- |
| Pregunta | Text | La pregunta del usuario |
| Respuesta | Text | La respuesta completa |

El sistema detecta automáticamente campos comunes.

## 🐛 Solución de Problemas

### Error: "GROQ_API_KEY no está configurada"

- Ve a https://console.groq.com/ y copia tu clave
- Verifica que está correcta en Vercel

### El chatbot responde lentamente

- Groq es muy rápido, pero la primera consulta puede tardar 1-2 segundos
- Las siguientes serán instantáneas

### "No se encontraron preguntas frecuentes en Notion"

- Verifica que tu base de datos tiene al menos una página
- Asegúrate de que la integración tiene permisos de lectura

## 📚 Documentación

- [Groq Console](https://console.groq.com/)
- [Notion API](https://developers.notion.com/)
- [Vercel Docs](https://vercel.com/docs)
- [Next.js Docs](https://nextjs.org/docs)

## ✨ Ventajas de esta Versión

- **Sin costes mensuales**: Groq es completamente gratuito para uso moderado
- **Modelo potente**: Llama 3 es uno de los mejores modelos open-source
- **Velocidad**: Groq es conocido por su latencia ultra-baja
- **Privacidad**: Tu data de Notion no se envía a OpenAI
- **Sostenibilidad**: Perfecto para pymes y consultorías

## 🚀 Próximos Pasos

1. Obtén tu Groq API Key (1 minuto)
2. Configura Vercel con las 3 variables de entorno
3. ¡Disfruta de tu chatbot gratuito!

---

**¿Preguntas?** Consulta el README.md o abre un issue en GitHub.

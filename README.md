🧠 Multi-Agent Content Pipeline (Next.js + Supabase + Groq + TipTap Editor)
🚀 Live Demo: https://multi-agent-content-pipeline.vercel.app

An AI-powered multi-agent workflow that transforms a PRD into a polished article using multiple intelligent agents:

Researcher Agent

Writer Agent

Fact-Checker Agent

Polisher Agent

Includes a full dashboard, article editor, PDF export, and Supabase storage.

✨ Features
🤖 AI Multi-Agent Workflow

Each agent performs a unique task:

🧠 Researcher → Extracts insights

✍️ Writer → Produces structured draft

🛡 Fact-Checker → Verifies claims

✨ Polisher → Produces final human-quality content

Includes animated timeline showing each step in real-time.

📄 Article Management Dashboard

Save final articles to Supabase

View all saved articles

Edit articles using TipTap Rich-Text Editor

Delete articles

Export final content as PDF

🎨 Modern UI

Tailwind CSS

Animated steps UI

Slide-up modal for agent logs

Clean & professional dashboard

🏗 Tech Stack
Layer	Technology
Frontend	Next.js 15+, TailwindCSS
Backend	Next.js API Routes
Database	Supabase
AI Models	Groq (Llama 3.1)
Editor	TipTap
UI Effects	Framer Motion
📂 Project Structure
/app
  /api
    generate/route.ts  → Multi-agent pipeline
    save/route.ts      → Save article
    list/route.ts      → Fetch saved articles
    article/route.ts   → Get one article
    update/route.ts    → Update one article
    delete/route.ts    → Delete article
  page.tsx              → Main UI
  /dashboard
    page.tsx            → List articles
    /[id]/page.tsx      → Edit article
/components
  Timeline.tsx
  AgentLogs.tsx
  RichEditor.tsx
/lib
  supabaseClient.ts
  groq.ts

⚙️ Local Setup
1️⃣ Clone Repo
git clone https://github.com/usamajay/multi-agent-content-pipeline.git
cd multi-agent-content-pipeline

2️⃣ Install Dependencies
npm install

3️⃣ Setup Environment Variables

Create a file:

.env.local


Add:

NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
GROQ_API_KEY=your_key

4️⃣ Run Dev Server
npm run dev

🚀 Deploying to Vercel
Step 1 — Go to Vercel

https://vercel.com/new

Step 2 — Import GitHub Repository

Select:

usamajay/multi-agent-content-pipeline

Step 3 — Add Environment Variables

In Vercel → Project → Settings → Environment Variables

Add:

Key	Value
NEXT_PUBLIC_SUPABASE_URL	your Supabase URL
NEXT_PUBLIC_SUPABASE_ANON_KEY	your Supabase anon key
GROQ_API_KEY	your Groq API key

Then click Redeploy.

Step 4 — You’re Live 🎉

Your live link (already deployed):

https://multi-agent-content-pipeline.vercel.app

❗Troubleshooting
Groq "model_decommissioned" error

Use the updated model:

model: "llama-3.1-70b-versatile"

Dashboard shows empty

Fix: ensure Supabase URL & keys are correct both locally & in Vercel.

⭐ Show Support

If you like this project, consider giving the repo a GitHub star ⭐!
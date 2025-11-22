import { groq } from "@/lib/groq";
import { supabase } from "@/lib/supabaseClient";

export async function researcherAgent(
  prd: string,
  runId: string
): Promise<string> {
  const prompt = `
You are a RESEARCHER AGENT.

Your job:
- Extract key product insights
- Extract features, benefits, market info
- DO NOT write the blog post

PRD:
${prd}
`;

  const completion = await groq.chat.completions.create({
    // model: "llama3-70b-8192",
    model: "llama-3.1-8b-instant",
    messages: [{ role: "user", content: prompt }],
  });

  const output: string = completion.choices[0].message?.content || "";

  await supabase.from("agent_logs").insert({
    run_id: runId,
    agent: "researcher",
    input: prd,
    output,
  });

  return output;
}

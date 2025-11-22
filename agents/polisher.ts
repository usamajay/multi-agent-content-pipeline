import { groq } from "@/lib/groq";
import { supabase } from "@/lib/supabaseClient";

export async function polisherAgent(
  factCheckedDraft: string,
  runId: string
): Promise<string> {
  const prompt = `
You are a POLISHER AGENT.

Improve structure, tone, readability, and style.
Do NOT change facts.

Draft:
${factCheckedDraft}
`;

  const completion = await groq.chat.completions.create({
    // model: "llama3-70b-8192",
    model: "llama-3.1-8b-instant",
    messages: [{ role: "user", content: prompt }],
  });

  const output: string = completion.choices[0].message?.content || "";

  await supabase.from("agent_logs").insert({
    run_id: runId,
    agent: "polisher",
    input: factCheckedDraft,
    output,
  });

  return output;
}

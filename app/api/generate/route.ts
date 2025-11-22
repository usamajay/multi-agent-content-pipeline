import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

import { researcherAgent } from "@/agents/researcher";
import { writerAgent } from "@/agents/writer";
import { factCheckerAgent } from "@/agents/factChecker";
import { polisherAgent } from "@/agents/polisher";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Always force PRD to be a clean string
    const prd: string = (body?.prd ?? "").toString();

    if (!prd || prd.length < 10) {
      return NextResponse.json(
        { error: "Invalid PRD. Please provide a longer PRD text." },
        { status: 400 }
      );
    }

    const runId = uuidv4();

    // Cast everything to guaranteed string to remove nullable types
    const researchNotes: string = String(await researcherAgent(prd, runId));
    const draft: string = String(await writerAgent(researchNotes, runId));
    const factChecked: string = String(
      await factCheckerAgent(draft, runId)
    );
    const polished: string = String(
      await polisherAgent(factChecked, runId)
    );

    return NextResponse.json({
      runId,
      researcher: researchNotes,
      draft,
      factChecked,
      final: polished,
    });
  } catch (error: any) {
    console.error("Pipeline error:", error);
    return NextResponse.json(
      { error: "Pipeline failed", details: error.message },
      { status: 500 }
    );
  }
}

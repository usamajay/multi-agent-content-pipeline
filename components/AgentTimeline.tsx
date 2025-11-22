"use client";
import AgentStep from "./AgentStep";

interface AgentTimelineProps {
  steps: {
    label: string;
    status: "pending" | "running" | "done";
  }[];
}

export default function AgentTimeline({ steps }: AgentTimelineProps) {
  return (
    <div className="mt-8 p-6 rounded-xl border bg-white/60 backdrop-blur">
      {steps.map((step, i) => (
        <AgentStep key={i} label={step.label} status={step.status} />
      ))}
    </div>
  );
}

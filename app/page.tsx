"use client";

import React, { useState } from "react";
import Timeline from "@/components/Timeline";
import AgentLogs from "@/components/AgentLogs";
import { jsPDF } from "jspdf";

type TimelineStatus = "pending" | "running" | "done";
interface TimelineStep {
  label: string;
  status: TimelineStatus;
}

export default function Home() {
  const [prd, setPrd] = useState("");
  const [loading, setLoading] = useState(false);
  const [logsOpen, setLogsOpen] = useState(false);

  const [researcher, setResearcher] = useState("");
  const [draft, setDraft] = useState("");
  const [factChecked, setFactChecked] = useState("");
  const [finalOutput, setFinalOutput] = useState("");

  const [timeline, setTimeline] = useState<TimelineStep[]>([
    { label: "Researcher Agent", status: "pending" },
    { label: "Writer Agent", status: "pending" },
    { label: "Fact Checker Agent", status: "pending" },
    { label: "Polisher Agent", status: "pending" },
  ]);

  const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const copyToClipboard = () => {
    navigator.clipboard.writeText(finalOutput);
    alert("Article copied!");
  };

  const downloadPDF = () => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const margin = 40;
    const maxWidth = 515;

    const lines = doc.splitTextToSize(finalOutput, maxWidth);
    doc.text(lines, margin, margin);
    doc.save("final_article.pdf");
  };

  async function saveArticle() {
    if (!finalOutput) return;
    const res = await fetch("/api/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: prd.slice(0, 50) + "...",
        content: finalOutput,
      }),
    });

    const data = await res.json();
    if (data.error) alert("Error saving article");
    else alert("Saved to Supabase!");
  }

  async function handleGenerate() {
    setLoading(true);

    setResearcher("");
    setDraft("");
    setFactChecked("");
    setFinalOutput("");

    setTimeline([
      { label: "Researcher Agent", status: "running" },
      { label: "Writer Agent", status: "pending" },
      { label: "Fact Checker Agent", status: "pending" },
      { label: "Polisher Agent", status: "pending" },
    ]);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prd }),
      });

      const data = await res.json();

      // Step 1 — Researcher
      await wait(900);
      setResearcher(data.researcher);
      setTimeline((t) => [
        { label: "Researcher Agent", status: "done" },
        { label: "Writer Agent", status: "running" },
        { label: "Fact Checker Agent", status: "pending" },
        { label: "Polisher Agent", status: "pending" },
      ]);

      // Step 2 — Writer
      await wait(900);
      setDraft(data.draft);
      setTimeline((t) => [
        { label: "Researcher Agent", status: "done" },
        { label: "Writer Agent", status: "done" },
        { label: "Fact Checker Agent", status: "running" },
        { label: "Polisher Agent", status: "pending" },
      ]);

      // Step 3 — Fact Checker
      await wait(900);
      setFactChecked(data.factChecked);
      setTimeline((t) => [
        { label: "Researcher Agent", status: "done" },
        { label: "Writer Agent", status: "done" },
        { label: "Fact Checker Agent", status: "done" },
        { label: "Polisher Agent", status: "running" },
      ]);

      // Step 4 — Polisher
      await wait(900);
      setFinalOutput(data.final);
      setTimeline((t) => [
        { label: "Researcher Agent", status: "done" },
        { label: "Writer Agent", status: "done" },
        { label: "Fact Checker Agent", status: "done" },
        { label: "Polisher Agent", status: "done" },
      ]);
    } catch (e) {
      console.error(e);
      alert("Pipeline failed.");
    }

    setLoading(false);
  }

  return (
    <div className="max-w-5xl mx-auto p-10">

      {/* HEADER */}
      <h1 className="text-4xl font-extrabold mb-10 text-center bg-linear-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
        Multi-Agent Content Pipeline
      </h1>

      {/* INPUT AREA CARD */}
      <div className="bg-white p-6 rounded-xl shadow-xl border mb-10">
        <textarea
          className="w-full border p-4 rounded-lg h-48 focus:ring-2 focus:ring-blue-500"
          placeholder="Paste your PRD here..."
          value={prd}
          onChange={(e) => setPrd(e.target.value)}
        />

        <div className="mt-6 flex gap-4">
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? "Running Agents..." : "Generate Article"}
          </button>

          <button
            onClick={() => setLogsOpen(true)}
            className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-black"
          >
            Logs
          </button>

          <a
            href="/dashboard"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Saved Articles
          </a>
        </div>
      </div>

      {/* TIMELINE */}
      <Timeline steps={timeline} />

      {/* OUTPUT SECTIONS */}
      <div className="space-y-8 mt-10">
        {researcher && (
          <OutputCard title="🔍 Research Notes" content={researcher} />
        )}
        {draft && <OutputCard title="✍️ First Draft" content={draft} />}
        {factChecked && (
          <OutputCard title="🛡 Fact Checked" content={factChecked} />
        )}
      </div>

      {/* FINAL OUTPUT */}
      {finalOutput && (
        <div className="bg-green-50 border p-6 rounded-xl mt-10 shadow">
          <h2 className="text-2xl font-bold mb-4">✨ Final Polished Article</h2>
          <p className="whitespace-pre-line">{finalOutput}</p>

          {/* Action buttons */}
          <div className="mt-6 flex gap-4">
            <button
              onClick={copyToClipboard}
              className="px-5 py-2 bg-gray-800 text-white rounded-lg hover:bg-black"
            >
              Copy
            </button>

            <button
              onClick={downloadPDF}
              className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Download PDF
            </button>

            <button
              onClick={saveArticle}
              className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Save Article
            </button>
          </div>
        </div>
      )}

      <AgentLogs
        researcher={researcher}
        draft={draft}
        factChecked={factChecked}
        finalOutput={finalOutput}
        open={logsOpen}
        onClose={() => setLogsOpen(false)}
      />
    </div>
  );
}

function OutputCard({ title, content }: { title: string; content: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow border">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="whitespace-pre-line">{content}</p>
    </div>
  );
}

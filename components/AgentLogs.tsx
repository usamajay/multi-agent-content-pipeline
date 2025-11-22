"use client";

import React from "react";
import { X } from "lucide-react";

export default function AgentLogs({
  researcher,
  draft,
  factChecked,
  finalOutput,
  open,
  onClose,
}: {
  researcher: string;
  draft: string;
  factChecked: string;
  finalOutput: string;
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      {/* Modal Box */}
      <div className="bg-white rounded-xl shadow-2xl w-[90%] max-w-3xl max-h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Agent Logs</h2>
          <button
            onClick={onClose}
            className="p-2 rounded hover:bg-gray-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto max-h-[70vh] space-y-8">

          {researcher && (
            <section>
              <h3 className="font-semibold text-lg mb-2">🔍 Researcher Output</h3>
              <p className="whitespace-pre-line text-gray-700 bg-gray-50 p-3 rounded-lg border">
                {researcher}
              </p>
            </section>
          )}

          {draft && (
            <section>
              <h3 className="font-semibold text-lg mb-2">✍️ Writer Draft</h3>
              <p className="whitespace-pre-line text-gray-700 bg-gray-50 p-3 rounded-lg border">
                {draft}
              </p>
            </section>
          )}

          {factChecked && (
            <section>
              <h3 className="font-semibold text-lg mb-2">🛡 Fact Checker Notes</h3>
              <p className="whitespace-pre-line text-gray-700 bg-gray-50 p-3 rounded-lg border">
                {factChecked}
              </p>
            </section>
          )}

          {finalOutput && (
            <section>
              <h3 className="font-semibold text-lg mb-2">✨ Final Polished Output</h3>
              <p className="whitespace-pre-line text-gray-700 bg-green-50 p-3 rounded-lg border">
                {finalOutput}
              </p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

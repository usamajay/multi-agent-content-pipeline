"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const RichEditor = dynamic(() => import("@/components/RichEditor"), {
  ssr: false,
});

export default function EditArticle() {
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname.split("/").pop();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function loadArticle() {
    const res = await fetch(`/api/article?id=${id}`);
    const data = await res.json();

    console.log("Loaded article:", data);

    if (!data.article) {
      console.error("Article not found");
      return;
    }

    setTitle(data.article.title);
    setContent(data.article.content);
  }

  async function saveChanges() {
    await fetch("/api/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, title, content }),
    });

    alert("Article updated successfully!");
    router.push("/dashboard");
  }

  useEffect(() => {
    loadArticle();
  }, []);

  return (
    <div className="p-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edit Article</h1>

      <input
        className="w-full border p-3 rounded-lg mb-4"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <RichEditor content={content} onChange={setContent} />


      <button
        onClick={saveChanges}
        className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-800"
      >
        Save Changes
      </button>
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");

  async function loadArticles() {
    const res = await fetch("/api/list");
    const data = await res.json();
    setArticles(data.articles || []);
  }

  useEffect(() => {
    loadArticles();
  }, []);

  // Filter + Sort system
  const filtered = articles
    .filter((a: any) =>
      a.title.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a: any, b: any) => {
      if (sort === "newest") return b.id - a.id;
      if (sort === "oldest") return a.id - b.id;
      if (sort === "az") return a.title.localeCompare(b.title);
      if (sort === "za") return b.title.localeCompare(a.title);
      return 0;
    });

  return (
    <div className="p-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Saved Articles</h1>

      {/* Search + Sort Controls */}
      <div className="flex gap-4 mb-6">

        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border p-3 rounded-lg"
        />

        <select
          className="border p-3 rounded-lg"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="az">A → Z</option>
          <option value="za">Z → A</option>
        </select>
      </div>

      {/* List of filtered articles */}
      {filtered.map((item: any) => (
        <div key={item.id} className="border p-4 rounded-lg bg-gray-50 mb-4">
          <h2 className="text-xl font-bold">{item.title}</h2>

          <div className="mt-3 flex gap-4">
            <a
              href={`/dashboard/${item.id}`}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800"
            >
              Edit
            </a>

            <button
              onClick={async () => {
                if (!confirm("Delete this article?")) return;
                await fetch("/api/delete", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ id: item.id }),
                });
                loadArticles();
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-800"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

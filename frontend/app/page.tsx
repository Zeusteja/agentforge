"use client";

import { useState } from "react";

export default function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [result, setResult] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function runSprint() {
    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        description
      })
    });

    const data = await res.json();

    setResult(data.outputs || []);
    setLoading(false);
  }

  return (
    <main style={{ padding: 30 }}>
      <h1>AgentForge</h1>

      <input
        placeholder="Sprint title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br />
      <br />

      <textarea
        rows={6}
        cols={60}
        placeholder="Describe your project"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br />
      <br />

      <button onClick={runSprint}>
        {loading ? "Running..." : "Run Sprint"}
      </button>

      <hr />

      {result.map((r, i) => (
        <div key={i}>
          <h3>{r.role}</h3>
          <p>{r.summary}</p>
        </div>
      ))}
    </main>
  );
}

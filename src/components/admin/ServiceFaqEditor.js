"use client";

import { useState } from "react";

function emptyRow() {
  return { question: "", answer: "" };
}

export function ServiceFaqEditor({ defaultItems = [] }) {
  const [items, setItems] = useState(
    defaultItems.length ? defaultItems.map((item) => ({ question: item.question || "", answer: item.answer || "" })) : []
  );

  function move(index, direction) {
    const next = index + direction;
    if (next < 0 || next >= items.length) return;
    setItems((current) => {
      const copy = [...current];
      const [row] = copy.splice(index, 1);
      copy.splice(next, 0, row);
      return copy;
    });
  }

  return (
    <div className="grid gap-3 rounded-2xl border border-white/10 p-4 text-sm">
      <div className="flex items-center justify-between gap-3">
        <p className="font-medium">FAQs</p>
        <button
          type="button"
          className="rounded-full border border-white/15 px-3 py-1 text-xs"
          onClick={() => setItems((current) => [...current, emptyRow()])}
        >
          Add FAQ
        </button>
      </div>
      {!items.length ? <p className="text-xs text-muted">No FAQs yet. Save works without any.</p> : null}
      {items.map((item, index) => (
        <div key={index} className="grid gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-3">
          <input type="hidden" name="faqQuestion" value={item.question} />
          <input type="hidden" name="faqAnswer" value={item.answer} />
          <label className="grid gap-1">
            Question
            <input
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2"
              value={item.question}
              onChange={(event) => {
                const value = event.target.value;
                setItems((current) => current.map((row, i) => (i === index ? { ...row, question: value } : row)));
              }}
            />
          </label>
          <label className="grid gap-1">
            Answer
            <textarea
              className="min-h-24 rounded-xl border border-white/10 bg-white/5 px-3 py-2"
              value={item.answer}
              onChange={(event) => {
                const value = event.target.value;
                setItems((current) => current.map((row, i) => (i === index ? { ...row, answer: value } : row)));
              }}
            />
          </label>
          <div className="flex flex-wrap gap-2 text-xs">
            <button type="button" className="text-accent" disabled={index === 0} onClick={() => move(index, -1)}>
              Move up
            </button>
            <button
              type="button"
              className="text-accent"
              disabled={index === items.length - 1}
              onClick={() => move(index, 1)}
            >
              Move down
            </button>
            <button
              type="button"
              className="text-red-300"
              onClick={() => setItems((current) => current.filter((_, i) => i !== index))}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

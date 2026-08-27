"use client";

import { useRef, useState } from "react";

async function uploadFile(file) {
  const data = new FormData();
  data.append("file", file);
  const response = await fetch("/api/upload", { method: "POST", body: data });
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.error || "Upload failed");
  }
  return json.url;
}

export function UploadField({ label, name, defaultValue = "", required = false }) {
  const inputRef = useRef(null);
  const [url, setUrl] = useState(defaultValue || "");
  const [status, setStatus] = useState("");
  const [dragging, setDragging] = useState(false);

  async function handleFiles(files) {
    const file = files?.[0];
    if (!file) return;
    setStatus("Uploading...");
    try {
      const next = await uploadFile(file);
      setUrl(next);
      setStatus("Uploaded");
    } catch (error) {
      setStatus(error.message);
    }
  }

  return (
    <div className="grid gap-2 text-sm">
      <p>{label}</p>
      <input type="hidden" name={name} value={url} required={required && !url} />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          handleFiles(event.dataTransfer.files);
        }}
        className={`relative overflow-hidden rounded-2xl border border-dashed px-4 py-8 text-left transition ${
          dragging ? "border-accent bg-accent/10" : "border-white/15 bg-white/5"
        }`}
      >
        {url ? (
          <img src={url} alt="" className="mx-auto max-h-56 w-full rounded-xl object-cover" />
        ) : (
          <span className="block text-center text-muted">
            Click or drop an image to upload
            <span className="mt-1 block text-xs">JPG, PNG, WEBP, GIF or SVG · up to 6MB</span>
          </span>
        )}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
        className="hidden"
        onChange={(event) => {
          handleFiles(event.target.files);
          event.target.value = "";
        }}
      />
      <div className="flex items-center justify-between gap-3">
        {status ? <span className="text-xs text-cyan">{status}</span> : <span />}
        {url ? (
          <div className="flex gap-3 text-xs">
            <button type="button" className="text-accent" onClick={() => inputRef.current?.click()}>
              Replace
            </button>
            <button type="button" className="text-red-300" onClick={() => { setUrl(""); setStatus(""); }}>
              Remove
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function GalleryUpload({ name = "gallery", defaultItems = [] }) {
  const inputRef = useRef(null);
  const [items, setItems] = useState(defaultItems);
  const [status, setStatus] = useState("");
  const [dragging, setDragging] = useState(false);

  async function handleFiles(files) {
    const list = [...files].filter((file) => file.type.startsWith("image/"));
    if (!list.length) return;
    setStatus(`Uploading ${list.length} image${list.length > 1 ? "s" : ""}...`);
    try {
      const uploaded = [];
      for (const file of list) {
        uploaded.push(await uploadFile(file));
      }
      setItems((current) => [...current, ...uploaded]);
      setStatus("Uploaded");
    } catch (error) {
      setStatus(error.message);
    }
  }

  return (
    <div className="grid gap-2 text-sm">
      <p>Gallery images</p>
      {items.map((url) => (
        <input key={url} type="hidden" name={name} value={url} />
      ))}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {items.map((url) => (
          <div key={url} className="relative overflow-hidden rounded-xl border border-white/10">
            <img src={url} alt="" className="aspect-video w-full object-cover" />
            <button
              type="button"
              className="absolute right-2 top-2 rounded-full bg-black/70 px-2 py-1 text-xs"
              onClick={() => setItems((current) => current.filter((item) => item !== url))}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(event) => {
            event.preventDefault();
            setDragging(false);
            handleFiles(event.dataTransfer.files);
          }}
          className={`aspect-video rounded-xl border border-dashed text-xs text-muted ${
            dragging ? "border-accent bg-accent/10" : "border-white/15 bg-white/5"
          }`}
        >
          Add images
        </button>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
        multiple
        className="hidden"
        onChange={(event) => {
          handleFiles(event.target.files);
          event.target.value = "";
        }}
      />
      {status ? <span className="text-xs text-cyan">{status}</span> : null}
    </div>
  );
}

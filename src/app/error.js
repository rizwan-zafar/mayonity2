"use client";

export default function ErrorPage({ error, reset }) {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
      <h1 className="display text-5xl">A signal dropped.</h1>
      <p className="mt-4 max-w-md text-muted">{error?.message || "Something went wrong while loading this page."}</p>
      <button type="button" onClick={reset} className="mt-8 rounded-full bg-white px-5 py-3 text-sm text-black">
        Try again
      </button>
    </section>
  );
}

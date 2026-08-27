import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center px-5 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyan">404</p>
      <h1 className="display mt-4 text-6xl">This future does not exist yet.</h1>
      <p className="mt-4 max-w-md text-muted">The page is missing, unpublished, or still being designed.</p>
      <Link href="/" className="mt-8 rounded-full bg-white px-5 py-3 text-sm text-black">
        Return home
      </Link>
    </section>
  );
}

import Link from "next/link";

export default function EntryNotFound() {
  return (
    <main className="not-found-page">
      <section>
        <p className="eyebrow">Entry not found</p>
        <h1>That miscellany entry is not here.</h1>
        <p>The entry may have been renamed, removed, or never added.</p>
        <Link href="/">Return to Gavin&apos;s Miscellany</Link>
      </section>
    </main>
  );
}

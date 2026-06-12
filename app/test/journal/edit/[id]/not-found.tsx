import Link from "next/link";

export default function JournalEditNotFound() {
  return (
    <main className="min-h-screen bg-[#0a0b10] px-5 py-6 text-white sm:px-8 lg:px-10">
      <div className="mx-auto max-w-3xl rounded-[1.8rem] border border-white/8 bg-white/[0.03] px-6 py-10 text-center">
        <p className="text-[0.68rem] uppercase tracking-[0.45em] text-white/50">HisArchives Admin</p>
        <h1 className="mt-4 text-3xl font-light tracking-[0.16em]">Invalid journal entry</h1>
        <p className="mt-4 text-sm leading-7 text-white/65">
          The edit page was opened without a valid entry ID. Go back to the journal list and open the entry again.
        </p>
        <Link
          href="/test/journal"
          className="mt-6 inline-flex rounded-full bg-white px-5 py-3 text-xs uppercase tracking-[0.32em] text-[#111] transition hover:bg-white/90"
        >
          Back to Journal
        </Link>
      </div>
    </main>
  );
}

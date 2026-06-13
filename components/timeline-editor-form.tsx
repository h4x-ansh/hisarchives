"use client";

const statusOptions = ["Active", "Planned"] as const;

type TimelineEditorValues = {
  title: string;
  slug: string;
  date: string;
  year: string;
  summary: string;
  category: string;
  href: string;
  accent: string;
  word: string;
  status: string;
  displayOrder: string;
};

type TimelineEditorFormProps = {
  mode: "create" | "update";
  actionPath: string;
  entryId?: string;
  values: TimelineEditorValues;
};

const inputClass =
  "w-full rounded-[1.1rem] border border-black/8 bg-white px-4 py-3 text-sm text-[#23201d] outline-none transition focus:border-[#8a7b66] focus:ring-2 focus:ring-[#8a7b66]/20";

export function TimelineEditorForm({ mode, actionPath, entryId, values }: TimelineEditorFormProps) {
  return (
    <form action={actionPath} method="post" autoComplete="off" className="space-y-6">
      <input type="hidden" name="mode" value={mode} />
      {entryId ? <input type="hidden" name="id" value={entryId} /> : null}

      <div className="grid gap-4 lg:grid-cols-2">
        <label className="space-y-2">
          <span className="text-xs uppercase tracking-[0.35em] text-[#8b8175]">Title</span>
          <input name="title" required defaultValue={values.title} className={inputClass} placeholder="Entry title" />
        </label>
        <label className="space-y-2">
          <span className="text-xs uppercase tracking-[0.35em] text-[#8b8175]">Slug</span>
          <input name="slug" defaultValue={values.slug} className={inputClass} placeholder="auto-generated if empty" />
        </label>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <label className="space-y-2">
          <span className="text-xs uppercase tracking-[0.35em] text-[#8b8175]">Date</span>
          <input type="date" name="date" required defaultValue={values.date} className={inputClass} />
        </label>
        <label className="space-y-2">
          <span className="text-xs uppercase tracking-[0.35em] text-[#8b8175]">Year label</span>
          <input name="year" defaultValue={values.year} className={inputClass} placeholder="2025 / Future" />
        </label>
        <label className="space-y-2">
          <span className="text-xs uppercase tracking-[0.35em] text-[#8b8175]">Display order</span>
          <input type="number" name="displayOrder" defaultValue={values.displayOrder} className={inputClass} placeholder="0" />
        </label>
      </div>

      <label className="block space-y-2">
        <span className="text-xs uppercase tracking-[0.35em] text-[#8b8175]">Summary</span>
        <textarea
          name="summary"
          required
          rows={3}
          defaultValue={values.summary}
          className="min-h-[6rem] w-full rounded-[1.3rem] border border-black/8 bg-white px-4 py-3 text-sm leading-7 text-[#23201d] outline-none transition focus:border-[#8a7b66] focus:ring-2 focus:ring-[#8a7b66]/20"
          placeholder="One or two sentences for the timeline card"
        />
      </label>

      <div className="grid gap-4 lg:grid-cols-2">
        <label className="space-y-2">
          <span className="text-xs uppercase tracking-[0.35em] text-[#8b8175]">Category</span>
          <input name="category" defaultValue={values.category} className={inputClass} placeholder="Study chapter / Build chapter" />
        </label>
        <label className="space-y-2">
          <span className="text-xs uppercase tracking-[0.35em] text-[#8b8175]">Link (href)</span>
          <input name="href" defaultValue={values.href} className={inputClass} placeholder="/archives/slug" />
        </label>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <label className="space-y-2">
          <span className="text-xs uppercase tracking-[0.35em] text-[#8b8175]">Word</span>
          <input name="word" defaultValue={values.word} className={inputClass} placeholder="CODE" />
        </label>
        <label className="space-y-2">
          <span className="text-xs uppercase tracking-[0.35em] text-[#8b8175]">Accent color</span>
          <div className="flex gap-2">
            <input
              type="color"
              name="accent"
              defaultValue={values.accent || "#8b92a5"}
              className="h-[46px] w-14 shrink-0 cursor-pointer rounded-[0.9rem] border border-black/8 bg-white p-1"
              onChange={(e) => {
                const sibling = e.currentTarget.nextElementSibling as HTMLInputElement | null;
                if (sibling) sibling.value = e.currentTarget.value;
              }}
            />
            <input defaultValue={values.accent} readOnly className={`${inputClass} font-mono`} tabIndex={-1} aria-hidden />
          </div>
        </label>
        <label className="space-y-2">
          <span className="text-xs uppercase tracking-[0.35em] text-[#8b8175]">Status</span>
          <select name="status" defaultValue={values.status} className={inputClass}>
            {statusOptions.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          className="rounded-full bg-[#23201d] px-7 py-3 text-xs uppercase tracking-[0.32em] text-white transition hover:bg-[#3a3530]"
        >
          {mode === "create" ? "Create Entry" : "Save Changes"}
        </button>
      </div>
    </form>
  );
}

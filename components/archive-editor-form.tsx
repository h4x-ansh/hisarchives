"use client";

const statusOptions = ["Draft", "Published"] as const;

type ArchiveEditorValues = {
  title: string;
  archiveDate: string;
  category: string;
  shortSummary: string;
  fullDescription: string;
  status: string;
  coverImageUrl?: string | null;
};

type ArchiveEditorFormProps = {
  mode: "create" | "update";
  actionPath: string;
  archiveId?: string;
  values: ArchiveEditorValues;
};

export function ArchiveEditorForm({ mode, actionPath, archiveId, values }: ArchiveEditorFormProps) {
  return (
    <form action={actionPath} method="post" encType="multipart/form-data" className="space-y-6">
      <input type="hidden" name="mode" value={mode} />
      {archiveId ? <input type="hidden" name="id" value={archiveId} /> : null}

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(16rem,0.8fr)]">
        <label className="space-y-2">
          <span className="text-xs uppercase tracking-[0.35em] text-[#8b8175]">Title</span>
          <input
            name="title"
            required
            defaultValue={values.title}
            className="w-full rounded-[1.1rem] border border-black/8 bg-white px-4 py-3 text-sm text-[#23201d] outline-none transition focus:border-[#8a7b66] focus:ring-2 focus:ring-[#8a7b66]/20"
            placeholder="Archive title"
          />
        </label>

        <label className="space-y-2">
          <span className="text-xs uppercase tracking-[0.35em] text-[#8b8175]">Date</span>
          <input
            type="date"
            name="archiveDate"
            required
            defaultValue={values.archiveDate}
            className="w-full rounded-[1.1rem] border border-black/8 bg-white px-4 py-3 text-sm text-[#23201d] outline-none transition focus:border-[#8a7b66] focus:ring-2 focus:ring-[#8a7b66]/20"
          />
        </label>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_14rem]">
        <label className="space-y-2">
          <span className="text-xs uppercase tracking-[0.35em] text-[#8b8175]">Short Summary</span>
          <textarea
            name="shortSummary"
            required
            rows={5}
            defaultValue={values.shortSummary}
            className="min-h-[8rem] w-full rounded-[1.3rem] border border-black/8 bg-white px-4 py-3 text-sm leading-7 text-[#23201d] outline-none transition focus:border-[#8a7b66] focus:ring-2 focus:ring-[#8a7b66]/20"
            placeholder="One or two lines for the archive shelf"
          />
        </label>

        <div className="space-y-4">
          <label className="block space-y-2">
            <span className="text-xs uppercase tracking-[0.35em] text-[#8b8175]">Category</span>
            <input
              name="category"
              required
              defaultValue={values.category}
              className="w-full rounded-[1.1rem] border border-black/8 bg-white px-4 py-3 text-sm text-[#23201d] outline-none transition focus:border-[#8a7b66] focus:ring-2 focus:ring-[#8a7b66]/20"
              placeholder="Projects / Notes"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-xs uppercase tracking-[0.35em] text-[#8b8175]">Cover image</span>
            <input
              type="file"
              name="coverImage"
              accept="image/*"
              className="w-full rounded-[1.1rem] border border-dashed border-black/12 bg-white px-4 py-3 text-sm text-[#5a5249] file:mr-4 file:rounded-full file:border-0 file:bg-[#e7dcc9] file:px-4 file:py-2 file:text-xs file:uppercase file:tracking-[0.32em] file:text-[#3d3428]"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-xs uppercase tracking-[0.35em] text-[#8b8175]">Status</span>
            <select
              name="status"
              defaultValue={values.status}
              className="w-full rounded-[1.1rem] border border-black/8 bg-white px-4 py-3 text-sm text-[#23201d] outline-none transition focus:border-[#8a7b66] focus:ring-2 focus:ring-[#8a7b66]/20"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <label className="block space-y-2">
        <span className="text-xs uppercase tracking-[0.35em] text-[#8b8175]">Full Description</span>
        <textarea
          name="fullDescription"
          required
          rows={14}
          defaultValue={values.fullDescription}
          className="min-h-[18rem] w-full rounded-[1.3rem] border border-black/8 bg-white px-4 py-3 text-sm leading-7 text-[#23201d] outline-none transition focus:border-[#8a7b66] focus:ring-2 focus:ring-[#8a7b66]/20"
          placeholder="Write the full archive description..."
        />
      </label>

      {values.coverImageUrl ? (
        <div className="space-y-3 rounded-[1.4rem] border border-black/6 bg-white/70 p-4">
          <p className="text-xs uppercase tracking-[0.35em] text-[#8b8175]">Current cover</p>
          <img src={values.coverImageUrl} alt="Current archive cover" className="max-h-72 w-full rounded-[1rem] object-cover" />
          <p className="text-sm leading-7 text-[#5c5449]">Uploading a new image replaces this cover.</p>
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          name="status"
          value="Draft"
          className="rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-medium text-[#2a2622] transition hover:bg-[#f1eadf]"
        >
          Save Draft
        </button>
        <button
          type="submit"
          name="status"
          value="Published"
          className="rounded-full bg-[#1f1b18] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#352d27]"
        >
          Publish
        </button>
      </div>
    </form>
  );
}

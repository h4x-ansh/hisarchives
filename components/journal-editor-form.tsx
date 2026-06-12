"use client";

const moodOptions = ["Reflective", "Focused", "Calm", "Grateful"] as const;

type JournalEditorValues = {
  title: string;
  entryDate: string;
  mood: string;
  tags: string;
  photoCaption: string;
  content: string;
  photoUrl?: string | null;
};

type JournalEditorFormProps = {
  mode: "create" | "update";
  actionPath: string;
  entryId?: string;
  values: JournalEditorValues;
};

export function JournalEditorForm({ mode, actionPath, entryId, values }: JournalEditorFormProps) {
  return (
    <form action={actionPath} method="post" encType="multipart/form-data" className="space-y-6">
      <input type="hidden" name="mode" value={mode} />
      {entryId ? <input type="hidden" name="id" value={entryId} /> : null}

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(16rem,0.8fr)]">
        <label className="space-y-2">
          <span className="text-xs uppercase tracking-[0.35em] text-[#8b8175]">Title</span>
          <input
            name="title"
            required
            defaultValue={values.title}
            className="w-full rounded-[1.1rem] border border-black/8 bg-white px-4 py-3 text-sm text-[#23201d] outline-none transition focus:border-[#8a7b66] focus:ring-2 focus:ring-[#8a7b66]/20"
            placeholder="Entry title"
          />
        </label>

        <label className="space-y-2">
          <span className="text-xs uppercase tracking-[0.35em] text-[#8b8175]">Entry date</span>
          <input
            type="date"
            name="entryDate"
            required
            defaultValue={values.entryDate}
            className="w-full rounded-[1.1rem] border border-black/8 bg-white px-4 py-3 text-sm text-[#23201d] outline-none transition focus:border-[#8a7b66] focus:ring-2 focus:ring-[#8a7b66]/20"
          />
        </label>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_14rem]">
        <label className="space-y-2">
          <span className="text-xs uppercase tracking-[0.35em] text-[#8b8175]">Content</span>
          <textarea
            name="content"
            required
            rows={14}
            defaultValue={values.content}
            className="min-h-[18rem] w-full rounded-[1.3rem] border border-black/8 bg-white px-4 py-3 text-sm leading-7 text-[#23201d] outline-none transition focus:border-[#8a7b66] focus:ring-2 focus:ring-[#8a7b66]/20"
            placeholder="Write the entry here..."
          />
        </label>

        <div className="space-y-4">
          <label className="block space-y-2">
            <span className="text-xs uppercase tracking-[0.35em] text-[#8b8175]">Mood</span>
            <select
              name="mood"
              defaultValue={values.mood}
              className="w-full rounded-[1.1rem] border border-black/8 bg-white px-4 py-3 text-sm text-[#23201d] outline-none transition focus:border-[#8a7b66] focus:ring-2 focus:ring-[#8a7b66]/20"
            >
              {moodOptions.map((mood) => (
                <option key={mood} value={mood}>
                  {mood}
                </option>
              ))}
            </select>
          </label>

          <label className="block space-y-2">
            <span className="text-xs uppercase tracking-[0.35em] text-[#8b8175]">Photo upload</span>
            <input
              type="file"
              name="photo"
              accept="image/*"
              className="w-full rounded-[1.1rem] border border-dashed border-black/12 bg-white px-4 py-3 text-sm text-[#5a5249] file:mr-4 file:rounded-full file:border-0 file:bg-[#e7dcc9] file:px-4 file:py-2 file:text-xs file:uppercase file:tracking-[0.32em] file:text-[#3d3428]"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-xs uppercase tracking-[0.35em] text-[#8b8175]">Photo caption</span>
            <textarea
              name="photoCaption"
              rows={4}
              defaultValue={values.photoCaption}
              className="w-full rounded-[1.1rem] border border-black/8 bg-white px-4 py-3 text-sm leading-7 text-[#23201d] outline-none transition focus:border-[#8a7b66] focus:ring-2 focus:ring-[#8a7b66]/20"
              placeholder="Caption for the uploaded image"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-xs uppercase tracking-[0.35em] text-[#8b8175]">Tags</span>
            <textarea
              name="tags"
              rows={4}
              defaultValue={values.tags}
              className="w-full rounded-[1.1rem] border border-black/8 bg-white px-4 py-3 text-sm leading-7 text-[#23201d] outline-none transition focus:border-[#8a7b66] focus:ring-2 focus:ring-[#8a7b66]/20"
              placeholder="One or more tags, separated by commas or line breaks"
            />
          </label>
        </div>
      </div>

      {values.photoUrl ? (
        <div className="space-y-3 rounded-[1.4rem] border border-black/6 bg-white/70 p-4">
          <p className="text-xs uppercase tracking-[0.35em] text-[#8b8175]">Current photo</p>
          <img src={values.photoUrl} alt="Current journal photo" className="max-h-72 w-full rounded-[1rem] object-cover" />
          <p className="text-sm leading-7 text-[#5c5449]">Uploading a new photo replaces this image.</p>
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          name="published"
          value="false"
          className="rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-medium text-[#2a2622] transition hover:bg-[#f1eadf]"
        >
          Save Draft
        </button>
        <button
          type="submit"
          name="published"
          value="true"
          className="rounded-full bg-[#1f1b18] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#352d27]"
        >
          Publish
        </button>
      </div>
    </form>
  );
}

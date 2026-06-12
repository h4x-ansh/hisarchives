"use client";

import { useEffect, useState } from "react";

export type CuratedEditorValues = {
  title: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  externalLink: string;
  displayOrder: string;
  status: "Draft" | "Published";
  imageUrl: string;
};

export function CuratedEditorForm({
  mode,
  actionPath,
  curatedId,
  values,
  }: {
  mode: "create" | "update";
  actionPath: string;
  curatedId?: string;
  values: CuratedEditorValues;
}) {
  const [imagePreview, setImagePreview] = useState(values.imageUrl);

  useEffect(() => {
    setImagePreview(values.imageUrl);
  }, [values.imageUrl]);

  return (
    <form action={actionPath} method="post" encType="multipart/form-data" className="space-y-6">
      <input type="hidden" name="mode" value={mode} />
      {curatedId ? <input type="hidden" name="id" value={curatedId} /> : null}

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="space-y-5">
          <label className="block space-y-2">
            <span className="text-[0.66rem] uppercase tracking-[0.42em] text-white/45">Title</span>
            <input
              name="title"
              defaultValue={values.title}
              className="w-full rounded-[1.1rem] border border-white/10 bg-black/20 px-4 py-3 text-white outline-none ring-0 placeholder:text-white/30 focus:border-white/20"
              placeholder="Curated title"
              required
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block space-y-2">
              <span className="text-[0.66rem] uppercase tracking-[0.42em] text-white/45">Category</span>
              <input
                name="category"
                defaultValue={values.category}
                className="w-full rounded-[1.1rem] border border-white/10 bg-black/20 px-4 py-3 text-white outline-none ring-0 placeholder:text-white/30 focus:border-white/20"
                placeholder="Books, Anime, Movies..."
                required
              />
            </label>

            <label className="block space-y-2">
              <span className="text-[0.66rem] uppercase tracking-[0.42em] text-white/45">Display Order</span>
              <input
                name="displayOrder"
                type="number"
                defaultValue={values.displayOrder}
                className="w-full rounded-[1.1rem] border border-white/10 bg-black/20 px-4 py-3 text-white outline-none ring-0 placeholder:text-white/30 focus:border-white/20"
                placeholder="1"
                required
              />
            </label>
          </div>

          <label className="block space-y-2">
            <span className="text-[0.66rem] uppercase tracking-[0.42em] text-white/45">Short Description</span>
            <textarea
              name="shortDescription"
              defaultValue={values.shortDescription}
              rows={4}
              className="w-full rounded-[1.1rem] border border-white/10 bg-black/20 px-4 py-3 text-white outline-none ring-0 placeholder:text-white/30 focus:border-white/20"
              placeholder="Short summary shown on the public page"
              required
            />
          </label>

          <label className="block space-y-2">
            <span className="text-[0.66rem] uppercase tracking-[0.42em] text-white/45">Full Description</span>
            <textarea
              name="fullDescription"
              defaultValue={values.fullDescription}
              rows={6}
              className="w-full rounded-[1.1rem] border border-white/10 bg-black/20 px-4 py-3 text-white outline-none ring-0 placeholder:text-white/30 focus:border-white/20"
              placeholder="Optional long description"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-[0.66rem] uppercase tracking-[0.42em] text-white/45">External Link</span>
            <input
              name="externalLink"
              defaultValue={values.externalLink}
              className="w-full rounded-[1.1rem] border border-white/10 bg-black/20 px-4 py-3 text-white outline-none ring-0 placeholder:text-white/30 focus:border-white/20"
              placeholder="Optional external URL"
            />
          </label>
        </div>

        <aside className="space-y-5">
          <label className="block space-y-2">
            <span className="text-[0.66rem] uppercase tracking-[0.42em] text-white/45">Image Upload</span>
            <input
              name="image"
              type="file"
              accept="image/*"
              className="block w-full rounded-[1.1rem] border border-dashed border-white/12 bg-black/20 px-4 py-4 text-sm text-white/70 file:mr-4 file:rounded-full file:border-0 file:bg-white file:px-4 file:py-2 file:text-xs file:uppercase file:tracking-[0.3em] file:text-[#111]"
            />
          </label>

          <div className="overflow-hidden rounded-[1.3rem] border border-white/8 bg-black/18">
            <div className="aspect-[4/5]">
              {imagePreview ? (
                <img src={imagePreview} alt={values.title || "Curated preview"} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center bg-[linear-gradient(180deg,#ebe1cf,#d6c2a5)] text-xs uppercase tracking-[0.35em] text-[#6b6052]">
                  No image
                </div>
              )}
            </div>
          </div>

          <div className="space-y-3 rounded-[1.3rem] border border-white/8 bg-black/18 p-4">
            <p className="text-[0.66rem] uppercase tracking-[0.42em] text-white/45">Status</p>
            <div className="flex gap-2">
              <button
                type="submit"
                name="status"
                value="Draft"
                className="flex-1 rounded-full border border-white/10 bg-white/[0.04] px-4 py-3 text-center text-xs uppercase tracking-[0.3em] text-white/70 transition hover:bg-white/[0.08]"
              >
                Save Draft
              </button>
              <button
                type="submit"
                name="status"
                value="Published"
                className="flex-1 rounded-full bg-white px-4 py-3 text-center text-xs uppercase tracking-[0.3em] text-[#111] transition hover:bg-white/90"
              >
                Publish
              </button>
            </div>
          </div>
        </aside>
      </div>
    </form>
  );
}

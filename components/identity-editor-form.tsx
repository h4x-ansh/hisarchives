"use client";

import { useEffect, useState } from "react";

export type IdentityEditorValues = {
  name: string;
  shortTagline: string;
  fullBio: string;
  location: string;
  email: string;
  github: string;
  discord: string;
  instagram: string;
  linkedin: string;
  website: string;
  profilePhotoUrl: string;
};

export function IdentityEditorForm({
  actionPath,
  values,
}: {
  actionPath: string;
  values: IdentityEditorValues;
}) {
  const [imagePreview, setImagePreview] = useState(values.profilePhotoUrl);

  useEffect(() => {
    setImagePreview(values.profilePhotoUrl);
  }, [values.profilePhotoUrl]);

  return (
    <form action={actionPath} method="post" encType="multipart/form-data" className="space-y-6">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="space-y-5">
          <label className="block space-y-2">
            <span className="text-[0.66rem] uppercase tracking-[0.42em] text-white/45">Name</span>
            <input
              name="name"
              defaultValue={values.name}
              required
              className="w-full rounded-[1.1rem] border border-white/10 bg-black/20 px-4 py-3 text-white outline-none ring-0 placeholder:text-white/30 focus:border-white/20"
              placeholder="Your name"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-[0.66rem] uppercase tracking-[0.42em] text-white/45">Short Tagline</span>
            <input
              name="shortTagline"
              defaultValue={values.shortTagline}
              required
              className="w-full rounded-[1.1rem] border border-white/10 bg-black/20 px-4 py-3 text-white outline-none ring-0 placeholder:text-white/30 focus:border-white/20"
              placeholder="Short identity line"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-[0.66rem] uppercase tracking-[0.42em] text-white/45">Full Bio</span>
            <textarea
              name="fullBio"
              defaultValue={values.fullBio}
              required
              rows={8}
              className="w-full rounded-[1.1rem] border border-white/10 bg-black/20 px-4 py-3 text-white outline-none ring-0 placeholder:text-white/30 focus:border-white/20"
              placeholder="Longer bio text"
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block space-y-2">
              <span className="text-[0.66rem] uppercase tracking-[0.42em] text-white/45">Location</span>
              <input
                name="location"
                defaultValue={values.location}
                className="w-full rounded-[1.1rem] border border-white/10 bg-black/20 px-4 py-3 text-white outline-none ring-0 placeholder:text-white/30 focus:border-white/20"
                placeholder="City, Country"
              />
            </label>

            <label className="block space-y-2">
              <span className="text-[0.66rem] uppercase tracking-[0.42em] text-white/45">Email</span>
              <input
                name="email"
                defaultValue={values.email}
                className="w-full rounded-[1.1rem] border border-white/10 bg-black/20 px-4 py-3 text-white outline-none ring-0 placeholder:text-white/30 focus:border-white/20"
                placeholder="name@example.com"
              />
            </label>
          </div>
        </div>

        <aside className="space-y-5">
          <label className="block space-y-2">
            <span className="text-[0.66rem] uppercase tracking-[0.42em] text-white/45">Profile Photo</span>
            <input
              name="profilePhoto"
              type="file"
              accept="image/*"
              className="block w-full rounded-[1.1rem] border border-dashed border-white/12 bg-black/20 px-4 py-4 text-sm text-white/70 file:mr-4 file:rounded-full file:border-0 file:bg-white file:px-4 file:py-2 file:text-xs file:uppercase file:tracking-[0.3em] file:text-[#111]"
            />
          </label>

          <div className="overflow-hidden rounded-[1.3rem] border border-white/8 bg-black/18">
            <div className="aspect-[4/5]">
              {imagePreview ? (
                <img src={imagePreview} alt={values.name || "Profile preview"} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center bg-[linear-gradient(180deg,#ebe1cf,#d6c2a5)] text-xs uppercase tracking-[0.35em] text-[#6b6052]">
                  No photo
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4 rounded-[1.3rem] border border-white/8 bg-black/18 p-4">
            <p className="text-[0.66rem] uppercase tracking-[0.42em] text-white/45">Social Links</p>
            <label className="block space-y-2">
              <span className="text-[0.66rem] uppercase tracking-[0.4em] text-white/40">GitHub</span>
              <input name="github" defaultValue={values.github} className="w-full rounded-[1rem] border border-white/10 bg-black/20 px-4 py-3 text-white outline-none" placeholder="https://github.com/..." />
            </label>
            <label className="block space-y-2">
              <span className="text-[0.66rem] uppercase tracking-[0.4em] text-white/40">Discord</span>
              <input name="discord" defaultValue={values.discord} className="w-full rounded-[1rem] border border-white/10 bg-black/20 px-4 py-3 text-white outline-none" placeholder="Discord handle or link" />
            </label>
            <label className="block space-y-2">
              <span className="text-[0.66rem] uppercase tracking-[0.4em] text-white/40">Instagram</span>
              <input name="instagram" defaultValue={values.instagram} className="w-full rounded-[1rem] border border-white/10 bg-black/20 px-4 py-3 text-white outline-none" placeholder="https://instagram.com/..." />
            </label>
            <label className="block space-y-2">
              <span className="text-[0.66rem] uppercase tracking-[0.4em] text-white/40">LinkedIn</span>
              <input name="linkedin" defaultValue={values.linkedin} className="w-full rounded-[1rem] border border-white/10 bg-black/20 px-4 py-3 text-white outline-none" placeholder="https://linkedin.com/in/..." />
            </label>
            <label className="block space-y-2">
              <span className="text-[0.66rem] uppercase tracking-[0.4em] text-white/40">Website</span>
              <input name="website" defaultValue={values.website} className="w-full rounded-[1rem] border border-white/10 bg-black/20 px-4 py-3 text-white outline-none" placeholder="https://..." />
            </label>
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-white px-5 py-3 text-xs uppercase tracking-[0.32em] text-[#111] transition hover:bg-white/90"
          >
            Save Identity
          </button>
        </aside>
      </div>
    </form>
  );
}

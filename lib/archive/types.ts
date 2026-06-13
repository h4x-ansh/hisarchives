export type ArchiveRecord = {
  id: string;
  slug: string;
  title: string;
  archiveDate: string;
  category: string;
  coverImageUrl: string;
  shortSummary: string;
  fullDescription: string;
  status: "Draft" | "Published";
  createdAt: string;
  updatedAt: string;
};

export type ArchiveRecordRow = {
  id: string;
  slug: string;
  title: string;
  archive_date: string;
  category: string;
  cover_image_url: string | null;
  short_summary: string;
  full_description: string;
  status: "Draft" | "Published";
  created_at: string;
  updated_at: string;
};

export type ArchiveCard = {
  id: string;
  rawId: string;
  title: string;
  description: string;
  status: string;
  year: string;
  archiveDate: string;
  accent: string;
  word: string;
  href: string;
  shelfLabel: string;
  coverImageUrl?: string;
};

export type CuratedRecord = {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  shortDescription: string;
  fullDescription: string | null;
  externalLink: string | null;
  displayOrder: number;
  status: "Draft" | "Published";
  createdAt: string;
  updatedAt: string;
};

export type CuratedRecordRow = {
  id: string;
  title: string;
  category: string;
  image_url: string | null;
  image_position: string;
  accent: string;
  short_description: string;
  full_description: string | null;
  external_link: string | null;
  display_order: number;
  status: "Draft" | "Published";
  created_at: string;
  updated_at: string;
};

export type CuratedGalleryItem = {
  id: string;
  category: string;
  title: string;
  image: string;
  fallbackImage: string;
  accent: string;
  imagePosition?: string;
  description?: string;
  externalLink?: string;
  displayOrder: number;
  year: string;
};

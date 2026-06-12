export type IdentityRecord = {
  id: string;
  name: string;
  shortTagline: string;
  fullBio: string;
  profilePhotoUrl: string | null;
  location: string | null;
  email: string | null;
  github: string | null;
  discord: string | null;
  instagram: string | null;
  linkedin: string | null;
  website: string | null;
  createdAt: string;
  updatedAt: string;
};

export type IdentityRecordRow = {
  id: string;
  name: string;
  short_tagline: string;
  full_bio: string;
  profile_photo_url: string | null;
  location: string | null;
  email: string | null;
  github: string | null;
  discord: string | null;
  instagram: string | null;
  linkedin: string | null;
  website: string | null;
  created_at: string;
  updated_at: string;
};

export type IdentityFormValues = {
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

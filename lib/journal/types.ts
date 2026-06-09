export type JournalEntry = {
  id: string;
  date: string;
  title: string;
  photo: string;
  caption: string;
  mood: string;
  tags: string[];
  content: string;
  readingTime: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

export type JournalDraft = {
  title: string;
  caption: string;
  content: string;
  mood: string;
  tags: string;
  photoUrl: string;
  published: boolean;
};

export type JournalEntryRecord = {
  id: string;
  title: string;
  content: string;
  photo_url: string | null;
  photo_caption: string | null;
  tags: string[];
  mood: string;
  entry_date: string;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type JournalEntryInput = {
  title: string;
  content: string;
  photo_url?: string | null;
  photo_caption?: string | null;
  tags?: string[];
  mood: string;
  entry_date: string;
  published: boolean;
};

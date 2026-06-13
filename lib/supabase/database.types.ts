export type Database = {
  public: {
    Tables: {
      now_checklist: {
        Row: { domain: string; item_name: string; checks: boolean[]; updated_at: string };
        Insert: { domain: string; item_name: string; checks?: boolean[]; updated_at?: string };
        Update: { checks?: boolean[]; updated_at?: string };
      };
      now_daily_minutes: {
        Row: { date: string; minutes: number };
        Insert: { date: string; minutes?: number };
        Update: { minutes?: number };
      };
      now_records: {
        Row: { id: number; type: string; data: unknown; created_at: string };
        Insert: { type: string; data: unknown; created_at?: string };
        Update: { type?: string; data?: unknown };
      };
      curated_items: {
        Row: {
          id: string; title: string; category: string;
          image_url: string | null; image_position: string; accent: string;
          short_description: string; full_description: string | null;
          external_link: string | null; display_order: number;
          status: "Draft" | "Published"; created_at: string; updated_at: string;
        };
        Insert: {
          id?: string; title: string; category: string;
          image_url?: string | null; image_position?: string; accent?: string;
          short_description: string; full_description?: string | null;
          external_link?: string | null; display_order?: number;
          status?: "Draft" | "Published"; created_at?: string; updated_at?: string;
        };
        Update: {
          title?: string; category?: string;
          image_url?: string | null; image_position?: string; accent?: string;
          short_description?: string; full_description?: string | null;
          external_link?: string | null; display_order?: number;
          status?: "Draft" | "Published"; updated_at?: string;
        };
      };
      timeline_entries: {
        Row: {
          id: string; slug: string; title: string; date: string; year: string;
          summary: string; category: string; cover_image_url: string | null;
          href: string; accent: string; word: string; status: string;
          display_order: number; created_at: string; updated_at: string;
        };
        Insert: {
          id?: string; slug: string; title: string; date: string; year: string;
          summary?: string; category?: string; cover_image_url?: string | null;
          href?: string; accent?: string; word?: string; status?: string;
          display_order?: number; created_at?: string; updated_at?: string;
        };
        Update: {
          slug?: string; title?: string; date?: string; year?: string;
          summary?: string; category?: string; cover_image_url?: string | null;
          href?: string; accent?: string; word?: string; status?: string;
          display_order?: number; updated_at?: string;
        };
      };
      archive_records: {
        Row: {
          id: string; slug: string; title: string; archive_date: string;
          category: string; cover_image_url: string | null;
          short_summary: string; full_description: string;
          status: "Draft" | "Published"; created_at: string; updated_at: string;
        };
        Insert: {
          id?: string; slug: string; title: string; archive_date: string;
          category: string; cover_image_url?: string | null;
          short_summary: string; full_description: string;
          status?: "Draft" | "Published"; created_at?: string; updated_at?: string;
        };
        Update: {
          id?: string; slug?: string; title?: string; archive_date?: string;
          category?: string; cover_image_url?: string | null;
          short_summary?: string; full_description?: string;
          status?: "Draft" | "Published"; created_at?: string; updated_at?: string;
        };
      };
      journal_entries: {
        Row: {
          id: string; title: string; content: string;
          photo_url: string | null; photo_caption: string | null;
          tags: string[]; mood: string; entry_date: string;
          published: boolean; created_at: string; updated_at: string;
        };
        Insert: {
          id?: string; title: string; content: string;
          photo_url?: string | null; photo_caption?: string | null;
          tags?: string[]; mood: string; entry_date: string;
          published?: boolean; created_at?: string; updated_at?: string;
        };
        Update: {
          id?: string; title?: string; content?: string;
          photo_url?: string | null; photo_caption?: string | null;
          tags?: string[]; mood?: string; entry_date?: string;
          published?: boolean; created_at?: string; updated_at?: string;
        };
      };
    };
  };
};

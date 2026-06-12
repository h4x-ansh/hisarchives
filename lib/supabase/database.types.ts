export type Database = {
  public: {
    Tables: {
      identity_record: {
        Row: {
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
        Insert: {
          id?: string;
          name?: string;
          short_tagline?: string;
          full_bio?: string;
          profile_photo_url?: string | null;
          location?: string | null;
          email?: string | null;
          github?: string | null;
          discord?: string | null;
          instagram?: string | null;
          linkedin?: string | null;
          website?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          short_tagline?: string;
          full_bio?: string;
          profile_photo_url?: string | null;
          location?: string | null;
          email?: string | null;
          github?: string | null;
          discord?: string | null;
          instagram?: string | null;
          linkedin?: string | null;
          website?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      curated_items: {
        Row: {
          id: string;
          title: string;
          category: string;
          image_url: string | null;
          short_description: string;
          full_description: string | null;
          external_link: string | null;
          display_order: number;
          status: "Draft" | "Published";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          category: string;
          image_url?: string | null;
          short_description: string;
          full_description?: string | null;
          external_link?: string | null;
          display_order?: number;
          status?: "Draft" | "Published";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          category?: string;
          image_url?: string | null;
          short_description?: string;
          full_description?: string | null;
          external_link?: string | null;
          display_order?: number;
          status?: "Draft" | "Published";
          created_at?: string;
          updated_at?: string;
        };
      };
      archive_records: {
        Row: {
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
        Insert: {
          id?: string;
          slug: string;
          title: string;
          archive_date: string;
          category: string;
          cover_image_url?: string | null;
          short_summary: string;
          full_description: string;
          status?: "Draft" | "Published";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          archive_date?: string;
          category?: string;
          cover_image_url?: string | null;
          short_summary?: string;
          full_description?: string;
          status?: "Draft" | "Published";
          created_at?: string;
          updated_at?: string;
        };
      };
      journal_entries: {
        Row: {
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
        Insert: {
          id?: string;
          title: string;
          content: string;
          photo_url?: string | null;
          photo_caption?: string | null;
          tags?: string[];
          mood: string;
          entry_date: string;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          content?: string;
          photo_url?: string | null;
          photo_caption?: string | null;
          tags?: string[];
          mood?: string;
          entry_date?: string;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};

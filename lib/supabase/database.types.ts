export type Database = {
  public: {
    Tables: {
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

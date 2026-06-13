-- Curated gallery items
-- Run in Supabase Dashboard → SQL Editor → New Query

create table if not exists curated_items (
  id                uuid primary key default gen_random_uuid(),
  title             text not null,
  category          text not null default '',
  image_url         text,
  image_position    text not null default 'center',
  accent            text not null default '#8b92a5',
  short_description text not null default '',
  full_description  text,
  external_link     text,
  display_order     integer not null default 0,
  status            text not null default 'Draft' check (status in ('Draft', 'Published')),
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create or replace function update_curated_items_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists curated_items_updated_at on curated_items;
create trigger curated_items_updated_at
  before update on curated_items
  for each row execute function update_curated_items_updated_at();

-- Add columns that may be missing from an earlier run
alter table curated_items add column if not exists image_position text not null default 'center';
alter table curated_items add column if not exists accent text not null default '#8b92a5';

alter table curated_items enable row level security;

drop policy if exists "Public can read published curated items" on curated_items;
create policy "Public can read published curated items"
  on curated_items for select
  using (status = 'Published');

drop policy if exists "Service role has full access to curated items" on curated_items;
create policy "Service role has full access to curated items"
  on curated_items for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

-- Seed all hardcoded gallery items
insert into curated_items (title, category, image_url, image_position, accent, short_description, display_order, status) values
  -- Songs (100–103)
  ('Experience',        'Songs',       'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80', 'center',      '#8A79FF', 'A quiet reminder to build slowly and keep moving.',  100, 'Published'),
  ('Open Eye Signal',   'Songs',       'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=80', 'center 20%',  '#7E93FF', 'A quiet reminder to build slowly and keep moving.',  101, 'Published'),
  ('Night Drive',       'Songs',       'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80', 'center 30%',  '#A675FF', 'A quiet reminder to build slowly and keep moving.',  102, 'Published'),
  ('Dawn Chorus',       'Songs',       'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80', 'center 40%',  '#6D86FF', 'A quiet reminder to build slowly and keep moving.',  103, 'Published'),
  -- Anime (200–203)
  ('Blue Period',       'Anime',       'https://upload.wikimedia.org/wikipedia/commons/e/e9/Anime_Girl_librsvg.png',                    'center',      '#67B7FF', 'A story that stays long after the screen goes dark.', 200, 'Published'),
  ('Your Name',         'Anime',       'https://upload.wikimedia.org/wikipedia/commons/e/e9/Anime_Girl_librsvg.png',                    'center 18%',  '#7CC6FF', 'A story that stays long after the screen goes dark.', 201, 'Published'),
  ('Ping Pong',         'Anime',       'https://upload.wikimedia.org/wikipedia/commons/e/e9/Anime_Girl_librsvg.png',                    'center 32%',  '#58D0A6', 'A story that stays long after the screen goes dark.', 202, 'Published'),
  ('Haikyuu!!',         'Anime',       'https://upload.wikimedia.org/wikipedia/commons/e/e9/Anime_Girl_librsvg.png',                    'center 46%',  '#8D7BFF', 'A story that stays long after the screen goes dark.', 203, 'Published'),
  -- Marvel (300–303)
  ('Marvel Universe',   'Marvel',      'https://upload.wikimedia.org/wikipedia/commons/4/4f/Marvel_logo_%282000%E2%80%932012%29.svg',   'center',      '#E2383F', 'Stories of heroes, sacrifice and imagination.',      300, 'Published'),
  ('Spider-Verse',      'Marvel',      'https://upload.wikimedia.org/wikipedia/en/0/0c/Spider-Man_Into_the_Spider-Verse_poster.png',    'center 24%',  '#D53B53', 'Stories of heroes, sacrifice and imagination.',      301, 'Published'),
  ('Avengers Endgame',  'Marvel',      'https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg',                    'center 18%',  '#FF5A63', 'Stories of heroes, sacrifice and imagination.',      302, 'Published'),
  ('Black Panther',     'Marvel',      'https://upload.wikimedia.org/wikipedia/en/9/96/Black_Panther_film_poster.jpg',                  'center 30%',  '#B84B5E', 'Stories of heroes, sacrifice and imagination.',      303, 'Published'),
  -- RCB (400–403)
  ('Royal Challengers Bangalore', 'RCB', 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Prasanth_Parameswaran_in_RCB.jpg',       'center 20%',  '#E11437', 'More than a team. More like an emotion.',            400, 'Published'),
  ('Chinnaswamy Nights','RCB',          'https://upload.wikimedia.org/wikipedia/commons/c/c3/Prasanth_Parameswaran_in_RCB.jpg',         'center 34%',  '#FF375F', 'More than a team. More like an emotion.',            401, 'Published'),
  ('Red and Gold',      'RCB',          'https://upload.wikimedia.org/wikipedia/commons/c/c3/Prasanth_Parameswaran_in_RCB.jpg',         'center 48%',  '#FF5D42', 'More than a team. More like an emotion.',            402, 'Published'),
  ('A Different Blueprint','RCB',       'https://upload.wikimedia.org/wikipedia/commons/c/c3/Prasanth_Parameswaran_in_RCB.jpg',         'center 12%',  '#F04A64', 'More than a team. More like an emotion.',            403, 'Published'),
  -- FC Barcelona (500–503)
  ('FC Barcelona',      'FC Barcelona','https://upload.wikimedia.org/wikipedia/commons/6/6b/FC_Barcelona_original_crest_%281899%E2%80%931910%29.png', 'center',     '#4FA3FF', 'The beautiful game played with identity and rhythm.', 500, 'Published'),
  ('Camp Nou',          'FC Barcelona','https://upload.wikimedia.org/wikipedia/commons/6/6b/FC_Barcelona_original_crest_%281899%E2%80%931910%29.png', 'center 24%', '#58A6FF', 'The beautiful game played with identity and rhythm.', 501, 'Published'),
  ('Tiki-Taka',         'FC Barcelona','https://upload.wikimedia.org/wikipedia/commons/6/6b/FC_Barcelona_original_crest_%281899%E2%80%931910%29.png', 'center 40%', '#74C7FF', 'The beautiful game played with identity and rhythm.', 502, 'Published'),
  ('La Masia',          'FC Barcelona','https://upload.wikimedia.org/wikipedia/commons/6/6b/FC_Barcelona_original_crest_%281899%E2%80%931910%29.png', 'center 8%',  '#3C88FF', 'The beautiful game played with identity and rhythm.', 503, 'Published'),
  -- Virat Kohli (600–603)
  ('Virat Kohli',       'Virat Kohli', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Virat_Kohli_portrait.jpg',                  'center 20%',  '#D44D3D', 'Discipline, hunger and a never-give-up mindset.',   600, 'Published'),
  ('Chase Mode',        'Virat Kohli', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Virat_Kohli_portrait.jpg',                  'center 34%',  '#FF6B57', 'Discipline, hunger and a never-give-up mindset.',   601, 'Published'),
  ('Test Match Mindset','Virat Kohli', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Virat_Kohli_portrait.jpg',                  'center 48%',  '#F04A48', 'Discipline, hunger and a never-give-up mindset.',   602, 'Published'),
  ('Peak Fitness',      'Virat Kohli', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Virat_Kohli_portrait.jpg',                  'center 12%',  '#FF8A6B', 'Discipline, hunger and a never-give-up mindset.',   603, 'Published'),
  -- Chess (700–703)
  ('Chess',             'Chess',       'https://upload.wikimedia.org/wikipedia/commons/d/d4/Chess_board_%28top_view%29.jpg',            'center 25%',  '#F0B85B', 'A game of patience, strategy and mindset.',         700, 'Published'),
  ('Endgame',           'Chess',       'https://upload.wikimedia.org/wikipedia/commons/d/d4/Chess_board_%28top_view%29.jpg',            'center 40%',  '#E2A84C', 'A game of patience, strategy and mindset.',         701, 'Published'),
  ('Opening Theory',    'Chess',       'https://upload.wikimedia.org/wikipedia/commons/d/d4/Chess_board_%28top_view%29.jpg',            'center 10%',  '#D8A03A', 'A game of patience, strategy and mindset.',         702, 'Published'),
  ('Quiet Calculation', 'Chess',       'https://upload.wikimedia.org/wikipedia/commons/d/d4/Chess_board_%28top_view%29.jpg',            'center 55%',  '#F2C45F', 'A game of patience, strategy and mindset.',         703, 'Published'),
  -- Badminton (800–803)
  ('Badminton',         'Badminton',   'https://upload.wikimedia.org/wikipedia/commons/e/ef/Shuttlecock_on_a_badminton_court.jpg',      'center 25%',  '#74D6A2', 'Speed, focus and a great stress buster.',           800, 'Published'),
  ('Rhythm',            'Badminton',   'https://upload.wikimedia.org/wikipedia/commons/e/ef/Shuttlecock_on_a_badminton_court.jpg',      'center 40%',  '#7FE7B5', 'Speed, focus and a great stress buster.',           801, 'Published'),
  ('Footwork',          'Badminton',   'https://upload.wikimedia.org/wikipedia/commons/e/ef/Shuttlecock_on_a_badminton_court.jpg',      'center 10%',  '#61C98F', 'Speed, focus and a great stress buster.',           802, 'Published'),
  ('Pace',              'Badminton',   'https://upload.wikimedia.org/wikipedia/commons/e/ef/Shuttlecock_on_a_badminton_court.jpg',      'center 55%',  '#8BE0B8', 'Speed, focus and a great stress buster.',           803, 'Published')
on conflict do nothing;

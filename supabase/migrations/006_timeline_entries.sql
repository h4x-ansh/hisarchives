-- Timeline entries (standalone, not derived from archives)
-- Run in Supabase Dashboard → SQL Editor → New Query

create table if not exists timeline_entries (
  id               uuid primary key default gen_random_uuid(),
  slug             text not null unique,
  title            text not null,
  date             text not null,          -- 'YYYY-MM-DD'
  year             text not null,          -- '2025', 'Future', etc.
  summary          text not null default '',
  category         text not null default '',
  cover_image_url  text,
  href             text not null default '',
  accent           text not null default '#8b92a5',
  word             text not null default '',
  status           text not null default 'Active' check (status in ('Active', 'Planned')),
  display_order    integer not null default 0,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create or replace function update_timeline_entries_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists timeline_entries_updated_at on timeline_entries;
create trigger timeline_entries_updated_at
  before update on timeline_entries
  for each row execute function update_timeline_entries_updated_at();

alter table timeline_entries enable row level security;

drop policy if exists "Public can read timeline entries" on timeline_entries;
create policy "Public can read timeline entries"
  on timeline_entries for select
  using (true);

drop policy if exists "Service role has full access to timeline entries" on timeline_entries;
create policy "Service role has full access to timeline entries"
  on timeline_entries for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

-- Seed existing hardcoded entries
insert into timeline_entries (slug, title, date, year, summary, category, href, accent, word, status, display_order) values
  ('jee-restart',          'JEE Restart',         '2025-01-01', '2025',   'A return to fundamentals and a cleaner study rhythm.',                          'Study chapter',      '/now',                       '#9A8A5A', 'STUDY',  'Active',  10),
  ('hisarchives-launch',   'HisArchives Launch',  '2026-06-04', '2026',   'The archive gets a public home and a stable identity.',                          'Archive opening',    '/archives/hisarchives',      '#28325A', 'SITE',   'Active',  20),
  ('automation-systems',   'Automation Systems',  '2026-08-01', '2026',   'Small systems start carrying real weight.',                                      'Build chapter',      '/archives/discord-automation','#4D6A8E', 'CODE',   'Active',  30),
  ('fitness-journey',      'Fitness Journey',     '2026-10-01', '2026',   'Consistency becomes a logged practice.',                                         'Body record',        '/archives/fitness',           '#66785A', 'FIT',    'Active',  40),
  ('jee-attempt',          'JEE Attempt',         '2027-04-01', '2027',   'The main academic attempt arrives.',                                             'Primary milestone',  '/archives/jee-2027',         '#A08A44', 'JEE',    'Active',  50),
  ('btech-completion',     'BTech Completion',    '2031-06-01', '2031',   'A longer arc for the record.',                                                   'Degree archive',     '/archives/notes',            '#7A7F88', 'BTECH',  'Active',  60),
  ('germany-mission',      'Germany Mission',     '2035-01-01', 'Future', 'A longer-term mission that can collect detail as the timeline advances.',        'Long-range plan',    '/archives/memories',         '#7B4C57', 'FUTURE', 'Planned', 70)
on conflict (slug) do nothing;

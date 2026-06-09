-- Journal CMS schema for Supabase

create extension if not exists pgcrypto;

create table if not exists public.journal_entries (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  photo_url text,
  photo_caption text,
  tags text[] not null default '{}'::text[],
  mood text not null default 'Reflective',
  entry_date date not null default current_date,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists journal_entries_entry_date_idx on public.journal_entries (entry_date desc, created_at desc);
create index if not exists journal_entries_published_idx on public.journal_entries (published);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists journal_entries_updated_at on public.journal_entries;
create trigger journal_entries_updated_at
before update on public.journal_entries
for each row
execute function public.set_updated_at();

alter table public.journal_entries enable row level security;

drop policy if exists "Published journal entries are visible to everyone" on public.journal_entries;
create policy "Published journal entries are visible to everyone"
on public.journal_entries
for select
using (published = true);

drop policy if exists "Service role manages journal entries" on public.journal_entries;
create policy "Service role manages journal entries"
on public.journal_entries
for all
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');

insert into storage.buckets (id, name, public)
values ('journal-photos', 'journal-photos', true)
on conflict (id) do nothing;

drop policy if exists "Journal photos are publicly readable" on storage.objects;
create policy "Journal photos are publicly readable"
on storage.objects
for select
using (bucket_id = 'journal-photos');

drop policy if exists "Service role manages journal photos" on storage.objects;
create policy "Service role manages journal photos"
on storage.objects
for all
using (bucket_id = 'journal-photos' and auth.role() = 'service_role')
with check (bucket_id = 'journal-photos' and auth.role() = 'service_role');

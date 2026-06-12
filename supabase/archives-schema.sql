-- Archives CMS schema for Supabase

create extension if not exists pgcrypto;

create table if not exists public.archive_records (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  archive_date date not null default current_date,
  category text not null,
  cover_image_url text,
  short_summary text not null,
  full_description text not null,
  status text not null default 'Draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint archive_records_status_check check (status in ('Draft', 'Published'))
);

create index if not exists archive_records_archive_date_idx on public.archive_records (archive_date desc, created_at desc);
create index if not exists archive_records_status_idx on public.archive_records (status);
create index if not exists archive_records_slug_idx on public.archive_records (slug);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists archive_records_updated_at on public.archive_records;
create trigger archive_records_updated_at
before update on public.archive_records
for each row
execute function public.set_updated_at();

alter table public.archive_records enable row level security;

drop policy if exists "Published archive records are visible to everyone" on public.archive_records;
create policy "Published archive records are visible to everyone"
on public.archive_records
for select
using (status = 'Published');

drop policy if exists "Service role manages archive records" on public.archive_records;
create policy "Service role manages archive records"
on public.archive_records
for all
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');

insert into storage.buckets (id, name, public)
values ('archive-covers', 'archive-covers', true)
on conflict (id) do nothing;

drop policy if exists "Archive covers are publicly readable" on storage.objects;
create policy "Archive covers are publicly readable"
on storage.objects
for select
using (bucket_id = 'archive-covers');

drop policy if exists "Service role manages archive covers" on storage.objects;
create policy "Service role manages archive covers"
on storage.objects
for all
using (bucket_id = 'archive-covers' and auth.role() = 'service_role')
with check (bucket_id = 'archive-covers' and auth.role() = 'service_role');

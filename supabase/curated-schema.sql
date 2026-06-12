create table if not exists public.curated_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  image_url text,
  short_description text not null,
  full_description text,
  external_link text,
  display_order integer not null default 0,
  status text not null default 'Draft' check (status in ('Draft', 'Published')),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

alter table public.curated_items enable row level security;

drop policy if exists "Curated published are visible" on public.curated_items;
create policy "Curated published are visible"
  on public.curated_items
  for select
  using (status = 'Published');

drop policy if exists "Curated service role all access" on public.curated_items;
create policy "Curated service role all access"
  on public.curated_items
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

insert into storage.buckets (id, name, public)
values ('curated-images', 'curated-images', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "Curated images public read" on storage.objects;
create policy "Curated images public read"
  on storage.objects
  for select
  using (bucket_id = 'curated-images');

drop policy if exists "Curated images service role all access" on storage.objects;
create policy "Curated images service role all access"
  on storage.objects
  for all
  using (bucket_id = 'curated-images' and auth.role() = 'service_role')
  with check (bucket_id = 'curated-images' and auth.role() = 'service_role');

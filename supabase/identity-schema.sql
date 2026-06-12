create table if not exists public.identity_record (
  id text primary key default 'primary',
  name text not null default '',
  short_tagline text not null default '',
  full_bio text not null default '',
  profile_photo_url text,
  location text,
  email text,
  github text,
  discord text,
  instagram text,
  linkedin text,
  website text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create or replace function public.touch_identity_record_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$ language plpgsql;

drop trigger if exists touch_identity_record_updated_at on public.identity_record;
create trigger touch_identity_record_updated_at
before update on public.identity_record
for each row
execute function public.touch_identity_record_updated_at();

alter table public.identity_record enable row level security;

drop policy if exists "Identity record public read" on public.identity_record;
create policy "Identity record public read"
  on public.identity_record
  for select
  using (true);

drop policy if exists "Identity record service role all access" on public.identity_record;
create policy "Identity record service role all access"
  on public.identity_record
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

insert into storage.buckets (id, name, public)
values ('identity-photos', 'identity-photos', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "Identity photos public read" on storage.objects;
create policy "Identity photos public read"
  on storage.objects
  for select
  using (bucket_id = 'identity-photos');

drop policy if exists "Identity photos service role all access" on storage.objects;
create policy "Identity photos service role all access"
  on storage.objects
  for all
  using (bucket_id = 'identity-photos' and auth.role() = 'service_role')
  with check (bucket_id = 'identity-photos' and auth.role() = 'service_role');

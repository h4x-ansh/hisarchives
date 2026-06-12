-- Enable RLS on Mission Control tracker tables.
-- Public SELECT is allowed (tracker is publicly viewable).
-- INSERT / UPDATE / DELETE requires the service_role key, which is only
-- held server-side in SUPABASE_SERVICE_ROLE_KEY. The anon key cannot write.

-- ─── now_checklist ────────────────────────────────────────────────────────────

alter table public.now_checklist enable row level security;

drop policy if exists "now_checklist public read" on public.now_checklist;
create policy "now_checklist public read"
  on public.now_checklist
  for select
  using (true);

drop policy if exists "now_checklist service role write" on public.now_checklist;
create policy "now_checklist service role write"
  on public.now_checklist
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

-- ─── now_daily_minutes ────────────────────────────────────────────────────────

alter table public.now_daily_minutes enable row level security;

drop policy if exists "now_daily_minutes public read" on public.now_daily_minutes;
create policy "now_daily_minutes public read"
  on public.now_daily_minutes
  for select
  using (true);

drop policy if exists "now_daily_minutes service role write" on public.now_daily_minutes;
create policy "now_daily_minutes service role write"
  on public.now_daily_minutes
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

-- ─── now_records ──────────────────────────────────────────────────────────────

alter table public.now_records enable row level security;

drop policy if exists "now_records public read" on public.now_records;
create policy "now_records public read"
  on public.now_records
  for select
  using (true);

drop policy if exists "now_records service role write" on public.now_records;
create policy "now_records service role write"
  on public.now_records
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

-- ─── Verification (run manually to confirm) ───────────────────────────────────
-- The queries below should each return an RLS-violation error when executed
-- with the anon key (i.e. from the Supabase Table Editor as an anon user,
-- or via: supabase.from('now_checklist').insert({...}) with the anon key).
--
-- select * from now_checklist;                              -- should succeed
-- insert into now_checklist values ('test','test','[]');   -- should be denied
-- select * from now_daily_minutes;                         -- should succeed
-- insert into now_daily_minutes values ('2099-01-01', 0);  -- should be denied
-- select * from now_records;                               -- should succeed
-- insert into now_records (type, data) values ('x','{}'); -- should be denied

-- Mission Control: now-page tracker tables
-- Run this in Supabase SQL editor (Dashboard → SQL Editor → New Query)

-- Checkbox states for all domains
create table if not exists now_checklist (
  domain    text not null,
  item_name text not null,
  checks    jsonb not null default '[false,false,false,false]',
  updated_at timestamptz default now(),
  primary key (domain, item_name)
);

-- Daily study minutes (one row per calendar day)
create table if not exists now_daily_minutes (
  date    text primary key,  -- 'YYYY-MM-DD'
  minutes integer not null default 0
);

-- General records: mock tests, gym PRs, art portfolio
create table if not exists now_records (
  id         bigserial primary key,
  type       text not null,   -- 'mocktest' | 'pr' | 'portfolio'
  data       jsonb not null,
  created_at timestamptz default now()
);

-- Public read, no write without service role (no RLS needed for a single-owner site)
-- If you want extra safety, enable RLS and add: allow select for all, allow insert/update for authenticated only.

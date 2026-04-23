-- Supabase SQL (Table Editor 대신 SQL Editor에서 실행)

create table if not exists public.profiles (
  id text primary key,
  nickname text not null,
  occupation text not null,
  thread_id text not null,
  is_completed boolean not null default false,
  keywords text[] not null default '{}',
  selected_techs text[] not null default '{}',
  calculated_score integer not null default 0,
  ai_experience_level text not null,
  achievement text not null,
  goal text not null,
  created_at bigint not null
);

alter table public.profiles enable row level security;

-- 데모/내부용: 익명 접근 허용 (필요 시 추후 auth 기반으로 강화)
drop policy if exists "anon read profiles" on public.profiles;
create policy "anon read profiles"
on public.profiles
for select
using (true);

drop policy if exists "anon insert profiles" on public.profiles;
create policy "anon insert profiles"
on public.profiles
for insert
with check (true);

drop policy if exists "anon update profiles" on public.profiles;
create policy "anon update profiles"
on public.profiles
for update
using (true)
with check (true);

drop policy if exists "anon delete profiles" on public.profiles;
create policy "anon delete profiles"
on public.profiles
for delete
using (true);

create index if not exists idx_profiles_created_at on public.profiles (created_at desc);

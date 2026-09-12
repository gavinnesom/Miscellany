create extension if not exists pgcrypto;

create table if not exists public.miscellany_editorial_reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  entry_slug text not null,
  entry_title text not null,
  message text not null default '',
  selected_text text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint miscellany_editorial_reviews_user_entry_unique unique (user_id, entry_slug)
);

create index if not exists miscellany_editorial_reviews_user_updated_idx
  on public.miscellany_editorial_reviews (user_id, updated_at desc);

alter table public.miscellany_editorial_reviews enable row level security;

grant usage on schema public to authenticated;
grant select, insert, update, delete on public.miscellany_editorial_reviews to authenticated;

do $$
begin
  create policy miscellany_editorial_reviews_user_isolation
    on public.miscellany_editorial_reviews
    for all
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);
exception
  when duplicate_object then null;
end
$$;

create table if not exists public.miscellany_quiz_entry_readiness (
  user_id uuid not null,
  entry_slug text not null,
  is_ready boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint miscellany_quiz_entry_readiness_user_entry_unique unique (user_id, entry_slug)
);

create index if not exists miscellany_quiz_entry_readiness_user_ready_idx
  on public.miscellany_quiz_entry_readiness (user_id, is_ready, updated_at desc);

alter table public.miscellany_quiz_entry_readiness enable row level security;

grant usage on schema public to authenticated;
grant select, insert, update, delete on public.miscellany_quiz_entry_readiness to authenticated;

do $$
begin
  create policy miscellany_quiz_entry_readiness_user_isolation
    on public.miscellany_quiz_entry_readiness
    for all
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);
exception
  when duplicate_object then null;
end
$$;

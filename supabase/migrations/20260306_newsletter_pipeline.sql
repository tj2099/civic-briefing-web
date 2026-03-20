-- Newsletter pipeline schema updates for Civic Briefing
create extension if not exists pgcrypto;

alter table public.subscribers
  add column if not exists unsubscribe_token text,
  add column if not exists unsubscribed_at timestamptz,
  add column if not exists source text default 'website';

update public.subscribers
set unsubscribe_token = encode(gen_random_bytes(16), 'hex')
where unsubscribe_token is null;

alter table public.subscribers
  alter column unsubscribe_token set default encode(gen_random_bytes(16), 'hex');

alter table public.subscribers
  alter column unsubscribe_token set not null;

alter table public.subscribers
  alter column source set default 'website';

create unique index if not exists subscribers_unsubscribe_token_key
  on public.subscribers (unsubscribe_token);

create index if not exists subscribers_active_city_idx
  on public.subscribers (city_id, status)
  where unsubscribed_at is null;

create table if not exists public.newsletter_issues (
  id bigserial primary key,
  city_id bigint not null references public.cities(id) on delete cascade,
  subject text not null,
  slug text not null,
  send_date timestamptz not null,
  status text not null default 'draft'
    check (status in ('draft', 'queued', 'sending', 'sent', 'failed')),
  html text not null,
  text text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists newsletter_issues_city_slug_key
  on public.newsletter_issues (city_id, slug);

create index if not exists newsletter_issues_status_send_date_idx
  on public.newsletter_issues (status, send_date);

create table if not exists public.newsletter_deliveries (
  id bigserial primary key,
  issue_id bigint not null references public.newsletter_issues(id) on delete cascade,
  subscriber_id bigint not null references public.subscribers(id) on delete cascade,
  provider text not null default 'resend',
  provider_message_id text,
  status text not null check (status in ('sent', 'failed')),
  sent_at timestamptz,
  error text,
  created_at timestamptz not null default now(),
  unique (issue_id, subscriber_id)
);

create index if not exists newsletter_deliveries_issue_idx
  on public.newsletter_deliveries (issue_id);

create index if not exists newsletter_deliveries_subscriber_idx
  on public.newsletter_deliveries (subscriber_id);

create index if not exists newsletter_deliveries_status_created_idx
  on public.newsletter_deliveries (status, created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists newsletter_issues_set_updated_at on public.newsletter_issues;
create trigger newsletter_issues_set_updated_at
before update on public.newsletter_issues
for each row
execute function public.set_updated_at();

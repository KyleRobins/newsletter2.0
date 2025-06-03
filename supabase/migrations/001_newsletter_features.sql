-- Email Templates
create table email_templates (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  content text not null,
  variables jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- A/B Tests
create table ab_tests (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  variant_a jsonb not null,
  variant_b jsonb not null,
  status text not null,
  winner text,
  metrics jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Test Results
create table test_results (
  id uuid default uuid_generate_v4() primary key,
  test_id uuid references ab_tests(id),
  variant text not null,
  opens integer default 0,
  clicks integer default 0,
  conversions integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Segments
create table segments (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  conditions jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
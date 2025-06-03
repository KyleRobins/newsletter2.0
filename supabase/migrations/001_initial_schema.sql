-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create tables
create table if not exists newsletters (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  content text not null,
  tech_track text not null,
  published_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists ab_tests (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  variant_a jsonb not null,
  variant_b jsonb not null,
  status text not null default 'draft',
  winner text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists test_results (
  id uuid default uuid_generate_v4() primary key,
  test_id uuid references ab_tests(id) on delete cascade,
  variant text not null,
  opens integer default 0,
  clicks integer default 0,
  conversions integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
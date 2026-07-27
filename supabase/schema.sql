-- Lis Nery Corretora de Imoveis
-- Run this once in the Supabase project's SQL editor (Project > SQL Editor > New query).

create extension if not exists "pgcrypto";

create table if not exists public.imoveis (
  id uuid primary key default gen_random_uuid(),
  criado_em timestamptz not null default now(),
  titulo text not null,
  tipo text not null, -- apartamento | casa | terreno | comercial | rural
  status text not null default 'disponivel', -- disponivel | vendido | alugado
  destaque boolean not null default false,
  preco numeric(12, 2), -- null = "Consulte o valor" on the site
  finalidade text not null default 'venda', -- venda | aluguel
  endereco text not null,
  bairro text not null,
  cidade text not null default 'Seabra',
  estado text not null default 'BA',
  area_m2 numeric(8, 2),
  quartos int default 0,
  banheiros int default 0,
  vagas int default 0,
  caracteristicas text[] default '{}',
  descricao text,
  fotos text[] default '{}', -- public URLs from the "imoveis" storage bucket
  video_url text -- YouTube/Vimeo embed link
);

create table if not exists public.mensagens_contato (
  id uuid primary key default gen_random_uuid(),
  criado_em timestamptz not null default now(),
  nome text not null,
  telefone text,
  email text,
  mensagem text not null,
  imovel_id uuid references public.imoveis (id) on delete set null,
  lida boolean not null default false
);

create table if not exists public.submissoes_imoveis (
  id uuid primary key default gen_random_uuid(),
  criado_em timestamptz not null default now(),
  nome text not null,
  telefone text not null,
  email text,
  tipo text,
  endereco text,
  preco_pretendido numeric(12, 2),
  descricao text,
  status text not null default 'novo', -- novo | em_analise | publicado | recusado
  revisada boolean not null default false
);

alter table public.imoveis enable row level security;
alter table public.mensagens_contato enable row level security;
alter table public.submissoes_imoveis enable row level security;

-- Public (site visitors, anon key) can only read available/sold listings.
create policy "imoveis publicos podem ler" on public.imoveis
  for select using (true);

-- Anyone can submit a contact message or a property listing suggestion.
create policy "qualquer um pode enviar mensagem" on public.mensagens_contato
  for insert with check (true);

create policy "qualquer um pode enviar imovel" on public.submissoes_imoveis
  for insert with check (true);

-- Writes to imoveis, and reads/updates of mensagens/submissoes, only via the
-- service role key from Server Actions in the admin panel (bypasses RLS).

create index if not exists imoveis_destaque_idx on public.imoveis (destaque) where destaque = true;
create index if not exists imoveis_status_idx on public.imoveis (status);
create index if not exists imoveis_tipo_idx on public.imoveis (tipo);
create index if not exists imoveis_cidade_bairro_idx on public.imoveis (cidade, bairro);

-- Storage bucket for property photos (create in Dashboard > Storage, or via API):
-- bucket name: imoveis, public: true

-- The admin panel uploads photos directly from the browser (not through the
-- server) to stay under Vercel's request body limit, so the logged-in admin's
-- own session needs permission to write to the bucket:
create policy "admin autenticado pode enviar fotos" on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'imoveis');

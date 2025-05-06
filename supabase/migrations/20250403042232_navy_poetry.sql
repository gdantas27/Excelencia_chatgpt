/*
  # Criação da tabela de clientes

  1. Novas Tabelas
    - `clients`
      - `id` (uuid, chave primária)
      - `name` (texto)
      - `email` (texto)
      - `phone` (texto)
      - `type` (enum: residential, commercial)
      - `address` (texto)
      - `city` (texto)
      - `state` (texto)
      - `zip_code` (texto)
      - `created_by` (uuid, referência a users)
      - `created_at` (timestamp)

  2. Segurança
    - Habilitar RLS na tabela `clients`
    - Adicionar política para usuários autenticados lerem e criarem clientes
    - Adicionar política para gestores e administradores gerenciarem todos os clientes
*/

CREATE TYPE client_type AS ENUM ('residential', 'commercial');

CREATE TABLE IF NOT EXISTS clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  phone text,
  type client_type NOT NULL,
  address text,
  city text,
  state text,
  zip_code text,
  created_by uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários autenticados podem ler e criar clientes"
  ON clients
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Usuários autenticados podem criar clientes"
  ON clients
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Gestores e administradores podem gerenciar todos os clientes"
  ON clients
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('admin', 'manager')
    )
  );
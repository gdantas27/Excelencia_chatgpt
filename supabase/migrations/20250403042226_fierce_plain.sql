/*
  # Criação da tabela de usuários

  1. Novas Tabelas
    - `users`
      - `id` (uuid, chave primária)
      - `email` (texto, único)
      - `name` (texto)
      - `role` (enum: admin, manager, operator)
      - `phone` (texto)
      - `status` (boolean)
      - `last_login` (timestamp)
      - `created_at` (timestamp)

  2. Segurança
    - Habilitar RLS na tabela `users`
    - Adicionar política para usuários autenticados lerem seus próprios dados
    - Adicionar política para administradores gerenciarem todos os usuários
*/

CREATE TYPE user_role AS ENUM ('admin', 'manager', 'operator');

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  role user_role NOT NULL,
  phone text,
  status boolean DEFAULT true,
  last_login timestamptz,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem ler seus próprios dados"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Administradores podem gerenciar todos os usuários"
  ON users
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );
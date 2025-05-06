/*
  # Criação da tabela de ordens de serviço

  1. Novas Tabelas
    - `service_orders`
      - `id` (uuid, chave primária)
      - `client_id` (uuid, referência a clients)
      - `type` (texto)
      - `status` (enum: approved, pending, rejected, inspection)
      - `description` (texto)
      - `scheduled_for` (timestamp)
      - `created_by` (uuid, referência a users)
      - `assigned_to` (uuid, referência a users)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Segurança
    - Habilitar RLS na tabela `service_orders`
    - Adicionar política para operadores verem suas próprias ordens
    - Adicionar política para gestores e administradores verem todas as ordens
*/

CREATE TYPE order_status AS ENUM ('approved', 'pending', 'rejected', 'inspection');

CREATE TABLE IF NOT EXISTS service_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES clients(id) NOT NULL,
  type text NOT NULL,
  status order_status NOT NULL DEFAULT 'pending',
  description text,
  scheduled_for timestamptz NOT NULL,
  created_by uuid REFERENCES users(id) NOT NULL,
  assigned_to uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE service_orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Operadores podem ver suas próprias ordens"
  ON service_orders
  FOR SELECT
  TO authenticated
  USING (
    assigned_to = auth.uid() OR
    created_by = auth.uid()
  );

CREATE POLICY "Gestores e administradores podem ver todas as ordens"
  ON service_orders
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('admin', 'manager')
    )
  );
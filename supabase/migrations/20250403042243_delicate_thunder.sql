/*
  # Criação da tabela de notificações

  1. Novas Tabelas
    - `notifications`
      - `id` (uuid, chave primária)
      - `title` (texto)
      - `message` (texto)
      - `type` (enum: info, warning, success)
      - `created_by` (uuid, referência a users)
      - `created_at` (timestamp)

  2. Segurança
    - Habilitar RLS na tabela `notifications`
    - Adicionar política para todos os usuários autenticados lerem notificações
    - Adicionar política para gestores e administradores criarem notificações
*/

CREATE TYPE notification_type AS ENUM ('info', 'warning', 'success');

CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  message text NOT NULL,
  type notification_type NOT NULL DEFAULT 'info',
  created_by uuid REFERENCES users(id) NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários autenticados podem ler notificações"
  ON notifications
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Gestores e administradores podem criar notificações"
  ON notifications
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('admin', 'manager')
    )
  );
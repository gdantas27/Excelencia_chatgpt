/*
  # Budget System Implementation

  1. New Tables
    - `budgets`
      - `id` (uuid, primary key)
      - `client_id` (uuid, references clients)
      - `service_type` (text)
      - `description` (text)
      - `items` (jsonb)
      - `estimated_value` (numeric)
      - `technical_notes` (text)
      - `technician_id` (uuid, references users)
      - `estimated_completion` (timestamptz)
      - `status` (enum: draft, sent, converted)
      - `validity_period` (interval)
      - `created_by` (uuid, references users)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `budgets` table
    - Add policy for authenticated users to read their own budgets
    - Add policy for managers and admins to read all budgets
*/

CREATE TYPE budget_status AS ENUM ('draft', 'sent', 'converted');

CREATE TABLE IF NOT EXISTS budgets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES clients(id) NOT NULL,
  service_type text NOT NULL,
  description text NOT NULL,
  items jsonb NOT NULL DEFAULT '[]',
  estimated_value numeric(10,2) NOT NULL,
  technical_notes text,
  technician_id uuid REFERENCES users(id),
  estimated_completion timestamptz,
  status budget_status NOT NULL DEFAULT 'draft',
  validity_period interval NOT NULL DEFAULT '30 days',
  created_by uuid REFERENCES users(id) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE budgets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own budgets"
  ON budgets
  FOR SELECT
  TO authenticated
  USING (
    created_by = auth.uid() OR
    technician_id = auth.uid()
  );

CREATE POLICY "Managers and admins can manage all budgets"
  ON budgets
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('admin', 'manager')
    )
  );

-- Add trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_budgets_updated_at
  BEFORE UPDATE ON budgets
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
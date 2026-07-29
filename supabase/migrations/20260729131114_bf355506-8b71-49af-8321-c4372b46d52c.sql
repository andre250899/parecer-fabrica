
CREATE TABLE public.estoque_itens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  codigo text NOT NULL,
  descricao text NOT NULL DEFAULT '',
  quantidade integer NOT NULL DEFAULT 0,
  localizacao text NOT NULL DEFAULT '',
  codigo_barras text,
  marca text,
  modelos_aplicados text[] NOT NULL DEFAULT '{}',
  categoria text,
  fonte text,
  foto text,
  criado_por uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX estoque_itens_codigo_lower_idx ON public.estoque_itens (lower(codigo));

GRANT SELECT, INSERT, UPDATE, DELETE ON public.estoque_itens TO authenticated;
GRANT ALL ON public.estoque_itens TO service_role;
ALTER TABLE public.estoque_itens ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated can read estoque_itens" ON public.estoque_itens
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can insert estoque_itens" ON public.estoque_itens
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can update estoque_itens" ON public.estoque_itens
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated can delete estoque_itens" ON public.estoque_itens
  FOR DELETE TO authenticated USING (true);

CREATE TRIGGER estoque_itens_set_updated_at
  BEFORE UPDATE ON public.estoque_itens
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.estoque_movimentos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id uuid REFERENCES public.estoque_itens(id) ON DELETE SET NULL,
  codigo text NOT NULL,
  descricao text NOT NULL DEFAULT '',
  quantidade integer NOT NULL,
  tecnico text NOT NULL DEFAULT '',
  os text NOT NULL DEFAULT '',
  data timestamptz NOT NULL DEFAULT now(),
  criado_por uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX estoque_movimentos_data_idx ON public.estoque_movimentos (data DESC);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.estoque_movimentos TO authenticated;
GRANT ALL ON public.estoque_movimentos TO service_role;
ALTER TABLE public.estoque_movimentos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated can read estoque_movimentos" ON public.estoque_movimentos
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can insert estoque_movimentos" ON public.estoque_movimentos
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can delete estoque_movimentos" ON public.estoque_movimentos
  FOR DELETE TO authenticated USING (true);

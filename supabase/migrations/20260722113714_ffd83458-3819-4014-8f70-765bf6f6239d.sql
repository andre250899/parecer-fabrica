
CREATE TABLE public.pareceres (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  numero_os TEXT NOT NULL,
  cliente_nome TEXT,
  data JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, numero_os)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.pareceres TO authenticated;
GRANT ALL ON public.pareceres TO service_role;
ALTER TABLE public.pareceres ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own pareceres" ON public.pareceres
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER pareceres_updated_at
  BEFORE UPDATE ON public.pareceres
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.atendimentos (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    numero_os text NOT NULL,
    tipo text NOT NULL DEFAULT 'whirlpool',
    cliente_nome text,
    dados jsonb NOT NULL DEFAULT '{}'::jsonb,
    data_agenda date,
    periodo text CHECK (periodo IN ('manha', 'tarde')),
    status text NOT NULL DEFAULT 'nao_agendado' CHECK (status IN ('nao_agendado', 'agendado', 'concluido')),
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.atendimentos TO authenticated;
GRANT ALL ON public.atendimentos TO service_role;

ALTER TABLE public.atendimentos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own atendimentos" ON public.atendimentos
    FOR ALL TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public'
AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

CREATE TRIGGER atendimentos_updated_at
    BEFORE UPDATE ON public.atendimentos
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
ALTER TABLE public.pareceres ADD COLUMN IF NOT EXISTS tipo TEXT NOT NULL DEFAULT 'vox';
ALTER TABLE public.pareceres DROP CONSTRAINT IF EXISTS pareceres_user_id_numero_os_key;
CREATE UNIQUE INDEX IF NOT EXISTS pareceres_user_tipo_os_key ON public.pareceres(user_id, tipo, numero_os);
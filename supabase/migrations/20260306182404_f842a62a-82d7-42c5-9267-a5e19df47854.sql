
CREATE TABLE public.pagamentos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  participante TEXT NOT NULL,
  data TEXT NOT NULL,
  valor NUMERIC NOT NULL DEFAULT 100,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.pagamentos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Todos podem ver pagamentos" ON public.pagamentos FOR SELECT USING (true);
CREATE POLICY "Todos podem inserir pagamentos" ON public.pagamentos FOR INSERT WITH CHECK (true);
CREATE POLICY "Todos podem deletar pagamentos" ON public.pagamentos FOR DELETE USING (true);

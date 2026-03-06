import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Pagamento {
  id: string;
  data: string;
  valor: number;
}

export type PagamentosMap = Record<string, Pagamento[]>;

const PARTICIPANTES = ['Carmelita', 'Cláudio', 'Cecília', 'Valmor'];
const VALOR_TOTAL = 600;
const ABATIMENTO = 100;
const TOTAL_PARCELAS = VALOR_TOTAL / ABATIMENTO;

export const usePagamentos = () => {
  const [pagamentos, setPagamentos] = useState<PagamentosMap>(() => {
    const result: PagamentosMap = {};
    PARTICIPANTES.forEach((nome) => { result[nome] = []; });
    return result;
  });
  const [loading, setLoading] = useState(true);

  // Carregar do banco
  const fetchPagamentos = useCallback(async () => {
    const { data, error } = await supabase
      .from('pagamentos')
      .select('*')
      .order('data', { ascending: false });

    if (error) {
      console.error('Erro ao carregar pagamentos:', error);
      toast.error('Erro ao carregar dados');
      return;
    }

    const result: PagamentosMap = {};
    PARTICIPANTES.forEach((nome) => { result[nome] = []; });

    data?.forEach((row) => {
      if (result[row.participante]) {
        result[row.participante].push({
          id: row.id,
          data: row.data,
          valor: Number(row.valor),
        });
      }
    });

    setPagamentos(result);
    setLoading(false);
  }, []);

  useEffect(() => { fetchPagamentos(); }, [fetchPagamentos]);

  const adicionarPagamento = useCallback(async (nome: string, data: string) => {
    const { data: inserted, error } = await supabase
      .from('pagamentos')
      .insert({ participante: nome, data, valor: ABATIMENTO })
      .select()
      .single();

    if (error) {
      toast.error('Erro ao registrar pagamento');
      console.error(error);
      return;
    }

    setPagamentos((prev) => {
      const novaLista = [...prev[nome], { id: inserted.id, data: inserted.data, valor: Number(inserted.valor) }]
        .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
      const totalPago = novaLista.length * ABATIMENTO;

      if (totalPago >= VALOR_TOTAL) {
        import('canvas-confetti').then((mod) => {
          mod.default({
            particleCount: 150, spread: 80, origin: { y: 0.6 },
            colors: ['#10b981', '#34d399', '#f59e0b', '#8b5cf6', '#ec4899'],
          });
        });
        toast.success(`${nome} quitou a dívida! 🎉`);
      } else {
        toast.success(`Pagamento de ${nome} registrado 💰`);
      }

      return { ...prev, [nome]: novaLista };
    });
  }, []);

  const removerPagamento = useCallback(async (nome: string, idPagamento: string) => {
    if (!window.confirm("Deseja apagar este pagamento?")) return;

    const { error } = await supabase.from('pagamentos').delete().eq('id', idPagamento);

    if (error) {
      toast.error('Erro ao remover pagamento');
      console.error(error);
      return;
    }

    setPagamentos((prev) => ({
      ...prev,
      [nome]: prev[nome].filter((p) => p.id !== idPagamento),
    }));
    toast.info('Pagamento removido 🗑️');
  }, []);

  const getSaldo = (nome: string) => VALOR_TOTAL - (pagamentos[nome]?.length || 0) * ABATIMENTO;
  const getValorPago = (nome: string) => (pagamentos[nome]?.length || 0) * ABATIMENTO;

  const totalArrecadado = Object.values(pagamentos).reduce((acc, curr) => acc + curr.length * ABATIMENTO, 0);
  const totalMetaGlobal = VALOR_TOTAL * PARTICIPANTES.length;
  const totalDevedor = totalMetaGlobal - totalArrecadado;
  const porcentagemPagaGeral = (totalArrecadado / totalMetaGlobal) * 100;
  const todosQuitados = totalArrecadado === totalMetaGlobal && totalMetaGlobal > 0;

  return {
    pagamentos, loading, PARTICIPANTES, VALOR_TOTAL, ABATIMENTO, TOTAL_PARCELAS,
    adicionarPagamento, removerPagamento, getSaldo, getValorPago,
    totalArrecadado, totalDevedor, porcentagemPagaGeral, todosQuitados,
  };
};

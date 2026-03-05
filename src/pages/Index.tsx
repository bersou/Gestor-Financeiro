import { useState, useEffect, useCallback } from "react";
import { BadgeCheck } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import Header from "@/components/Header";
import SummaryCards from "@/components/SummaryCards";
import ParticipantCard from "@/components/ParticipantCard";
import DonutChart from "@/components/DonutChart";
import ProgressChart from "@/components/ProgressChart";
import PaymentModal from "@/components/PaymentModal";
import HistoryModal from "@/components/HistoryModal";

interface Pagamento {
  id: string;
  data: string;
  valor: number;
}

type PagamentosMap = Record<string, Pagamento[]>;

const PARTICIPANTES = ['Carmelita', 'Cláudio', 'Cecília', 'Valmor'];
const VALOR_TOTAL = 600;
const ABATIMENTO = 100;
const TOTAL_PARCELAS = VALOR_TOTAL / ABATIMENTO;

const Index = () => {
  const [pagamentos, setPagamentos] = useState<PagamentosMap>(() => {
    const saved = localStorage.getItem('gestao-valores-data');
    const parsed = saved ? JSON.parse(saved) : {};
    // Garantir que todos os participantes existam no estado
    const result: PagamentosMap = {};
    PARTICIPANTES.forEach((nome) => {
      result[nome] = parsed[nome] || [];
    });
    return result;
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState('');
  const [dataSelecionada, setDataSelecionada] = useState(new Date().toISOString().split('T')[0]);
  const [historicoAberto, setHistoricoAberto] = useState<Record<string, boolean>>({
    Carmelita: false, 'Cláudio': false, 'Cecília': false, 'Valmor': false,
  });
  const [modalDetalhes, setModalDetalhes] = useState({
    aberto: false, tipo: '', titulo: '', dados: [] as any[],
  });
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('gestao-valores-theme');
    return saved ? saved === 'dark' : true;
  });

  useEffect(() => {
    localStorage.setItem('gestao-valores-data', JSON.stringify(pagamentos));
  }, [pagamentos]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('gestao-valores-theme', isDarkMode ? 'dark' : 'light');
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', isDarkMode ? '#020617' : '#f8fafc');
  }, [isDarkMode]);

  const getSaldo = (nome: string) => VALOR_TOTAL - (pagamentos[nome]?.length || 0) * ABATIMENTO;
  const getValorPago = (nome: string) => (pagamentos[nome]?.length || 0) * ABATIMENTO;

  const totalArrecadado = Object.values(pagamentos).reduce((acc, curr) => acc + curr.length * ABATIMENTO, 0);
  const totalMetaGlobal = VALOR_TOTAL * PARTICIPANTES.length;
  const totalDevedor = totalMetaGlobal - totalArrecadado;
  const porcentagemPagaGeral = (totalArrecadado / totalMetaGlobal) * 100;
  const todosQuitados = totalArrecadado === totalMetaGlobal && totalMetaGlobal > 0;

  const abrirModal = (nome: string) => {
    setUsuarioSelecionado(nome);
    setDataSelecionada(new Date().toISOString().split('T')[0]);
    setModalOpen(true);
  };

  const confirmarPagamento = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!usuarioSelecionado) return;
    const novoPagamento: Pagamento = { id: crypto.randomUUID(), data: dataSelecionada, valor: ABATIMENTO };

    setPagamentos((prev) => {
      const novaLista = [...prev[usuarioSelecionado], novoPagamento].sort(
        (a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()
      );
      const totalPago = novaLista.length * ABATIMENTO;

      if (totalPago >= VALOR_TOTAL) {
        import('canvas-confetti').then((mod) => {
          mod.default({
            particleCount: 150, spread: 80, origin: { y: 0.6 },
            colors: ['#10b981', '#34d399', '#f59e0b', '#8b5cf6', '#ec4899'],
          });
        });
        toast.success(`${usuarioSelecionado} quitou a dívida! 🎉`);
      } else {
        toast.success(`Pagamento de ${usuarioSelecionado} registrado 💰`);
      }

      return { ...prev, [usuarioSelecionado]: novaLista };
    });

    setModalOpen(false);
    setUsuarioSelecionado('');
  }, [usuarioSelecionado, dataSelecionada]);

  const removerPagamento = (nome: string, idPagamento: string) => {
    if (window.confirm("Deseja apagar este pagamento?")) {
      setPagamentos((prev) => ({
        ...prev,
        [nome]: prev[nome].filter((p) => p.id !== idPagamento),
      }));
      toast.info('Pagamento removido 🗑️');
    }
  };

  const abrirModalDetalhes = (tipo: string, nome: string | null = null) => {
    let dados: any[] = [];
    let titulo = '';
    if (tipo === 'pessoa' && nome) {
      dados = pagamentos[nome].map((p) => ({ ...p, nomePessoa: nome }));
      titulo = `Histórico de ${nome}`;
    } else if (tipo === 'geral') {
      dados = Object.entries(pagamentos)
        .flatMap(([nomePessoa, lista]) => lista.map((pag) => ({ ...pag, nomePessoa })))
        .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
      titulo = 'Histórico Geral';
    }
    setModalDetalhes({ aberto: true, tipo, titulo, dados });
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden flex flex-col items-center pb-16">
      {/* Background gradient */}
      <div className="fixed top-0 left-0 w-full h-[500px] pointer-events-none bg-gradient-to-b from-primary/5 to-transparent" />

      <div className="w-full max-w-4xl px-4 py-6 md:p-8 space-y-6 z-10">
        <Header isDarkMode={isDarkMode} onToggleTheme={() => setIsDarkMode(prev => !prev)} />
        <SummaryCards totalArrecadado={totalArrecadado} totalDevedor={totalDevedor} />

        {todosQuitados && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-4 rounded-2xl flex items-center justify-center gap-3 font-bold text-accent"
          >
            <BadgeCheck className="w-6 h-6" />
            Todas as cotas foram finalizadas! 🎉
          </motion.div>
        )}

        {/* Participant Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PARTICIPANTES.map((nome, index) => (
            <ParticipantCard
              key={nome}
              nome={nome}
              saldo={getSaldo(nome)}
              parcelasPagas={pagamentos[nome]?.length || 0}
              totalParcelas={TOTAL_PARCELAS}
              quitado={getSaldo(nome) === 0}
              pagamentos={pagamentos[nome] || []}
              historicoAberto={historicoAberto[nome]}
              onAbrirModal={() => abrirModal(nome)}
              onToggleHistorico={() => setHistoricoAberto((prev) => ({ ...prev, [nome]: !prev[nome] }))}
              onRemoverPagamento={(id) => removerPagamento(nome, id)}
              index={index}
            />
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <DonutChart
            porcentagem={porcentagemPagaGeral}
            onClick={() => abrirModalDetalhes('geral')}
          />
          <ProgressChart
            participantes={PARTICIPANTES}
            getValorPago={getValorPago}
            valorTotal={VALOR_TOTAL}
            onClickPessoa={(nome) => abrirModalDetalhes('pessoa', nome)}
          />
        </div>
      </div>

      {/* Modals */}
      <PaymentModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setUsuarioSelecionado(''); }}
        onConfirm={confirmarPagamento}
        usuarioSelecionado={usuarioSelecionado}
        dataSelecionada={dataSelecionada}
        onDateChange={setDataSelecionada}
        abatimento={ABATIMENTO}
      />
      <HistoryModal
        isOpen={modalDetalhes.aberto}
        onClose={() => setModalDetalhes((prev) => ({ ...prev, aberto: false }))}
        titulo={modalDetalhes.titulo}
        tipo={modalDetalhes.tipo}
        dados={modalDetalhes.dados}
      />
    </div>
  );
};

export default Index;

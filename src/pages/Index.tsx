import { useState, useEffect } from "react";
import { BadgeCheck } from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import SummaryCards from "@/components/SummaryCards";
import ParticipantCard from "@/components/ParticipantCard";
import DonutChart from "@/components/DonutChart";
import ProgressChart from "@/components/ProgressChart";
import PaymentModal from "@/components/PaymentModal";
import HistoryModal from "@/components/HistoryModal";
import { usePagamentos } from "@/hooks/usePagamentos";

const Index = () => {
  const {
    pagamentos, loading, PARTICIPANTES, ABATIMENTO, TOTAL_PARCELAS,
    adicionarPagamento, removerPagamento, getSaldo, getValorPago,
    totalArrecadado, totalDevedor, porcentagemPagaGeral, todosQuitados, VALOR_TOTAL,
  } = usePagamentos();

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
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('gestao-valores-theme', isDarkMode ? 'dark' : 'light');
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', isDarkMode ? '#020617' : '#f8fafc');
  }, [isDarkMode]);

  const abrirModal = (nome: string) => {
    setUsuarioSelecionado(nome);
    setDataSelecionada(new Date().toISOString().split('T')[0]);
    setModalOpen(true);
  };

  const confirmarPagamento = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!usuarioSelecionado) return;
    await adicionarPagamento(usuarioSelecionado, dataSelecionada);
    setModalOpen(false);
    setUsuarioSelecionado('');
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-x-hidden flex flex-col items-center pb-16">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <DonutChart porcentagem={porcentagemPagaGeral} onClick={() => abrirModalDetalhes('geral')} />
          <ProgressChart
            participantes={PARTICIPANTES}
            getValorPago={getValorPago}
            valorTotal={VALOR_TOTAL}
            onClickPessoa={(nome) => abrirModalDetalhes('pessoa', nome)}
          />
        </div>
      </div>

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

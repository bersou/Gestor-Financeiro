import { motion, AnimatePresence } from "framer-motion";
import { Plus, BadgeCheck, ChevronDown, ChevronUp, History, Trash2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAvatar } from "./Avatars";

interface Pagamento {
  id: string;
  data: string;
  valor: number;
}

interface ParticipantCardProps {
  nome: string;
  saldo: number;
  parcelasPagas: number;
  totalParcelas: number;
  quitado: boolean;
  pagamentos: Pagamento[];
  historicoAberto: boolean;
  onAbrirModal: () => void;
  onToggleHistorico: () => void;
  onRemoverPagamento: (id: string) => void;
  index: number;
}

const formatarDataBR = (dataString: string) => {
  if (!dataString) return '';
  const [ano, mes, dia] = dataString.split('-');
  return `${dia}/${mes}/${ano}`;
};

const ParticipantCard = ({
  nome, saldo, parcelasPagas, totalParcelas, quitado,
  pagamentos, historicoAberto, onAbrirModal, onToggleHistorico,
  onRemoverPagamento, index,
}: ParticipantCardProps) => {
  const Avatar = getAvatar(nome);
  const progresso = (parcelasPagas / totalParcelas) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 + index * 0.1 }}
      className={`glass-card rounded-3xl overflow-hidden transition-all duration-300 ${
        quitado ? 'ring-2 ring-accent/30' : 'hover:shadow-xl hover:-translate-y-1'
      }`}
    >
      <div className="p-6 space-y-5">
        {/* Avatar + Name */}
        <div className="flex items-center gap-4">
          <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-border bg-secondary flex-shrink-0">
            <Avatar />
            {quitado && (
              <div className="absolute inset-0 bg-accent/20 backdrop-blur-[1px] flex items-center justify-center">
                <BadgeCheck className="w-6 h-6 text-accent" strokeWidth={3} />
              </div>
            )}
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground">{nome}</h2>
            <p className="text-xs font-medium text-muted-foreground">
              {quitado ? 'Dívida quitada ✓' : `${parcelasPagas}/${totalParcelas} parcelas`}
            </p>
          </div>
        </div>

        {/* Balance */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Falta pagar</p>
          <p className={`text-3xl font-bold tracking-tight ${quitado ? 'text-accent' : 'text-foreground'}`}>
            R$ {saldo}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold text-muted-foreground">
            <span>Progresso</span>
            <span className={quitado ? 'text-accent' : ''}>{Math.round(progresso)}%</span>
          </div>
          <div className="h-2.5 w-full bg-secondary rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progresso}%` }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 + index * 0.1 }}
              className="h-full rounded-full bg-gradient-to-r from-destructive via-amber to-accent"
            />
          </div>
        </div>

        {/* Button */}
        <Button
          onClick={onAbrirModal}
          disabled={quitado}
          className="w-full h-12 rounded-xl text-sm font-bold"
          variant={quitado ? "secondary" : "default"}
        >
          {quitado ? 'Dívida Quitada' : <><Plus className="w-4 h-4" /> Registrar Pagamento</>}
        </Button>
      </div>

      {/* History */}
      <div className="border-t border-border">
        <button
          onClick={onToggleHistorico}
          className="w-full flex items-center justify-between p-4 px-6 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          <span className="flex items-center gap-2">
            <History className="w-4 h-4" /> Histórico ({parcelasPagas})
          </span>
          {historicoAberto ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        <AnimatePresence>
          {historicoAberto && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 space-y-2">
                {pagamentos.length === 0 ? (
                  <p className="text-xs text-center py-3 text-muted-foreground">Nenhum pagamento registrado.</p>
                ) : (
                  pagamentos.map((pag, idx) => (
                    <motion.div
                      key={pag.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex justify-between items-center p-3 rounded-xl bg-secondary/50 border border-border"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold bg-secondary text-muted-foreground">
                          {idx + 1}
                        </div>
                        <div>
                          <span className="font-bold text-sm text-foreground">R$ {pag.valor},00</span>
                          <span className="text-[11px] flex items-center gap-1 font-medium text-accent mt-0.5">
                            <Calendar className="w-3 h-3" /> {formatarDataBR(pag.data)}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => onRemoverPagamento(pag.id)}
                        className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ParticipantCard;

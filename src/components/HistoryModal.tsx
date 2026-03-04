import { AnimatePresence, motion } from "framer-motion";
import { History, X, PiggyBank, Calendar } from "lucide-react";
import { getAvatar } from "./Avatars";

interface PagamentoDetalhe {
  id: string;
  data: string;
  valor: number;
  nomePessoa: string;
}

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  titulo: string;
  tipo: string;
  dados: PagamentoDetalhe[];
}

const formatarDataBR = (dataString: string) => {
  if (!dataString) return '';
  const [ano, mes, dia] = dataString.split('-');
  return `${dia}/${mes}/${ano}`;
};

const HistoryModal = ({ isOpen, onClose, titulo, tipo, dados }: HistoryModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4 bg-foreground/40 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full md:w-[32rem] bg-card rounded-t-3xl md:rounded-3xl shadow-2xl max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h3 className="text-lg font-bold flex items-center gap-2 text-foreground">
                <div className="p-2 rounded-xl bg-primary/10">
                  <History className="w-5 h-5 text-primary" />
                </div>
                {titulo}
              </h3>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-secondary text-muted-foreground hover:bg-secondary/80 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 md:p-6 overflow-y-auto space-y-3">
              {dados.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
                  <PiggyBank className="w-12 h-12 mb-3 opacity-50" strokeWidth={1} />
                  <p className="font-medium">Nenhum pagamento registrado.</p>
                </div>
              ) : (
                dados.map((pag, idx) => {
                  const Avatar = getAvatar(pag.nomePessoa);
                  return (
                    <motion.div
                      key={`${pag.id}-${idx}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.03 }}
                      className="flex items-center justify-between p-4 rounded-2xl bg-secondary/50 border border-border"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-secondary border border-border">
                          <Avatar />
                        </div>
                        <div>
                          <div className="flex items-baseline gap-2">
                            <span className="font-bold text-lg text-foreground">R$ {pag.valor},00</span>
                            {tipo === 'geral' && (
                              <span className="text-sm font-medium text-muted-foreground">por {pag.nomePessoa}</span>
                            )}
                          </div>
                          <p className="text-xs flex items-center gap-1 font-medium text-accent mt-0.5">
                            <Calendar className="w-3 h-3" /> {formatarDataBR(pag.data)}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HistoryModal;

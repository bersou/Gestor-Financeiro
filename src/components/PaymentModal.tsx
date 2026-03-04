import { AnimatePresence, motion } from "framer-motion";
import { Plus, X, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAvatar } from "./Avatars";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (e: React.FormEvent) => void;
  usuarioSelecionado: string;
  dataSelecionada: string;
  onDateChange: (date: string) => void;
  abatimento: number;
}

const PaymentModal = ({
  isOpen, onClose, onConfirm, usuarioSelecionado,
  dataSelecionada, onDateChange, abatimento,
}: PaymentModalProps) => {
  const Avatar = getAvatar(usuarioSelecionado);

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
            className="w-full md:w-[28rem] rounded-t-3xl md:rounded-3xl bg-card shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold flex items-center gap-2 text-foreground">
                  <div className="p-2 rounded-xl bg-primary/10">
                    <Plus className="w-5 h-5 text-primary" />
                  </div>
                  Nova Parcela
                </h3>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full bg-secondary text-muted-foreground hover:bg-secondary/80 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={onConfirm} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-muted-foreground">Pagador</label>
                  <div className="w-full p-4 rounded-xl border border-border font-bold text-lg flex items-center gap-4 bg-secondary/50 text-foreground">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-secondary border border-border">
                      <Avatar />
                    </div>
                    {usuarioSelecionado}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-muted-foreground">Valor Fixo</label>
                  <div className="w-full p-4 rounded-xl border border-accent/30 font-bold text-lg bg-accent/5 text-accent">
                    R$ {abatimento},00
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-muted-foreground">Data do Pagamento</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                    <input
                      type="date"
                      required
                      value={dataSelecionada}
                      onChange={(e) => onDateChange(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 border border-border rounded-xl font-semibold focus:ring-2 focus:ring-primary outline-none transition-all bg-secondary/50 text-foreground [color-scheme:dark]"
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full h-14 rounded-xl font-bold text-base mt-2">
                  Confirmar R$ {abatimento}
                </Button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;

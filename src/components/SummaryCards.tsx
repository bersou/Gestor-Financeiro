import { motion } from "framer-motion";
import { Wallet, Clock } from "lucide-react";

interface SummaryCardsProps {
  totalArrecadado: number;
  totalDevedor: number;
}

const SummaryCards = ({ totalArrecadado, totalDevedor }: SummaryCardsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="grid grid-cols-2 gap-4"
    >
      <div className="glass-card rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 rounded-xl bg-accent/10">
            <Wallet className="w-4 h-4 text-accent" />
          </div>
          <p className="text-[11px] uppercase font-bold tracking-wider text-muted-foreground">Em Caixa</p>
        </div>
        <p className="text-2xl md:text-3xl font-bold text-accent">
          R$ {totalArrecadado}
        </p>
      </div>
      <div className="glass-card rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 rounded-xl bg-amber/10">
            <Clock className="w-4 h-4 text-amber" />
          </div>
          <p className="text-[11px] uppercase font-bold tracking-wider text-muted-foreground">Pendente</p>
        </div>
        <p className="text-2xl md:text-3xl font-bold text-foreground">
          R$ {totalDevedor}
        </p>
      </div>
    </motion.div>
  );
};

export default SummaryCards;

import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { getAvatar } from "./Avatars";

interface ProgressChartProps {
  participantes: string[];
  getValorPago: (nome: string) => number;
  valorTotal: number;
  onClickPessoa: (nome: string) => void;
}

const ProgressChart = ({ participantes, getValorPago, valorTotal, onClickPessoa }: ProgressChartProps) => {
  const gridValues = [600, 450, 300, 150, 0];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4 }}
      className="glass-card rounded-3xl p-6 md:p-8 flex flex-col h-[400px] md:h-auto"
    >
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-lg font-bold flex items-center gap-3 text-foreground">
          <div className="p-3 rounded-xl bg-accent/10">
            <TrendingUp className="w-7 h-7 text-accent" />
          </div>
          Progresso
        </h3>
        <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-secondary text-muted-foreground border border-border">
          Alvo: R$ {valorTotal}
        </span>
      </div>

      <div className="flex-1 relative mt-2">
        {/* Grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none z-0">
          {gridValues.map((val) => (
            <div key={val} className="w-full border-t border-dashed border-border relative">
              <span className="absolute -top-3 left-0 px-1 text-[10px] font-bold bg-card text-muted-foreground">
                R$ {val}
              </span>
            </div>
          ))}
        </div>

        {/* Bars */}
        <div className="absolute inset-0 ml-10 md:ml-12 flex items-end justify-around z-10 h-full pb-[1px]">
          {participantes.map((nome) => {
            const valorPago = getValorPago(nome);
            const altura = (valorPago / valorTotal) * 100;
            const Avatar = getAvatar(nome);

            return (
              <div
                key={nome}
                onClick={() => onClickPessoa(nome)}
                className="flex flex-col items-center justify-end h-full w-full max-w-[5rem] md:max-w-[6rem] cursor-pointer group"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 mb-3 relative z-10 group-hover:-translate-y-2 transition-transform duration-300 drop-shadow-lg">
                  <Avatar />
                </div>

                {valorPago > 0 && (
                  <div className="mb-2 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-foreground text-background shadow-sm z-20">
                    R$ {valorPago}
                  </div>
                )}

                <div className="relative w-10 md:w-12 h-full rounded-t-xl bg-secondary overflow-hidden border-x border-t border-border">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${altura}%` }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
                    className="absolute bottom-0 w-full rounded-t-lg overflow-hidden"
                  >
                    <div className="absolute bottom-0 left-0 w-full h-[250px] bg-gradient-to-t from-destructive via-amber to-accent opacity-90 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                </div>
                <span className="mt-3 font-bold text-sm text-foreground">{nome}</span>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default ProgressChart;

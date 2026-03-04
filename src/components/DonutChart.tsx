import { motion } from "framer-motion";
import { PieChart } from "lucide-react";

interface DonutChartProps {
  porcentagem: number;
  onClick?: () => void;
}

const DonutChart = ({ porcentagem, onClick }: DonutChartProps) => {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (porcentagem / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 }}
      onClick={onClick}
      className="glass-card rounded-3xl p-6 md:p-8 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center"
    >
      <h3 className="w-full text-lg font-bold mb-6 flex items-center gap-3 text-foreground">
        <div className="p-2 rounded-xl bg-primary/10">
          <PieChart className="w-5 h-5 text-primary" />
        </div>
        Resumo Geral
      </h3>

      <div className="relative w-48 h-48 md:w-56 md:h-56 flex items-center justify-center">
        <svg className="w-full h-full -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r={`${radius}%`}
            fill="none"
            className="stroke-secondary"
            strokeWidth="10%"
          />
          <motion.circle
            cx="50%"
            cy="50%"
            r={`${radius}%`}
            fill="none"
            stroke="url(#gradientGeral)"
            strokeWidth="10%"
            strokeDasharray={`${circumference}%`}
            strokeLinecap="round"
            initial={{ strokeDashoffset: `${circumference}%` }}
            animate={{ strokeDashoffset: `${offset}%` }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
          />
          <defs>
            <linearGradient id="gradientGeral" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(0, 84%, 60%)" />
              <stop offset="50%" stopColor="hsl(38, 92%, 50%)" />
              <stop offset="100%" stopColor="hsl(160, 84%, 39%)" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute text-center flex flex-col items-center">
          <span className="block text-4xl md:text-5xl font-bold text-foreground">
            {Math.round(porcentagem)}%
          </span>
          <span className="block text-[10px] font-bold uppercase tracking-widest mt-1 text-muted-foreground">
            Concluído
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default DonutChart;

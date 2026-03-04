import { PiggyBank, Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

interface HeaderProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

const Header = ({ isDarkMode, onToggleTheme }: HeaderProps) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onClick={onToggleTheme}
      className="relative flex items-center justify-center gap-4 p-8 md:p-10 rounded-3xl overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-accent cursor-pointer active:scale-[0.98] transition-transform duration-200 select-none"
      title="Toque para alternar o tema"
    >
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 -mr-10 -mt-10 w-48 h-48 rounded-full bg-primary-foreground/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-40 h-40 rounded-full bg-primary-foreground/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex items-center gap-4">
        <div className="relative p-3.5 bg-primary-foreground/20 backdrop-blur-md border border-primary-foreground/30 rounded-2xl overflow-visible">
          <div className="absolute top-[-22px] left-1/2 -translate-x-1/2 coin-drop pointer-events-none">
            <div className="w-5 h-5 bg-gradient-to-b from-amber to-amber/70 rounded-full border-2 border-amber/50 shadow-[0_0_12px_hsl(var(--amber)/0.8)]" />
          </div>
          <PiggyBank className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground piggy-wiggle relative z-10" />
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-primary-foreground drop-shadow-md">
          Gestão de Valores
        </h1>
        <div className="ml-2 p-2 rounded-full bg-primary-foreground/20 text-primary-foreground">
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </div>
      </div>
    </motion.header>
  );
};

export default Header;

import { motion } from 'framer-motion';
import { Droplets, BarChart3, ClipboardCheck, Shield } from 'lucide-react';

export function Hero() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="text-white"
    >
      <motion.div variants={item} className="flex items-center gap-3 mb-8">
        <div className="relative">
          <Droplets className="text-brand-primary w-8 h-8 floating" />
          <div className="absolute inset-0 bg-brand-primary/10 blur-xl -z-10" />
        </div>
        <h2 className="text-brand-primary font-medium tracking-wide">SISTEMA DE GESTÃO</h2>
      </motion.div>
      
      <motion.h1 variants={item} className="text-5xl font-bold leading-tight mb-6">
        <span className="text-gradient">Portal de Gestão</span>
        <span className="block text-white/90 mt-2">Excelência em Saneamento</span>
      </motion.h1>
      
      <motion.p variants={item} className="text-white/70 text-xl leading-relaxed mb-12">
        Gerencie suas operações, equipes e relatórios em uma única plataforma integrada.
      </motion.p>

      <motion.div variants={item} className="space-y-4 bg-white/10 p-6 rounded-2xl backdrop-blur-sm">
        {[
          { icon: BarChart3, text: "Gestão completa de operações e relatórios" },
          { icon: ClipboardCheck, text: "Análise de desempenho e indicadores" },
          { icon: Shield, text: "Controle e acompanhamento de equipes" }
        ].map((item, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className="p-2 rounded-lg bg-brand-primary/20 text-brand-primary">
              <item.icon size={20} />
            </div>
            <p className="text-white/80">{item.text}</p>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
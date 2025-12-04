import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Crosshair } from "lucide-react";
import logoUrl from '@assets/99E92385-AEB2-4B23-B33B-B4F17935BE6E_1764737355196.png';

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-background pt-10 pb-20 lg:pt-20 lg:pb-32">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      
      {/* Radial Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background" />

      <div className="container relative z-10 mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center mb-8">
             <img src={logoUrl} alt="HellShot Logo" className="h-32 md:h-48 object-contain drop-shadow-[0_0_15px_rgba(255,0,0,0.5)]" />
          </div>

          <div className="inline-flex items-center rounded-full border border-neon-red/30 bg-neon-red/10 px-3 py-1 text-sm font-medium text-neon-red backdrop-blur-sm mb-6">
            <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-neon-red" />
            Desconto válido até hoje
          </div>

          <h1 className="mx-auto max-w-4xl font-display text-5xl font-black uppercase tracking-tighter text-white sm:text-6xl md:text-7xl lg:text-8xl">
            Melhore Sua <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-red to-red-600 text-glow-red">Mira</span> <br />
            Hoje Mesmo!
          </h1>

          <p className="mx-auto mt-6 max-w-2xl font-sans text-lg text-muted-foreground sm:text-xl">
            Quer vencer todos os X1s e ser o destaque da sua squad? Essa é a ferramenta que você precisa para dominar o jogo.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button 
              size="lg" 
              className="h-14 w-full bg-neon-red px-8 text-lg font-bold text-white hover:bg-neon-red/90 sm:w-auto shadow-[0_0_20px_rgba(255,0,0,0.4)] border border-red-500"
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Crosshair className="mr-2 h-5 w-5" />
              QUERO DAR SÓ CAPA
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="h-14 w-full border-white/20 bg-white/5 text-lg backdrop-blur-sm hover:bg-white/10 hover:text-neon-red hover:border-neon-red/50 sm:w-auto"
              onClick={() => document.querySelector('#video-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Ver como funciona
            </Button>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-neon-red" />
              +27k Players Ativos
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-neon-red" />
              100% Anti-Ban
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

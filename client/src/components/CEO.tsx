import { motion } from "framer-motion";
import { Instagram, CheckCircle2 } from "lucide-react";
import logoUrl from '@assets/99E92385-AEB2-4B23-B33B-B4F17935BE6E_1764737355196.png';

export function CEO() {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-red-950/10">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-red-900/20 bg-card/50 p-8 md:p-12 backdrop-blur-md shadow-[0_0_50px_rgba(220,20,60,0.05)]"
        >
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center">
            <div className="flex-1">
              <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-2xl border-2 border-neon-red/30 shadow-2xl shadow-neon-red/10 bg-black/50 flex items-center justify-center p-8">
                <img 
                  src={logoUrl}
                  alt="Kael Martins CEO" 
                  className="w-full h-full object-contain drop-shadow-[0_0_25px_rgba(255,0,0,0.4)]"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6">
                  <h3 className="font-display text-2xl font-bold text-white">Kael Martins</h3>
                  <p className="text-neon-red font-tech">CEO & Founder</p>
                </div>
              </div>
            </div>
            
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-neon-red/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-neon-red border border-neon-red/20">
                <CheckCircle2 className="h-4 w-4" />
                Verificado
              </div>
              
              <h2 className="text-3xl font-display font-bold text-white sm:text-4xl">
                Quem é o criador do <span className="text-neon-red">Painel HellShot?</span>
              </h2>
              
              <div className="space-y-4 text-lg text-muted-foreground font-sans leading-relaxed">
                <p>
                  Fala tropa! Eu me chamo <strong className="text-white">Kael Martins</strong>. Tenho 19 anos e sou especialista em otimização de sensibilidade para FPS.
                </p>
                <p>
                  Atuo nesse mercado desenvolvendo soluções que ajudam players comuns a se tornarem lendas no servidor. O HellShot não é apenas um painel, é o resultado de anos de testes e aperfeiçoamento.
                </p>
                <p>
                  Minha missão é simples: entregar a melhor ferramenta do mercado com segurança total e preço justo.
                </p>
              </div>

              <div className="pt-4">
                <a 
                  href="https://instagram.com/Kaelzin.digital" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-red-600 to-red-900 px-6 py-3 font-bold text-white transition-transform hover:scale-105 border border-red-500/50 shadow-[0_0_15px_rgba(220,20,60,0.3)]"
                >
                  <Instagram className="h-6 w-6" />
                  @Kaelzin.digital
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

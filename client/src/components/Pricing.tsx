import { motion } from "framer-motion";
import { Check, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export function Pricing() {
  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      
      <div className="container relative z-10 mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-display font-bold text-white mb-4">
            Escolha Seu <span className="text-neon-red">Plano</span>
          </h2>
          <p className="text-muted-foreground">Acesso imediato após a confirmação do pagamento.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {/* Basic Plan */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="relative h-full border-white/10 bg-card/50 backdrop-blur-sm hover:border-red-900/50 transition-all">
              <CardHeader className="text-center pb-2">
                <h3 className="text-xl font-bold text-muted-foreground uppercase tracking-widest">Iniciante</h3>
                <div className="mt-4 flex items-baseline justify-center gap-1">
                  <span className="text-sm text-muted-foreground line-through">R$ 19,90</span>
                </div>
                <div className="text-5xl font-black text-white">
                  R$ 7,00
                </div>
              </CardHeader>
              <CardContent className="pt-8">
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-sm">
                    <Check className="h-5 w-5 text-neon-red shrink-0" />
                    <span>Painel HellShot V1</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm">
                    <Check className="h-5 w-5 text-neon-red shrink-0" />
                    <span>Atualizações Mensais</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm">
                    <Check className="h-5 w-5 text-neon-red shrink-0" />
                    <span>Anti-Ban Básico</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Check className="h-5 w-5 text-muted-foreground/30 shrink-0" />
                    <span>Sem acesso ao Grupo VIP</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-white/10 hover:bg-white/20 text-white h-12 font-bold"
                  onClick={() => window.open("https://app.pushinpay.com.br/service/pay/A0808BCC-916B-4046-A1A2-D643DC409BC8", "_blank")}
                >
                  COMPRAR AGORA
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Pro Plan */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="relative h-full border-neon-red bg-card shadow-2xl shadow-neon-red/10 transform scale-105 z-10">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-neon-red px-4 py-1 text-xs font-black uppercase text-white shadow-lg shadow-neon-red/50 border border-red-400">
                Mais Vendido
              </div>
              <CardHeader className="text-center pb-2">
                <h3 className="text-xl font-bold text-neon-red uppercase tracking-widest flex items-center justify-center gap-2">
                  <Star className="h-5 w-5 fill-current" />
                  Pro Player
                </h3>
                <div className="mt-4 flex items-baseline justify-center gap-1">
                  <span className="text-sm text-muted-foreground line-through">R$ 47,90</span>
                </div>
                <div className="text-6xl font-black text-white text-glow-red">
                  R$ 11,99
                </div>
              </CardHeader>
              <CardContent className="pt-8">
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-sm font-bold text-white">
                    <div className="rounded-full bg-neon-red/20 p-1">
                      <Zap className="h-4 w-4 text-neon-red" />
                    </div>
                    <span>Painel HellShot V2 (Completo)</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm">
                    <Check className="h-5 w-5 text-neon-red shrink-0" />
                    <span>Grupo VIP de Clientes</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm">
                    <Check className="h-5 w-5 text-neon-red shrink-0" />
                    <span>Atualizações Semanais</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm">
                    <Check className="h-5 w-5 text-neon-red shrink-0" />
                    <span>100% Anti-Ban Garantido</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm">
                    <Check className="h-5 w-5 text-neon-red shrink-0" />
                    <span>Bônus: Pack de Sensis Youtubers</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm">
                    <Check className="h-5 w-5 text-neon-red shrink-0" />
                    <span>Bônus: Regedit Mobile</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-neon-red hover:bg-red-600 text-white h-12 font-black text-lg shadow-lg shadow-neon-red/25 animate-pulse border border-red-400"
                  onClick={() => window.open("https://app.pushinpay.com.br/service/pay/A0808D39-C41C-4CF8-BE4F-CE9C6B0039C7", "_blank")}
                >
                  GARANTIR VAGA AGORA
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

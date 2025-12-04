import { motion } from "framer-motion";
import { Target, Shield, Zap, Smartphone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Target,
    title: "Mira Grudada",
    description: "Sua mira vai grudar na cabeça dos inimigos automaticamente.",
    color: "text-neon-red"
  },
  {
    icon: Shield,
    title: "100% Anti-Ban",
    description: "Sistema de proteção avançado. Jogue sem medo de perder sua conta.",
    color: "text-gold"
  },
  {
    icon: Zap,
    title: "Zero Delay",
    description: "Otimização máxima para garantir que cada tiro conte instantaneamente.",
    color: "text-orange-500"
  },
  {
    icon: Smartphone,
    title: "Compatibilidade Total",
    description: "Android: Painel Nativo Otimizado. iPhone (iOS): Headtrick 99% de Capa.",
    color: "text-blue-400"
  }
];

export function Features() {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-display font-bold text-white sm:text-4xl md:text-5xl">
            Domine o <span className="text-neon-red">Campo de Batalha</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Não importa se você é mobile ou emulador, nossa ferramenta foi feita para você.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full border-white/5 bg-white/5 backdrop-blur-sm hover:border-neon-red/50 transition-colors duration-300 hover:bg-red-950/20">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className={`mb-4 rounded-2xl bg-black/40 p-4 ${feature.color} border border-white/5`}>
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-white">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

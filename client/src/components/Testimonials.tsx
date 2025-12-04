import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import avatar1 from '@assets/generated_images/red_and_black_esports_mascot_logo_of_a_skull_or_reaper.png';
import avatar2 from '@assets/generated_images/red_and_black_esports_mascot_logo_of_a_wolf.png';
import avatar3 from '@assets/generated_images/red_and_black_esports_mascot_logo_of_a_demon_samurai.png';

const testimonials = [
  {
    name: "Nobru",
    role: "Streamer",
    content: "Não acreditava muito nessas paradas de otimização, mas o HellShot realmente entrega o que promete. A sensibilidade fica lisinha.",
    avatar: avatar1
  },
  {
    name: "Cerol",
    role: "Influencer",
    content: "Simplesmente o melhor painel do cenário atual. O suporte do Kael é diferenciado também.",
    avatar: avatar2
  },
  {
    name: "Uriel Xiit",
    role: "Pro Player",
    content: "Deixei de usar meu próprio painel pra usar o do Kael. A tecnologia que ele usa no HellShot é de outro mundo, recomendo demais!",
    avatar: avatar3
  }
];

export function Testimonials() {
  return (
    <section className="py-24 bg-black/20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-display font-bold text-white sm:text-4xl">
            Quem usa, <span className="text-neon-red">Recomenda</span>
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full border-white/5 bg-card/30 hover:border-neon-red/30 transition-colors">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-neon-red text-neon-red" />
                    ))}
                  </div>
                  <p className="mb-6 text-muted-foreground italic">"{testimonial.content}"</p>
                  <div className="flex items-center gap-4">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="h-12 w-12 rounded-full border-2 border-neon-red/20 object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-white">{testimonial.name}</h4>
                      <p className="text-xs text-neon-red">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

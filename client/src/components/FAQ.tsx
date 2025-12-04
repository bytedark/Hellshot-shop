import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function FAQ() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl font-display font-bold text-white text-center mb-12">
          Perguntas Frequentes
        </h2>
        
        <Accordion type="single" collapsible className="w-full space-y-4">
          <AccordionItem value="item-1" className="border border-white/10 rounded-lg px-4 bg-card/30 hover:border-red-900/50 transition-colors">
            <AccordionTrigger className="text-left hover:no-underline hover:text-neon-red">
              Meus dados estão protegidos?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Sim. Nosso site tem segurança SSL de ponta a ponta, todas as informações são criptografadas.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="border border-white/10 rounded-lg px-4 bg-card/30 hover:border-red-900/50 transition-colors">
            <AccordionTrigger className="text-left hover:no-underline hover:text-neon-red">
              Funciona só no celular?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              O painel HELLSHOT funciona tanto no celular (Android/iOS) quanto no computador (Emuladores).
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="border border-white/10 rounded-lg px-4 bg-card/30 hover:border-red-900/50 transition-colors">
            <AccordionTrigger className="text-left hover:no-underline hover:text-neon-red">
              Como vou receber o acesso?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              O acesso é enviado imediatamente para o seu e-mail cadastrado após a confirmação do pagamento.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="border border-white/10 rounded-lg px-4 bg-card/30 hover:border-red-900/50 transition-colors">
            <AccordionTrigger className="text-left hover:no-underline hover:text-neon-red">
              É seguro contra BAN?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Sim! Utilizamos um sistema de injeção externa que não altera os arquivos originais do jogo, garantindo 100% de segurança.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}

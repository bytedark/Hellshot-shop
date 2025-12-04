import { ShieldAlert } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center gap-8">
          
          <div className="max-w-2xl rounded-xl bg-red-950/20 border border-red-900/30 p-6">
            <div className="flex items-center justify-center gap-2 text-red-500 mb-3">
              <ShieldAlert className="h-6 w-6" />
              <h3 className="font-bold uppercase">Pirataria é Crime</h3>
            </div>
            <p className="text-xs text-red-200/70 leading-relaxed">
              A venda do Produto só pode ser realizada através deste site oficial. Qualquer outro site onde você encontre este produto é uma FALSIFICAÇÃO e vai contra as leis. Evite falsificações e recuse conteúdos ilegais ou pirateados.
            </p>
          </div>

          <div className="text-sm text-muted-foreground">
            <p className="mb-2">© 2025 HellShot FF - Todos os direitos reservados.</p>
            <p>Desenvolvido por Kaelzin.digital</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

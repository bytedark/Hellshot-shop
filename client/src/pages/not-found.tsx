import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground">
      <Card className="w-full max-w-md mx-4 border-red-900/50 bg-card/50 backdrop-blur-sm">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2 items-center justify-center">
            <AlertCircle className="h-8 w-8 text-neon-red" />
            <h1 className="text-2xl font-bold text-white font-display">404 Página Não Encontrada</h1>
          </div>

          <p className="mt-4 text-center text-muted-foreground">
            A página que você está procurando não existe ou foi movida.
          </p>
          
          <div className="mt-6 text-center">
            <a href="/" className="text-neon-red hover:underline font-bold">
              Voltar para o Início
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

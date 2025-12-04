import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const names = [
  "Pedro", "Lucas", "Matheus", "Gabriel", "Rafael", 
  "João", "Felipe", "Bruno", "Gustavo", "Daniel",
  "Thiago", "Leonardo", "Rodrigo", "Alexandre", "Eduardo",
  "Henrique", "Marcelo", "Ricardo", "Caio", "Vinicius"
];

export function PurchaseNotifications() {
  const [currentName, setCurrentName] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Start the loop
    const showNotification = () => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      setCurrentName(randomName);
      setIsVisible(true);

      // Hide after 4 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 4000);

      // Show next one after random interval (5-15 seconds)
      const nextInterval = Math.random() * 10000 + 5000;
      setTimeout(showNotification, nextInterval);
    };

    const initialTimeout = setTimeout(showNotification, 3000);

    return () => clearTimeout(initialTimeout);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && currentName && (
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          className="fixed bottom-4 left-4 z-50 flex items-center gap-3 rounded-lg border border-neon-red/30 bg-black/80 p-4 shadow-lg shadow-neon-red/10 backdrop-blur-md"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/20">
            <CheckCircle2 className="h-6 w-6 text-green-500" />
          </div>
          <div>
            <p className="text-sm font-bold text-white">Nova Compra</p>
            <p className="text-xs text-gray-300">
              <span className="font-bold text-neon-red">{currentName}</span> acabou de adquirir
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

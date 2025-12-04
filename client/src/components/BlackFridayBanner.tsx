import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Timer, AlertTriangle, Zap } from "lucide-react";

export function BlackFridayBanner() {
  const [timeLeft, setTimeLeft] = useState({ minutes: 14, seconds: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds === 0) {
          if (prev.minutes === 0) return prev;
          return { minutes: prev.minutes - 1, seconds: 59 };
        }
        return { ...prev, seconds: prev.seconds - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 100, 
        damping: 20,
        delay: 0.5 
      }}
      className="bg-gradient-to-r from-red-900 via-red-600 to-red-900 text-white overflow-hidden sticky top-0 z-50 shadow-[0_0_30px_rgba(220,20,60,0.6)] border-b border-white/10"
    >
      {/* Animated Background Effect */}
      <motion.div 
        animate={{ x: ["100%", "-100%"] }}
        transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
      />

      <div className="container relative mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 text-center sm:text-left font-bold uppercase tracking-wider text-xs sm:text-sm">
        
        <div className="flex items-center gap-2 text-yellow-300 animate-pulse">
          <AlertTriangle className="h-5 w-5" />
          <span className="text-shadow-sm">ÚLTIMAS VAGAS</span>
        </div>
        
        <div className="hidden sm:block h-5 w-px bg-white/20" />
        
        <div className="flex items-center gap-2">
          <p className="drop-shadow-md">
            OFERTA ENCERRA EM:
          </p>
          <div className="flex items-center gap-1 bg-black/30 px-3 py-1 rounded-md border border-white/10 font-mono text-neon-red">
            <Timer className="h-4 w-4 text-white" />
            <span className="text-white text-lg">
              {String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
            </span>
          </div>
        </div>

        <div className="hidden sm:block h-5 w-px bg-white/20" />

        <motion.div 
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="flex items-center gap-2 text-yellow-300"
        >
          <Zap className="h-4 w-4 fill-current" />
          <span>85% OFF AGORA</span>
        </motion.div>
      </div>
    </motion.div>
  );
}

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Settings, Maximize, Captions, MoreHorizontal } from "lucide-react";

export default function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [finished, setFinished] = useState(false);

  // Rolagem até o pricing
  const scrollToPricing = () => {
    const pricing = document.getElementById("pricing-section");
    if (pricing) {
      pricing.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Quando clicar no play
  const handlePlay = () => {
    videoRef.current?.play();
  };

  // Detectar final mesmo se o usuário PULAR a linha do tempo
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;

    const vid = videoRef.current;

    // Se estiver nos 1,5 segundos finais → vídeo considerado concluído
    if (vid.currentTime >= vid.duration - 1.5) {
      setFinished(true);
    }
  };

  return (
    <section id="video-section" className="py-20 bg-black/50">
      
      <h2 className="text-center text-3xl md:text-4xl font-extrabold text-red-500 mb-10 tracking-wide">
        ASSISTA O VÍDEO SECRETO
      </h2>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mx-auto max-w-5xl overflow-hidden rounded-xl shadow-2xl shadow-neon-red/20 bg-black relative group"
        >
          {/* VIDEO */}
          <div className="relative aspect-video w-full bg-black flex items-center justify-center">

            <video
              ref={videoRef}
              src="/video.mp4"
              className="w-full h-full object-cover"
              onTimeUpdate={handleTimeUpdate}
              onEnded={() => setFinished(true)} 
            />

            {/* Botão de Play */}
            <div
              onClick={handlePlay}
              className="absolute inset-0 flex items-center justify-center cursor-pointer z-20"
            >
              <div className="h-20 w-20 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm hover:scale-110 transition-transform duration-300 border border-white/10">
                <Play className="h-8 w-8 text-white fill-white ml-1" />
              </div>
            </div>

            {/* Controles Fakes */}
            <div className="absolute bottom-0 left-0 right-0 z-30 px-4 pb-2 pt-12 bg-gradient-to-t from-black/90 to-transparent">
              <div className="w-full h-1 bg-white/20 rounded-full mb-4">
                <div className="h-full w-[35%] bg-neon-red rounded-full" />
              </div>

              <div className="flex items-center justify-between h-12 rounded-full bg-neon-red/90 backdrop-blur-md px-4 sm:px-6">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full border-2 border-white/20 flex items-center justify-center bg-black/20">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 text-white fill-current">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                    </svg>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:gap-4 text-white">
                  <button><Captions className="h-5 w-5 sm:h-6 sm:w-6" /></button>
                  <button><Settings className="h-5 w-5 sm:h-6 sm:w-6" /></button>
                  <button><Maximize className="h-5 w-5 sm:h-6 sm:w-6" /></button>
                  <button><MoreHorizontal className="h-5 w-5 sm:h-6 sm:w-6" /></button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* BOTÃO QUE APARECE QUANDO O VÍDEO TERMINA */}
        {finished && (
          <div className="flex justify-center mt-10">
            <button
              onClick={scrollToPricing}
              className="px-10 py-4 bg-red-600 text-white font-bold text-xl rounded-full animate-pulse shadow-xl"
            >
              COMPRAR O CAPETINHA 🔥
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

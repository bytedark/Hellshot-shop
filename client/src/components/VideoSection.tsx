import { motion } from "framer-motion";
import { Play, Settings, Maximize, Captions, MoreHorizontal } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function VideoSection() {
  // Carregar vídeo automaticamente da pasta
  const videos = import.meta.glob("/src/assets/videos/*", { eager: true });
  const videoFile = Object.values(videos)[0] as any; // primeiro vídeo da pasta

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // Atualizar barra de progresso
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const p = (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setProgress(p);
  };

  // Play/pause
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Clicar na progress bar
  const handleSeek = (e: any) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = clickX / rect.width;
    videoRef.current.currentTime = percent * videoRef.current.duration;
  };

  return (
    <section id="video-section" className="py-20 bg-black/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mx-auto max-w-5xl overflow-hidden rounded-xl shadow-2xl shadow-neon-red/20 bg-black relative group"
        >
          {/* Video Container */}
          <div className="relative aspect-video w-full bg-black flex items-center justify-center">

            {/* VIDEO REAL */}
            <video
              ref={videoRef}
              src={videoFile.default}
              className="absolute inset-0 w-full h-full object-cover"
              onTimeUpdate={handleTimeUpdate}
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60 z-10 pointer-events-none" />

            {/* BIG PLAY BUTTON */}
            {!isPlaying && (
              <div
                onClick={togglePlay}
                className="relative z-20 h-20 w-20 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm cursor-pointer hover:scale-110 transition-transform duration-300 border border-white/10"
              >
                <Play className="h-8 w-8 text-white fill-white ml-1" />
              </div>
            )}

            {/* PLAYER CONTROLS */}
            <div className="absolute bottom-0 left-0 right-0 z-30 px-4 pb-2 pt-12 bg-gradient-to-t from-black/90 to-transparent">

              {/* PROGRESS BAR */}
              <div
                className="w-full h-1 bg-white/20 rounded-full mb-4 cursor-pointer group/progress"
                onClick={handleSeek}
              >
                <div
                  className="h-full bg-neon-red rounded-full relative"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 h-3 w-3 bg-white rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity" />
                </div>
              </div>

              {/* CONTROL BAR */}
              <div className="flex items-center justify-between h-12 rounded-full bg-neon-red/90 backdrop-blur-md px-4 sm:px-6">

                {/* Left Branding */}
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full border-2 border-white/20 flex items-center justify-center bg-black/20">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5 text-white fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                    </svg>
                  </div>
                </div>

                {/* (Empty center, igual ao seu código) */}
                <div className="flex items-center gap-6 text-white">
                  <button className="hover:text-white/80 transition-colors font-bold text-xs sm:text-sm uppercase tracking-wider"></button>
                </div>

                {/* Right Side Icons */}
                <div className="flex items-center gap-3 sm:gap-4 text-white">
                  <button className="hover:scale-110 transition-transform p-1">
                    <Captions className="h-5 w-5 sm:h-6 sm:w-6" />
                  </button>
                  <button className="hover:scale-110 transition-transform p-1">
                    <Settings className="h-5 w-5 sm:h-6 sm:w-6" />
                  </button>
                  <button
                    onClick={() => videoRef.current?.requestFullscreen()}
                    className="hover:scale-110 transition-transform p-1"
                  >
                    <Maximize className="h-5 w-5 sm:h-6 sm:w-6" />
                  </button>
                  <button className="hover:scale-110 transition-transform p-1">
                    <MoreHorizontal className="h-5 w-5 sm:h-6 sm:w-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

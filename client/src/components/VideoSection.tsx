import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, VolumeX, Volume2 } from "lucide-react";

export default function VideoSection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.4 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isVisible) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, [isVisible]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section className="py-32 px-6 relative overflow-hidden" ref={containerRef}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white drop-shadow-lg">
          Domine Seu Jogo
        </h2>
        <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
          Assista ao vídeo e descubra como melhorar sua performance hoje.
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
          className="relative mt-12 mx-auto max-w-4xl rounded-2xl overflow-hidden shadow-2xl"
        >
          <video
            ref={videoRef}
            src="/video.mp4"
            className="w-full h-full object-cover"
            muted={isMuted}
            playsInline
            loop
          />

          {/* Botões – mantêm o design antigo, mas com funcionalidades novas */}
          <div className="absolute bottom-4 left-4 flex items-center gap-3 bg-black/40 px-4 py-2 rounded-xl backdrop-blur-md border border-white/10">
            <button
              onClick={togglePlay}
              className="p-2 rounded-full hover:bg-white/20 transition"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 text-white" />
              ) : (
                <Play className="w-6 h-6 text-white" />
              )}
            </button>

            <button
              onClick={toggleMute}
              className="p-2 rounded-full hover:bg-white/20 transition"
            >
              {isMuted ? (
                <VolumeX className="w-6 h-6 text-white" />
              ) : (
                <Volume2 className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

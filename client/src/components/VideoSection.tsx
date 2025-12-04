import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, VolumeX, Volume2 } from "lucide-react";

export default function VideoSection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [videoSrc, setVideoSrc] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // 🔥 Carrega automaticamente o vídeo da pasta /src/assets/videos
  useEffect(() => {
    // @ts-ignore (Vite)
    const videos = import.meta.glob("/src/assets/videos/*");

    const paths = Object.keys(videos);

    if (paths.length > 0) {
      videos[paths[0]]().then((mod: any) => {
        setVideoSrc(mod.default);
      });
    }
  }, []);

  // 🔥 Detecta se está visível na tela
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

  // Controles
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) videoRef.current.pause();
    else videoRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section
      ref={containerRef}
      className="py-32 px-6 relative overflow-hidden"
      style={{ backgroundColor: "#FF0000" }} // 🔥 Fundo vermelho sólido
    >
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
        <p className="mt-4 text-lg text-white max-w-2xl mx-auto">
          Assista ao vídeo e descubra como melhorar sua performance hoje.
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
          className="relative mt-12 mx-auto max-w-4xl rounded-2xl overflow-hidden shadow-2xl"
          style={{ backgroundColor: "#FF0000" }} // 🔥 container vermelho sólido
        >
          {videoSrc && (
            <div className="relative">
              {/* 🔥 Overlay vermelho sólido sobre o vídeo */}
              <div
                className="absolute inset-0 mix-blend-multiply pointer-events-none"
                style={{ backgroundColor: "#FF0000" }}
              ></div>

              <video
                ref={videoRef}
                src={videoSrc}
                className="w-full h-full object-cover"
                muted={isMuted}
                playsInline
                loop
                autoPlay
              />
            </div>
          )}

          {/* 🔥 Botões com fundo vermelho sólido */}
          <div
            className="absolute bottom-4 left-4 flex items-center gap-3 px-4 py-2 rounded-xl border border-white/10"
            style={{
              backgroundColor: "#FF0000",
              boxShadow: "0px 0px 12px rgba(255, 0, 0, 0.8)",
            }}
          >
            <button
              onClick={togglePlay}
              className="p-2 rounded-full hover:opacity-80 transition"
              style={{ backgroundColor: "#FF0000" }}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 text-white" />
              ) : (
                <Play className="w-6 h-6 text-white" />
              )}
            </button>

            <button
              onClick={toggleMute}
              className="p-2 rounded-full hover:opacity-80 transition"
              style={{ backgroundColor: "#FF0000" }}
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

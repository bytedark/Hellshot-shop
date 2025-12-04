import { useRef, useState, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";

// Importa automaticamente qualquer vídeo da pasta
const videos = import.meta.glob("/src/assets/videos/*", { eager: true });

export default function VideoSection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Pega o primeiro vídeo encontrado automaticamente
  const videoSrc = Object.values(videos)[0] as { default: string };

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  // Play / pause
  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  // Volume
  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Fullscreen
  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  // Atualiza progresso
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setProgress(videoRef.current.currentTime);
  };

  // Atualiza duração
  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };

  // Ao clicar na barra de progresso
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const newTime = Number(e.target.value);
    videoRef.current.currentTime = newTime;
    setProgress(newTime);
  };

  return (
    <section className="w-full py-16 bg-black flex justify-center">
      <div className="max-w-4xl w-full rounded-2xl bg-black border border-red-600 shadow-[0_0_25px_#ff0000] overflow-hidden p-4 relative">

        {/* Vídeo */}
        <div className="relative w-full h-[350px] rounded-xl overflow-hidden">
          <video
            ref={videoRef}
            src={videoSrc?.default}
            className="w-full h-full object-cover"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
          />

          {/* Overlay escuro */}
          <div className="absolute inset-0 bg-black/40 pointer-events-none" />

          {/* Botão Play/Pause central */}
          <button
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center"
          >
            {!isPlaying ? (
              <Play size={70} className="text-red-500 drop-shadow-[0_0_15px_#ff0000]" />
            ) : (
              <Pause size={70} className="text-red-500 drop-shadow-[0_0_15px_#ff0000]" />
            )}
          </button>
        </div>

        {/* Controles */}
        <div className="mt-4 flex flex-col gap-3">

          {/* Barra de progresso */}
          <input
            type="range"
            min={0}
            max={duration}
            value={progress}
            onChange={handleSeek}
            className="w-full accent-red-600 cursor-pointer"
          />

          {/* Linha de botões */}
          <div className="flex justify-between items-center">

            {/* Play/Pause */}
            <button
              onClick={togglePlay}
              className="p-3 bg-red-600 rounded-lg shadow-[0_0_10px_#ff0000]"
            >
              {isPlaying ? <Pause size={22} /> : <Play size={22} />}
            </button>

            {/* Mute */}
            <button
              onClick={toggleMute}
              className="p-3 bg-red-600 rounded-lg shadow-[0_0_10px_#ff0000]"
            >
              {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
            </button>

            {/* Fullscreen */}
            <button
              onClick={toggleFullscreen}
              className="p-3 bg-red-600 rounded-lg shadow-[0_0_10px_#ff0000]"
            >
              <Maximize size={22} />
            </button>

          </div>
        </div>
      </div>
    </section>
  );
}

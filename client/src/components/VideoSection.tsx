import { motion } from "framer-motion";
import {
  Play,
  Pause,
  Settings,
  Maximize,
  Captions,
  MoreHorizontal,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function VideoSection() {
  // Carregar vídeo automaticamente da pasta
  const videos = import.meta.glob("/src/assets/videos/*", { eager: true });
  const videoFile = Object.values(videos)[0] as any;

  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [muted, setMuted] = useState(true);
  const [volume, setVolume] = useState(0.6);
  const [loop, setLoop] = useState(false);
  const [captionsOn, setCaptionsOn] = useState(false);

  // Atualizar progresso
  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v) return;

    const p = (v.currentTime / v.duration) * 100;
    setProgress(p);
  };

  // Play/Pause
  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;

    if (v.paused) {
      v.play();
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  // Seek ao clicar
  const handleSeek = (e: any) => {
    const v = videoRef.current;
    if (!v) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = clickX / rect.width;

    v.currentTime = percent * v.duration;
  };

  // Fullscreen
  const enterFullscreen = () => {
    if (videoRef.current?.parentElement) {
      videoRef.current.parentElement.requestFullscreen();
    }
  };

  // Mute
  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;

    v.muted = !v.muted;
    setMuted(v.muted);
  };

  // Volume
  const changeVolume = (val: number) => {
    const v = videoRef.current;
    if (!v) return;

    const newVol = Math.max(0, Math.min(1, val));

    v.volume = newVol;
    setVolume(newVol);

    if (newVol > 0 && muted) {
      v.muted = false;
      setMuted(false);
    }
  };

  // Loop
  const toggleLoop = () => {
    const v = videoRef.current;
    if (!v) return;

    v.loop = !v.loop;
    setLoop(v.loop);
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
          <div className="relative aspect-video w-full bg-black flex items-center justify-center">

            {/* VIDEO */}
            <video
              ref={videoRef}
              src={videoFile.default}
              className="absolute inset-0 w-full h-full object-cover"
              muted={muted}
              onTimeUpdate={handleTimeUpdate}
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60 z-10 pointer-events-none" />

            {/* PLAY BUTTON */}
            {!isPlaying && (
              <button
                onClick={togglePlay}
                className="relative z-20 h-20 w-20 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm cursor-pointer hover:scale-110 transition-transform duration-300 border border-white/10"
              >
                <Play className="h-8 w-8 text-white ml-1" />
              </button>
            )}

            {/* PLAYER CONTROLS */}
            <div className="absolute bottom-0 left-0 right-0 z-30 px-4 pb-2 pt-12 bg-gradient-to-t from-black/90 to-transparent">

              {/* BARRA DE PROGRESSO */}
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

              {/* BARRA DE CONTROLE */}
              <div className="flex items-center justify-between h-12 rounded-full bg-neon-red/90 backdrop-blur-md px-4 sm:px-6">

                {/* BRANDING + MUTE */}
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full border-2 border-white/20 flex items-center justify-center bg-black/20">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 text-white fill-current">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                    </svg>
                  </div>

                  {/* BOTÃO MUTE */}
                  <button onClick={toggleMute} className="hover:scale-110 transition-transform">
                    {muted || volume === 0 ? (
                      <VolumeX className="h-6 text-white" />
                    ) : (
                      <Volume2 className="h-6 text-white" />
                    )}
                  </button>
                </div>

                {/* CENTRO (DEIXA VAZIO IGUAL O SEU) */}
                <div className="flex items-center gap-6 text-white" />

                {/* LADO DIREITO */}
                <div className="flex items-center gap-4 text-white relative">

                  {/* CAPTIONS */}
                  <button
                    onClick={() => setCaptionsOn(!captionsOn)}
                    className={`p-1 rounded ${captionsOn ? "bg-white/10" : ""}`}
                  >
                    <Captions className="h-5 w-5" />
                  </button>

                  {/* SETTINGS */}
                  <div className="relative">
                    <button
                      onClick={() => setShowSettings(!showSettings)}
                      className="p-1 rounded"
                    >
                      <Settings className="h-5 w-5" />
                    </button>

                    {showSettings && (
                      <div className="absolute bottom-12 right-0 bg-black/80 backdrop-blur-md border border-white/10 rounded p-4 w-48 z-40">

                        <div className="text-white/90 mb-2">Volume: {Math.round(volume * 100)}%</div>
                        <input
                          type="range"
                          min={0}
                          max={1}
                          step={0.01}
                          value={volume}
                          onChange={(e) => changeVolume(Number(e.target.value))}
                          className="w-full mb-4"
                        />

                        <label className="flex items-center justify-between text-white/90">
                          Loop
                          <input type="checkbox" checked={loop} onChange={toggleLoop} />
                        </label>

                      </div>
                    )}
                  </div>

                  {/* FULLSCREEN */}
                  <button onClick={enterFullscreen} className="p-1 rounded">
                    <Maximize className="h-5 w-5" />
                  </button>

                  {/* MORE */}
                  <button className="p-1 rounded">
                    <MoreHorizontal className="h-5 w-5" />
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

import { motion } from "framer-motion";
import {
  Play,
  Settings,
  Maximize,
  Captions,
  MoreHorizontal,
  Pause,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function VideoSection() {
  const videos = import.meta.glob("/src/assets/videos/*", { eager: true });
  const videoFile = Object.values(videos)[0] as any;

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // percent
  const [duration, setDuration] = useState(0);
  const [finished, setFinished] = useState(false);
  const [muted, setMuted] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [loop, setLoop] = useState(false);
  const [captionsOn, setCaptionsOn] = useState(false);
  const [volume, setVolume] = useState(0.6);

  // Inicializa vídeo: duration, volume, muted
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // set defaults
    v.muted = muted;
    v.volume = volume;

    const onLoaded = () => {
      setDuration(v.duration || 0);
    };
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      setIsPlaying(false);
      setFinished(true);
      setProgress(100);
    };
    const onTime = () => {
      if (v.duration && v.currentTime >= v.duration - 0.15) {
        setFinished(true);
      }
      const p = v.duration ? (v.currentTime / v.duration) * 100 : 0;
      setProgress(p);
    };

    v.addEventListener("loadedmetadata", onLoaded);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    v.addEventListener("ended", onEnded);
    v.addEventListener("timeupdate", onTime);

    return () => {
      v.removeEventListener("loadedmetadata", onLoaded);
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("ended", onEnded);
      v.removeEventListener("timeupdate", onTime);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [muted, volume]);

  // Play / Pause toggle
  const togglePlay = async () => {
    const v = videoRef.current;
    if (!v) return;
    try {
      if (v.paused) {
        await v.play();
        setIsPlaying(true);
      } else {
        v.pause();
        setIsPlaying(false);
      }
    } catch (e) {
      // autoplay blocked; do nothing
      console.warn("Play failed:", e);
    }
  };

  // Seek by clicking progress bar
  const handleSeek = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const v = videoRef.current;
    if (!v || !progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = Math.max(0, Math.min(1, clickX / rect.width));
    v.currentTime = percent * (v.duration || 0);
    setProgress(percent * 100);
  };

  // Fullscreen
  const handleFullscreen = () => {
    const el = videoRef.current;
    if (!el) return;
    const container = el.parentElement;
    if (!container) return;
    if (container.requestFullscreen) container.requestFullscreen();
    // fallback vendor APIs are usually not needed in modern browsers
  };

  // Toggle mute
  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  // Volume change from settings
  const handleVolumeChange = (val: number) => {
    const v = videoRef.current;
    if (!v) return;
    const volumeNormalized = Math.max(0, Math.min(1, val));
    v.volume = volumeNormalized;
    setVolume(volumeNormalized);
    if (v.muted && volumeNormalized > 0) {
      v.muted = false;
      setMuted(false);
    }
  };

  // Toggle loop
  const toggleLoop = () => {
    const v = videoRef.current;
    if (!v) return;
    v.loop = !v.loop;
    setLoop(v.loop);
  };

  // Scroll to pricing
  const scrollToPricing = () => {
    const el = document.getElementById("pricing");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="video-section" className="py-20 bg-black/50">
      <h2 className="text-center text-4xl font-extrabold text-white mb-10">
        ASSISTA O VÍDEO SECRETO
      </h2>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mx-auto max-w-5xl overflow-hidden rounded-xl shadow-2xl shadow-neon-red/20 bg-black relative group"
        >
          {/* Video container */}
          <div className="relative aspect-video w-full bg-black flex items-center justify-center">
            {/* Actual video */}
            <video
              ref={videoRef}
              src={videoFile?.default}
              className="absolute inset-0 w-full h-full object-cover"
              playsInline
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60 z-10 pointer-events-none" />

            {/* Big central play/pause */}
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause" : "Play"}
              className="relative z-20 h-20 w-20 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm cursor-pointer hover:scale-110 transition-transform duration-300 border border-white/10"
            >
              {isPlaying ? (
                <Pause className="h-8 w-8 text-white" />
              ) : (
                <Play className="h-8 w-8 text-white fill-white ml-1" />
              )}
            </button>

            {/* Controls area */}
            <div className="absolute bottom-0 left-0 right-0 z-30 px-4 pb-2 pt-12 bg-gradient-to-t from-black/90 to-transparent">
              {/* Progress bar */}
              <div
                ref={progressRef}
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

              {/* Control bar */}
              <div className="flex items-center justify-between h-12 rounded-full bg-neon-red/90 backdrop-blur-md px-4 sm:px-6">
                {/* Left branding + mute */}
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full border-2 border-white/20 flex items-center justify-center bg-black/20">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5 text-white fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                    </svg>
                  </div>

                  {/* Mute toggle */}
                  <button
                    onClick={toggleMute}
                    className="p-1 rounded hover:opacity-90 transition"
                    aria-label="Toggle mute"
                  >
                    {muted || volume === 0 ? (
                      <VolumeX className="h-5 w-5 text-white" />
                    ) : (
                      <Volume2 className="h-5 w-5 text-white" />
                    )}
                  </button>
                </div>

                {/* center placeholder (keeps design) */}
                <div className="flex items-center gap-6 text-white">
                  {/* empty by design */}
                </div>

                {/* Right icons */}
                <div className="flex items-center gap-3 sm:gap-4 text-white relative">
                  {/* Captions toggle (visual) */}
                  <button
                    onClick={() => setCaptionsOn((s) => !s)}
                    className={`p-1 rounded ${captionsOn ? "bg-white/10" : ""}`}
                    title="Captions"
                  >
                    <Captions className="h-5 w-5 sm:h-6 sm:w-6" />
                  </button>

                  {/* Settings - opens small panel */}
                  <div className="relative">
                    <button
                      onClick={() => setShowSettings((s) => !s)}
                      className="p-1 rounded"
                      title="Settings"
                    >
                      <Settings className="h-5 w-5 sm:h-6 sm:w-6" />
                    </button>

                    {showSettings && (
                      <div className="absolute right-0 bottom-12 w-56 bg-black/80 backdrop-blur-md border border-white/10 rounded p-3 text-sm z-40">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white/90">Volume</span>
                          <span className="text-white/60">{Math.round(volume * 100)}%</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={1}
                          step={0.01}
                          value={volume}
                          onChange={(e) => handleVolumeChange(Number(e.target.value))}
                          className="w-full"
                        />
                        <div className="flex items-center justify-between mt-3">
                          <label className="text-white/90">Loop</label>
                          <input
                            type="checkbox"
                            checked={loop}
                            onChange={toggleLoop}
                            className="accent-red-500"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Fullscreen */}
                  <button
                    onClick={handleFullscreen}
                    className="p-1 rounded"
                    title="Fullscreen"
                  >
                    <Maximize className="h-5 w-5 sm:h-6 sm:w-6" />
                  </button>

                  <button className="p-1 rounded" title="More">
                    <MoreHorizontal className="h-5 w-5 sm:h-6 sm:w-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Finished CTA */}
        {finished && (
          <div className="flex justify-center mt-10">
            <button
              onClick={scrollToPricing}
              className="px-12 py-4 bg-red-600 text-white font-bold text-xl rounded-full animate-pulse shadow-lg"
            >
              COMPRAR O CAPETINHA 🔥
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

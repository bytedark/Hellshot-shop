import { useEffect, useRef, useState } from "react";

export default function VideoSection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoSrc, setVideoSrc] = useState<string>("");
  const [showPlayButton, setShowPlayButton] = useState(true);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    // @ts-ignore – import.meta.glob existe no Vite
    const videos = import.meta.glob("/src/assets/videos/*");

    const paths = Object.keys(videos);

    if (paths.length > 0) {
      videos[paths[0]]().then((mod: any) => {
        setVideoSrc(mod.default);
      });
    }
  }, []);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setShowPlayButton(false);
      setShowWarning(false);
    }
  };

  const handlePause = () => {
    setShowWarning(true);
  };

  return (
    <section className="video-section">
      <div className="video-container" style={{ position: "relative" }}>
        <video
          ref={videoRef}
          src={videoSrc}
          controls={false}
          preload="auto"
          onPause={handlePause}
          onPlay={() => setShowWarning(false)}
        ></video>

        {showPlayButton && (
          <button onClick={handlePlay} className="play-button">
            ▶
          </button>
        )}

        {showWarning && (
          <div className="warning-message">
            VAI QUERER CONTINUAR PERDENDO NO X1? <br />
            Aproveita essa oferta, só hoje!
          </div>
        )}
      </div>
    </section>
  );
}

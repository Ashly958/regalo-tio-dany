import React, { useState, useRef, useEffect } from 'react';
import { Music, Play, Pause, Volume2, VolumeX } from 'lucide-react';

export default function MusicPlayer({ song }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 1.0;
    }
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((err) => {
            console.warn("Aviso al reproducir audio:", err);
          });
      }
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={song.audioUrl}
        preload="auto"
        loop
        playsInline
        onEnded={() => setIsPlaying(false)}
        onError={(e) => console.warn("Error cargando fuente de audio:", e)}
      />

      {/* Único reproductor flotante superior, elegante y no intrusivo */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={togglePlay}
          type="button"
          aria-label={isPlaying ? 'Pausar música' : 'Reproducir música'}
          className={`glass-panel px-3.5 py-2 rounded-full shadow-2xl flex items-center gap-2.5 border transition-all active:scale-95 cursor-pointer text-left ${
            isPlaying
              ? 'border-amber-500/60 ring-2 ring-amber-400/30'
              : 'border-amber-500/40 hover:border-amber-400 animate-pulse'
          }`}
        >
          {/* Rotating Vinyl Icon */}
          <div className="relative">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-500 text-slate-950 shadow-lg shadow-amber-500/30 ${
                isPlaying ? 'animate-spin-slow ring-2 ring-amber-300' : ''
              }`}
            >
              {isPlaying ? (
                <Pause size={16} className="fill-current" />
              ) : (
                <Play size={16} className="fill-current ml-0.5" />
              )}
            </div>
            {isPlaying && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
              </span>
            )}
          </div>

          {/* Song Info */}
          <div className="pr-1 max-w-[130px] sm:max-w-none">
            <p className="text-xs font-semibold text-amber-200 truncate flex items-center gap-1">
              <Music size={11} className="text-amber-400 shrink-0" />
              {song.title}
            </p>
            <p className="text-[10px] text-slate-400 truncate">
              {isPlaying ? 'Sonando ahora' : 'Toca para escuchar'}
            </p>
          </div>

          {/* Mute button */}
          <span
            onClick={toggleMute}
            role="button"
            tabIndex={0}
            className="text-slate-400 hover:text-amber-300 transition-colors p-1"
            title={isMuted ? "Activar sonido" : "Silenciar"}
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </span>
        </button>
      </div>
    </>
  );
}

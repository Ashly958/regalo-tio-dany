import React, { useState, useRef, useEffect } from 'react';
import { Music, Play, Pause, Volume2, VolumeX, Sparkles } from 'lucide-react';

export default function MusicPlayer({ song }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasStartedOnce, setHasStartedOnce] = useState(false);
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
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setHasStartedOnce(true);
        })
        .catch((err) => {
          console.warn("Error reproduciendo audio:", err);
        });
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
      />

      {/* Floating Mini Vinyl Widget at Top Right */}
      <div className="fixed top-4 right-4 z-50">
        <div
          onClick={togglePlay}
          className="glass-panel px-3.5 py-2 rounded-full shadow-2xl flex items-center gap-2.5 border border-amber-500/40 cursor-pointer active:scale-95 transition-all"
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
          <div className="text-left pr-1 max-w-[125px] sm:max-w-none">
            <p className="text-xs font-semibold text-amber-200 truncate flex items-center gap-1">
              <Music size={11} className="text-amber-400 shrink-0" />
              {song.title}
            </p>
            <p className="text-[10px] text-slate-400 truncate">
              {isPlaying ? 'Sonando ahora...' : 'Toca para escuchar'}
            </p>
          </div>

          {/* Mute button */}
          <button
            onClick={toggleMute}
            className="text-slate-400 hover:text-amber-300 transition-colors p-1"
            title={isMuted ? "Activar sonido" : "Silenciar"}
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>
        </div>
      </div>

      {/* Prominent Music Activation Banner at Bottom (Disappears once user starts it) */}
      {!isPlaying && (
        <div className="fixed bottom-5 inset-x-4 z-50 max-w-sm mx-auto animate-bounce">
          <button
            onClick={togglePlay}
            className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 text-slate-950 font-bold text-sm shadow-2xl shadow-amber-500/50 flex items-center justify-center gap-3 border-2 border-white/40 active:scale-95 transition-transform"
          >
            <div className="w-8 h-8 rounded-full bg-slate-950 text-amber-400 flex items-center justify-center shrink-0">
              <Play size={16} className="fill-current ml-0.5" />
            </div>
            <div className="text-left leading-tight">
              <p className="text-xs font-black uppercase tracking-wider">
                ▶ Tocar para poner tu canción
              </p>
              <p className="text-[11px] font-medium text-slate-900 truncate">
                {song.artist} - {song.title}
              </p>
            </div>
            <Sparkles size={18} className="text-slate-950 shrink-0" />
          </button>
        </div>
      )}
    </>
  );
}

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Send } from 'lucide-react';

export default function HugCounter({ uncleName }) {
  const [hugs, setHugs] = useState(() => {
    const saved = localStorage.getItem('dany_hugs_count');
    return saved ? parseInt(saved, 10) : 124; // Initial base count of hugs sent by family
  });

  const [toastMessage, setToastMessage] = useState('');
  const [animating, setAnimating] = useState(false);

  const toasts = [
    `¡Abrazo de oso enviado a ${uncleName}! ❤️`,
    `¡Oración de sanación y fuerza enviada! 🙏`,
    `¡Toda la energía de tu familia está contigo! ✨`,
    `¡Fuerza, campeón, Dios está en control! 🛡️`,
    `¡Amor infinito directo a tu corazón! 🌟`
  ];

  const handleSendHug = (e) => {
    const newCount = hugs + 1;
    setHugs(newCount);
    localStorage.setItem('dany_hugs_count', newCount.toString());

    // Trigger haptic vibration on phones if supported
    if (navigator.vibrate) {
      navigator.vibrate([40, 60, 40]);
    }

    // Trigger colorful confetti (hearts and stars)
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 35,
      spread: 60,
      origin: { x, y },
      colors: ['#f59e0b', '#f43f5e', '#fbbf24', '#ffffff', '#e11d48'],
      shapes: ['circle'],
      scalar: 1.2,
      disableForReducedMotion: true
    });

    // Set animation state
    setAnimating(true);
    setTimeout(() => setAnimating(false), 300);

    // Random encouraging toast message
    const randomToast = toasts[Math.floor(Math.random() * toasts.length)];
    setToastMessage(randomToast);
    setTimeout(() => {
      setToastMessage('');
    }, 2800);
  };

  return (
    <section className="py-8 px-4 max-w-lg mx-auto text-center">
      <div className="glass-panel p-6 rounded-3xl border border-amber-500/30 relative overflow-hidden shadow-2xl">
        {/* Glow behind counter */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-rose-500/5 to-transparent pointer-events-none" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-1 text-amber-300 text-xs font-semibold mb-2">
            <Sparkles size={14} />
            <span>ENERGÍA Y ORACIONES EN TIEMPO REAL</span>
          </div>

          <h3 className="text-xl font-bold font-serif text-white mb-1">
            Abrazos y Bendiciones para {uncleName}
          </h3>

          <p className="text-xs text-slate-300 max-w-xs mx-auto mb-5 font-light">
            Cada vez que tocas este botón, le envías un pensamiento de sanación y fuerza antes de entrar al quirófano.
          </p>

          {/* Big Interactive Heart Button */}
          <div className="flex justify-center mb-4">
            <button
              onClick={handleSendHug}
              className={`relative group w-24 h-24 rounded-full flex flex-col items-center justify-center bg-gradient-to-tr from-rose-600 via-rose-500 to-amber-500 text-white shadow-xl shadow-rose-600/30 active:scale-90 transition-transform ${
                animating ? 'scale-110' : ''
              }`}
            >
              <Heart
                size={38}
                className={`fill-white drop-shadow-md transition-transform ${
                  animating ? 'scale-125' : 'group-hover:scale-110'
                }`}
              />
              <span className="text-[10px] font-bold tracking-tight mt-1 uppercase">
                Tocar
              </span>
            </button>
          </div>

          {/* Counter Display */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-700">
            <span className="text-xs text-slate-400">Total acumulado:</span>
            <span className="text-sm font-bold text-amber-400 font-mono">
              {hugs.toLocaleString()}
            </span>
            <span className="text-xs text-rose-400">abrazos</span>
          </div>

          {/* Feedback Toast */}
          <div className="h-6 mt-3 flex items-center justify-center">
            {toastMessage && (
              <p className="text-xs font-medium text-amber-300 animate-bounce">
                {toastMessage}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

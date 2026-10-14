import React from 'react';
import { Heart, Sparkles, Shield, Gift, Calendar } from 'lucide-react';

export default function HeroSection({ uncleData, onScrollToLetter }) {
  return (
    <section className="relative pt-12 pb-8 px-4 text-center overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute top-36 left-1/4 w-48 h-48 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Birthday & Strength Top Tag */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-medium mb-6 shadow-inner animate-float-slow">
        <Sparkles size={14} className="text-amber-400" />
        <span>¡Hoy celebramos tu vida, tu fuerza y tu valentía!</span>
        <Gift size={14} className="text-amber-400" />
      </div>

      {/* Main Title */}
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-2 font-serif text-white">
        ¡Feliz Cumpleaños, <br />
        <span className="gold-gradient-text tracking-wide">{uncleData.name}!</span>
      </h1>

      <p className="text-slate-300 text-sm sm:text-base max-w-md mx-auto mb-6 leading-relaxed font-light">
        {uncleData.subtitle}
      </p>

      {/* Hero Photo with Golden Border & Pulse */}
      <div className="relative mx-auto w-56 h-56 sm:w-64 sm:h-64 my-6">
        {/* Glow rings */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-amber-500 to-rose-500 blur-lg opacity-40 animate-pulse-glow" />
        
        {/* Card frame */}
        <div className="relative w-full h-full rounded-3xl overflow-hidden p-1.5 bg-gradient-to-tr from-amber-400 via-amber-200 to-rose-400 shadow-2xl">
          <img
            src={uncleData.heroPhoto.url}
            alt={uncleData.name}
            className="w-full h-full object-cover rounded-[22px] shadow-inner"
          />
          {/* Subtle gradient overlay at bottom of photo */}
          <div className="absolute inset-x-1.5 bottom-1.5 h-16 bg-gradient-to-t from-slate-950/80 to-transparent rounded-b-[22px] flex items-end justify-center pb-2">
            <span className="text-[11px] text-amber-200 font-medium px-2 py-0.5 rounded-full bg-slate-900/60 backdrop-blur-sm border border-amber-400/20">
              Nuestro gran campeón ❤️
            </span>
          </div>
        </div>

        {/* Small floating reaction icon */}
        <div className="absolute -bottom-3 -right-2 bg-rose-600 text-white p-2.5 rounded-full shadow-lg border-2 border-slate-950 animate-bounce">
          <Heart size={20} className="fill-current" />
        </div>
      </div>

      <p className="text-xs text-amber-200/90 italic max-w-xs mx-auto mb-6">
        "{uncleData.heroPhoto.caption}"
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <button
          onClick={onScrollToLetter}
          className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-semibold text-sm shadow-xl shadow-amber-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <Heart size={16} className="fill-slate-950" />
          <span>Leer carta de la familia</span>
        </button>
      </div>

      {/* Quote Banner from Yeison Jimenez */}
      <div className="mt-8 p-4 rounded-2xl glass-card max-w-md mx-auto text-left border-l-4 border-l-amber-400">
        <p className="text-xs text-slate-300 italic leading-relaxed">
          {uncleData.song.quote}
        </p>
        <span className="block text-[11px] font-semibold text-amber-400 mt-2 text-right">
          — Inspirado en "{uncleData.song.title}"
        </span>
      </div>
    </section>
  );
}

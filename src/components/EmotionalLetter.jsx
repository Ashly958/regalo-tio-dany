import React, { useState } from 'react';
import { Mail, MailOpen, Heart, Sparkles, Feather } from 'lucide-react';

export default function EmotionalLetter({ letter, innerRef }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <section ref={innerRef} className="py-6 px-4 max-w-lg mx-auto">
      <div className="relative">
        {/* Envelope / Header card */}
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2 text-amber-300 font-semibold text-sm">
            <Feather size={16} />
            <span>Carta para el corazón</span>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-xs text-slate-400 hover:text-amber-300 flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-800/60 border border-slate-700 transition-colors"
          >
            {isOpen ? (
              <>
                <MailOpen size={13} />
                <span>Plegar carta</span>
              </>
            ) : (
              <>
                <Mail size={13} />
                <span>Abrir carta</span>
              </>
            )}
          </button>
        </div>

        {/* Letter body */}
        <div
          className={`transition-all duration-500 overflow-hidden ${
            isOpen ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-amber-50/10 via-slate-900/90 to-slate-950/90 border border-amber-500/30 shadow-2xl backdrop-blur-md">
            {/* Watermark decorative icon */}
            <div className="absolute top-6 right-6 text-amber-500/10 pointer-events-none">
              <Heart size={120} className="fill-current" />
            </div>

            {/* Letter Title */}
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-amber-200 mb-4 pb-3 border-b border-amber-500/20">
              {letter.title}
            </h2>

            {/* Letter content */}
            <div className="space-y-4 text-slate-200 text-sm sm:text-base leading-relaxed font-light">
              {letter.paragraphs.map((p, idx) => (
                <p key={idx} className="relative z-10">
                  {p}
                </p>
              ))}
            </div>

            {/* Signature */}
            <div className="mt-8 pt-4 border-t border-amber-500/20 flex flex-col items-end">
              <span className="font-script text-2xl text-amber-300 transform -rotate-2">
                Con amor infinito,
              </span>
              <span className="text-xs text-slate-400 font-medium mt-1">
                Toda tu familia unida por ti
              </span>
            </div>
          </div>
        </div>

        {!isOpen && (
          <div
            onClick={() => setIsOpen(true)}
            className="cursor-pointer p-6 rounded-2xl border border-dashed border-amber-500/40 bg-amber-500/5 text-center active:scale-98 transition-all"
          >
            <Mail size={32} className="text-amber-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-amber-200">
              Toca para abrir la carta de la familia
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Unas palabras de aliento para ti
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

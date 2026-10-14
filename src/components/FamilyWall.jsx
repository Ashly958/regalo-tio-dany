import React from 'react';
import { Users, Heart, MessageCircleHeart } from 'lucide-react';

export default function FamilyWall({ messages }) {
  return (
    <section className="py-8 px-4 max-w-lg mx-auto">
      {/* Section Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-medium mb-2">
          <MessageCircleHeart size={13} className="text-rose-400" />
          <span>Tu Red de Apoyo Incondicional</span>
        </div>
        <h2 className="text-2xl font-bold font-serif text-white">
          Mensajes de Tu Familia
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Las personas que te amamos y oramos por ti cada segundo
        </p>
      </div>

      {/* Messages list */}
      <div className="space-y-3.5">
        {messages.map((item) => (
          <div
            key={item.id}
            className={`p-4 rounded-2xl glass-card bg-gradient-to-r ${item.color} border border-white/10 shadow-lg relative overflow-hidden`}
          >
            <div className="flex items-start gap-3">
              {/* Avatar / Icon */}
              <div className="w-10 h-10 rounded-xl bg-slate-900/80 border border-white/10 flex items-center justify-center text-xl shrink-0 shadow-inner">
                {item.avatar}
              </div>

              {/* Message content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="text-sm font-semibold text-white truncate">
                    {item.from}
                  </h3>
                  <span className="text-[10px] text-amber-300 font-medium px-2 py-0.5 rounded-full bg-slate-900/60 border border-amber-400/20 shrink-0">
                    {item.relation}
                  </span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-light">
                  "{item.message}"
                </p>
              </div>
            </div>

            {/* Subtle heart watermark in card corner */}
            <div className="absolute -bottom-2 -right-2 text-white/5 pointer-events-none">
              <Heart size={48} className="fill-current" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

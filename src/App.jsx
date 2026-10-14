import React, { useRef } from 'react';
import { uncleData } from './data/tiodanyData';
import MusicPlayer from './components/MusicPlayer';
import HeroSection from './components/HeroSection';
import EmotionalLetter from './components/EmotionalLetter';
import PhotoGallery from './components/PhotoGallery';
import FamilyWall from './components/FamilyWall';
import HugCounter from './components/HugCounter';
import { Heart, Sparkles, Radio, ShieldCheck } from 'lucide-react';

export default function App() {
  const letterRef = useRef(null);

  const scrollToLetter = () => {
    letterRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex justify-center selection:bg-amber-500 selection:text-slate-950">
      {/* Mobile-contained wrapper: full width on phones, centered elegant phone mockup on wide screens */}
      <main className="w-full max-w-md min-h-screen bg-gradient-to-b from-slate-950 via-[#0d1322] to-slate-950 shadow-2xl relative border-x border-slate-900 flex flex-col pb-12">
        {/* Floating Music Player */}
        <MusicPlayer song={uncleData.song} />

        {/* Hero & Birthday Header */}
        <HeroSection
          uncleData={uncleData}
          onScrollToLetter={scrollToLetter}
        />

        {/* Virtual Hug & Energy Button */}
        <HugCounter uncleName={uncleData.name} />

        {/* Heartfelt Letter */}
        <EmotionalLetter
          letter={uncleData.letter}
          innerRef={letterRef}
        />

        {/* Memories Gallery */}
        <PhotoGallery photos={uncleData.photos} />

        {/* Network of Love & Family Wall */}
        <FamilyWall messages={uncleData.familyMessages} />

        {/* Footer & NFC Tag Reminder */}
        <footer className="mt-8 px-6 text-center text-slate-500 text-xs space-y-3">
          <div className="flex items-center justify-center gap-1.5 text-amber-400/80 font-medium">
            <Radio size={14} className="animate-pulse" />
            <span>Llavero NFC Conectado con Amor</span>
          </div>

          <p className="leading-relaxed">
            Guarda este llavero contigo siempre, Dany. En cada momento difícil, acércalo a tu teléfono para recordar que tienes un ejército orando y amándote con toda el alma.
          </p>

          <div className="pt-2 flex items-center justify-center gap-1 text-[11px] text-slate-400">
            <span>Hecho con amor por tu familia</span>
            <Heart size={12} className="fill-rose-500 text-rose-500" />
            <span>2026</span>
          </div>
        </footer>
      </main>
    </div>
  );
}

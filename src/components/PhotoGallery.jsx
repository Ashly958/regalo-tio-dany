import React, { useState } from 'react';
import { Camera, X, ZoomIn, Heart } from 'lucide-react';

export default function PhotoGallery({ photos }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <section className="py-8 px-4 max-w-lg mx-auto">
      {/* Section Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 text-xs font-medium mb-2">
          <Camera size={13} className="text-amber-400" />
          <span>Nuestros Mejores Recuerdos</span>
        </div>
        <h2 className="text-2xl font-bold font-serif text-white">
          Momentos Inolvidables
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Toca cualquier foto para verla en grande
        </p>
      </div>

      {/* Grid of Photos */}
      <div className="grid grid-cols-2 gap-3">
        {photos.map((item, index) => (
          <div
            key={item.id || index}
            onClick={() => setSelectedPhoto(item)}
            className="group relative cursor-pointer aspect-square rounded-2xl overflow-hidden glass-card shadow-lg active:scale-95 transition-all"
          >
            <img
              src={item.url}
              alt={item.caption || `Recuerdo ${index + 1}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            {/* Dark gradient and caption preview */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity flex items-end p-2.5">
              <p className="text-[11px] text-slate-200 line-clamp-2 leading-tight">
                {item.caption}
              </p>
            </div>
            {/* Zoom icon badge */}
            <div className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-900/60 backdrop-blur-md text-amber-300 opacity-90">
              <ZoomIn size={12} />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-md w-full bg-slate-900 rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-slate-950/70 text-slate-200 hover:text-white border border-white/10 active:scale-90 transition-transform"
            >
              <X size={18} />
            </button>

            {/* Photo */}
            <div className="w-full max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.caption}
                className="w-full h-auto max-h-[70vh] object-contain"
              />
            </div>

            {/* Caption */}
            <div className="p-4 bg-slate-900 border-t border-slate-800">
              <p className="text-sm text-slate-200 leading-relaxed">
                {selectedPhoto.caption}
              </p>
              <div className="mt-2 flex items-center gap-1.5 text-xs text-amber-400 font-medium">
                <Heart size={13} className="fill-current text-rose-500" />
                <span>Guardado con amor en el corazón</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

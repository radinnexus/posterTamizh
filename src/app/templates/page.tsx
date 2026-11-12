'use client';

import Link from 'next/link';
import { PARTIES } from '@/data/parties';
import { useState, useMemo } from 'react';

const PARTY = PARTIES[0];

const TemplatesPage = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    PARTY.templates.forEach((t) => {
      if (t.tags) {
        t.tags.forEach((tag) => tags.add(tag));
      }
    });
    return Array.from(tags).sort();
  }, []);

  const filteredTemplates = useMemo(() => {
    if (!selectedTag) return PARTY.templates;
    return PARTY.templates.filter((t) => t.tags?.includes(selectedTag));
  }, [selectedTag]);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] font-sans antialiased">
      {/* Header */}
      <header className="bg-gradient-to-b from-green-900 to-green-700 text-white py-5 px-5 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 flex">
          <div className="flex-1 bg-red-600" />
          <div className="flex-1 bg-white" />
          <div className="flex-1 bg-black" />
        </div>
        <div className="max-w-[500px] mx-auto">
          <Link
            href="/"
            className="text-green-200 text-sm font-bold no-underline flex items-center gap-1 mb-2 hover:text-white transition-colors"
          >
            ← முகப்பு பக்கம்
          </Link>
          <h1 className="text-xl font-black tracking-tight">
            🎨 அனைத்து Designs
          </h1>
          <p className="text-green-200 text-xs font-semibold mt-1">
            {filteredTemplates.length} designs கிடைக்கிறது • தேர்வு செய்து போஸ்டர் உருவாக்குங்கள்
          </p>
        </div>
      </header>

      {/* Filter UI */}
      {allTags.length > 0 && (
        <div className="max-w-[500px] mx-auto px-4 py-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => setSelectedTag(null)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-bold transition-colors border ${
                selectedTag === null
                  ? 'bg-green-600 text-white border-green-600 shadow-sm'
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-bold transition-colors border ${
                  selectedTag === tag
                    ? 'bg-green-600 text-white border-green-600 shadow-sm'
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Template Grid */}
      <main className={`max-w-[500px] mx-auto px-4 ${allTags.length > 0 ? 'pb-6' : 'py-6'}`}>
        <div className="grid grid-cols-2 gap-4">
          {filteredTemplates.map((t) => (
            <Link
              key={t.id}
              href={`/?t=${t.id}`}
              className="group rounded-2xl overflow-hidden border-2 border-gray-200 aspect-[3/4] relative bg-gray-100 active:scale-95 transition-all duration-200 shadow-sm hover:shadow-lg hover:border-green-400 no-underline block"
            >
              {t.layout?.bgImageSrc && (
                <img
                  src={t.layout.bgImageSrc}
                  alt={t.TamizhName}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              )}

              {/* Overlay label */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 pt-8">
                <div className="text-white text-sm font-black leading-tight">
                  {t.TamizhName}
                </div>
                <div className="text-green-300 text-[10px] font-bold mt-0.5">
                  {t.layout?.hasCoords ? '📐 Photo + Text' : '🖼️ Banner Mode'}
                </div>
                {/* Optional: Show tags on template cards */}
                {t.tags && t.tags.length > 0 && (
                  <div className="flex gap-1 mt-1 flex-wrap">
                    {t.tags.map(tag => (
                      <span key={tag} className="text-[8px] bg-black/40 text-gray-200 px-1 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Tap indicator */}
              <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-green-500/90 text-white flex items-center justify-center text-xs font-black shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                →
              </div>
            </Link>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12 text-gray-500 font-medium">
            இந்த வகையில் designs இல்லை.
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 py-4 px-8 rounded-2xl bg-gradient-to-r from-green-600 to-green-500 text-white font-black text-lg shadow-xl shadow-green-200 hover:-translate-y-1 active:scale-95 transition-all duration-300 no-underline"
          >
            🌱 போஸ்டர் உருவாக்க
          </Link>
        </div>

        {/* FREE Pilot CTA */}
        <div className="mt-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-3xl p-5 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-white to-green-600" />
          <span className="inline-block bg-red-500 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full mb-2 animate-pulse">
            ⏰ முதல் 5 தொகுதிகளுக்கு மட்டுமே!
          </span>
          <div className="text-3xl mb-1">🎁</div>
          <h3 className="text-base font-black text-green-900 mb-1">
            FREE Pilot — 6 போஸ்டர்கள் இலவசம்!
          </h3>
          <p className="text-xs font-semibold text-green-700 mb-3 leading-relaxed">
            தொகுதி பெயர் + வேட்பாளர் படம் சேர்த்து 6 HD போஸ்டர்கள் FREE!
          </p>
          <Link
            href="/request"
            className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-500 text-white font-black text-sm shadow-lg shadow-green-200 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 no-underline w-full"
          >
            🎁 இலவச Pilot-ல் இடம் பிடி!
          </Link>
        </div>

        {/* Social Proof */}
        <div className="mt-4 flex items-center justify-center gap-2 text-xs font-bold text-red-600">
          <span>🔥</span> இடங்கள் குறைவு — இப்போதே பதிவு செய்யுங்கள்!
        </div>
      </main>
    </div>
  );
};

export default TemplatesPage;

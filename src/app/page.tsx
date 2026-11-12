'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { useState, useRef, useEffect, Suspense } from 'react';
import { PARTIES, Template } from '@/data/parties';
import PosterCanvas from '@/components/canvas/PosterCanvas';
import { UserDetails } from '@/types';
import confetti from 'canvas-confetti';
import { getRandomTaglineSet } from '@/components/canvas/constants/taglines';
import { track } from "@vercel/analytics"

// Hardcoded: This app is for AIADMK only
const PARTY = PARTIES[0];

const getInitialTemplate = (searchParams: URLSearchParams): Template => {
  const tId = searchParams.get('t');
  if (tId) {
    const found = PARTY.templates.find((t) => t.id === tId);
    if (found) return found;
  }
  return PARTY.templates[0];
};

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--bg)] flex items-center justify-center"><div className="w-10 h-10 border-4 border-t-green-600 border-green-100 rounded-full animate-spin" /></div>}>
      <HomeContent />
    </Suspense>
  );
}

function HomeContent() {
  const searchParams = useSearchParams();
  const [selectedTemplate, setSelectedTemplate] = useState<Template>(() => getInitialTemplate(searchParams));
  const [userDetails, setUserDetails] = useState<UserDetails>({
    name: '',
    desig: '',
    area: '',
    photoDataUrl: null,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const stageRef = useRef<any>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [posterReady, setPosterReady] = useState(false);
  const [isCustomDesig, setIsCustomDesig] = useState(false);
  const { tagline, footer } = getRandomTaglineSet();

  const updateField = (field: keyof UserDetails, val: string) => {
    setUserDetails((prev) => ({ ...prev, [field]: val }));
  };

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = (ev) => {
      const img = new window.Image();
      img.onload = () => {
        const MAX_SIZE = 800;
        let width = img.width;
        let height = img.height;
        if (width > MAX_SIZE || height > MAX_SIZE) {
          if (width > height) { height *= MAX_SIZE / width; width = MAX_SIZE; }
          else { width *= MAX_SIZE / height; height = MAX_SIZE; }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          setUserDetails((prev) => ({ ...prev, photoDataUrl: canvas.toDataURL('image/png') }));
        } else {
          setUserDetails((prev) => ({ ...prev, photoDataUrl: ev.target?.result as string }));
        }
      };
      img.src = ev.target?.result as string;
    };
    r.readAsDataURL(f);
  };

  const handleCreatePoster = () => {
    if (!userDetails.name.trim()) {
      // Shake the name input instead of an alert
      const nameInput = document.getElementById('name-input');
      if (nameInput) {
        nameInput.classList.add('animate-[shake_0.4s_ease]');
        nameInput.focus();
        setTimeout(() => nameInput.classList.remove('animate-[shake_0.4s_ease]'), 500);
      }
      return;
    }
    setPosterReady(true);
    setTimeout(() => {
      previewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      triggerConfetti();
    }, 300);
  };

  const triggerConfetti = () => {
    const end = Date.now() + 2500;
    const frame = () => {
      confetti({ particleCount: 4, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#16a34a', '#dc2626', '#FFD700', '#000'] });
      confetti({ particleCount: 4, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#16a34a', '#dc2626', '#FFD700', '#000'] });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  };

  const dlPoster = () => {
    if (!stageRef.current) return;
    const customRatio = 1080 / stageRef.current.width();
    const uri = stageRef.current.toDataURL({ pixelRatio: customRatio, mimeType: 'image/jpeg', quality: 1 });
    // Tell Vercel Analytics that a download happened!
    track('download_poster', {
      template: selectedTemplate.name,
      party: 'AIADMK',
      name: userDetails.name,
      desig: userDetails.desig,
      area: userDetails.area
    });

    const a = document.createElement('a');
    a.download = `PosterTamizh_${PARTY.name}_${Date.now()}.jpg`;
    a.href = uri;
    a.click();
  };

  const getShareMessage = () => {
    const name = userDetails.name || 'தொண்டர்';
    const desig = userDetails.desig ? `🏷️ ${userDetails.desig}` : '';
    const area = userDetails.area ? `📍 ${userDetails.area}` : '';
    const msg = [
      '🌱 *இரட்டை இலை வெற்றி பெற!* 🌱',
      '',
      `📌 *${name}*`,
      desig,
      area,
      '',
      `${tagline}`,
      '',
      '🎨 நீங்களும் உங்கள் HD போஸ்டர் இலவசமாக உருவாக்குங்கள்:',
      `👉 ${process.env.NEXT_PUBLIC_API_URL}`,
      '',
      `${footer}`,
    ].filter(Boolean).join('\n');
    return msg;
  };

  const shareWA = async () => {
    if (!stageRef.current) return;
    try {
      const customRatio = 1080 / stageRef.current.width();
      const uri = stageRef.current.toDataURL({ pixelRatio: customRatio, mimeType: 'image/jpeg', quality: 0.9 });
      const blob = await fetch(uri).then((r) => r.blob());
      // Tell Vercel Analytics that a share happened!
      track('share_poster', {
        template: selectedTemplate.name,
        party: 'AIADMK',
        name: userDetails.name,
        desig: userDetails.desig,
        area: userDetails.area
      });
      if (navigator.share) {
        await navigator.share({
          title: 'PosterTamizh - அதிமுக HD போஸ்டர்',
          text: getShareMessage(),
          files: [new File([blob], 'poster.jpg', { type: 'image/jpeg' })],
        });
      } else {
        throw new Error('No Share API');
      }
    } catch {
      const txt = encodeURIComponent(getShareMessage());
      window.open(`https://wa.me/917010608294?text=${txt}`, '_blank');
      dlPoster();
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] font-sans antialiased">
      {/* ═══════════════════════════════════════════
          SECTION 1: HERO BANNER
      ═══════════════════════════════════════════ */}
      <header className="bg-gradient-to-b from-green-900 via-green-800 to-green-700 text-white py-6 px-5 text-center relative overflow-hidden">
        {/* Decorative party color strip */}
        <div className="absolute top-0 left-0 right-0 h-1.5 flex">
          <div className="flex-1 bg-black" />
          <div className="flex-1 bg-white" />
          <div className="flex-1 bg-red-600" />
        </div>

        <div className="max-w-[500px] mx-auto">
          <div className="text-4xl mb-2">🌱</div>
          <h1 className="text-2xl font-black tracking-tight mb-1">
            போஸ்டர் உருவாக்கு
          </h1>
          <p className="text-green-200 text-sm font-semibold opacity-90">
            3 நிமிடத்தில் உங்கள் HD போஸ்டர் ரெடி!
          </p>
        </div>
      </header>

      {/* Social Proof Banner (Hidden until there are active users)
      <div className="max-w-[500px] mx-auto px-4 mt-4">
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-2xl p-3.5 flex items-center gap-3 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-400 rounded-l-2xl" />
          <div className="text-2xl">🔥</div>
          <div>
            <div className="text-sm font-black text-amber-900">100+ தொண்டர்கள் Download செய்துள்ளனர்!</div>
            <div className="text-[11px] font-semibold text-amber-700 mt-0.5">அதிமுக தொண்டர்கள் நம்பும் #1 போஸ்டர் App</div>
          </div>
        </div>
      </div>
      */}

      <main className="max-w-[500px] mx-auto px-4 pb-10">

        {/* ═══════════════════════════════════════════
            SECTION 2: PICK A DESIGN
        ═══════════════════════════════════════════ */}
        <section className="mt-6 mb-6">
          <h2 className="text-lg font-black mb-3 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center text-sm font-black">1</span>
            🎨 Design தேர்வு செய்
          </h2>

          <div className="flex gap-3 overflow-x-auto pb-3 hide-scrollbar snap-x snap-mandatory">
            {PARTY.templates.map((t) => {
              const isSelected = selectedTemplate?.id === t.id;
              return (
                <div
                  key={t.id}
                  onClick={() => {
                    setSelectedTemplate(t);
                    setPosterReady(false);
                  }}
                  className={`shrink-0 w-[130px] aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 snap-start relative active:scale-95 ${isSelected
                    ? 'ring-4 ring-green-500 border-4 border-green-500 shadow-lg shadow-green-200'
                    : 'border-2 border-gray-200 opacity-70 hover:opacity-100'
                    }`}
                >
                  {t.layout?.bgImageSrc && (
                    <img
                      src={t.layout.bgImageSrc}
                      alt={t.TamizhName}
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                  )}
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-green-500 text-white flex items-center justify-center text-xs font-black shadow-md">
                      ✓
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <Link
            href="/templates"
            className="flex items-center justify-center gap-2 mt-3 py-2.5 px-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm font-bold hover:bg-green-100 transition-colors active:scale-[0.97] no-underline"
          >
            ➕ மேலும் Designs வேண்டுமா?
          </Link>
        </section>

        {/* ═══════════════════════════════════════════
            SECTION 3: YOUR DETAILS (Giant Inputs)
        ═══════════════════════════════════════════ */}
        <section className="mb-6">
          <h2 className="text-lg font-black mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center text-sm font-black">2</span>
            📝 உங்கள் விவரங்கள்
          </h2>

          <div className="space-y-4">
            {/* PHOTO — Giant Tap Target */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className={`rounded-2xl p-5 text-center cursor-pointer transition-all duration-200 active:scale-[0.98] border-3 ${userDetails.photoDataUrl
                ? 'bg-green-50 border-green-400'
                : 'bg-white border-dashed border-gray-300 hover:border-green-400'
                }`}
            >
              {userDetails.photoDataUrl ? (
                <img
                  src={userDetails.photoDataUrl}
                  alt="photo"
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg mx-auto mb-3"
                />
              ) : (
                <div className="text-6xl mb-2">📸</div>
              )}
              <div className="text-base font-black">
                {userDetails.photoDataUrl ? '✅ புகைப்படம் சேர்ந்தது!' : '📸 புகைப்படம் சேர்'}
              </div>
              <div className="text-xs text-[var(--muted)] mt-1 font-semibold">
                {userDetails.photoDataUrl ? 'மாற்ற இங்கே தட்டுங்கள்' : 'இங்கே தட்டுங்கள்'}
              </div>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handlePhoto}
            />

            {/* NAME */}
            <div>
              <label className="text-sm font-black mb-1.5 block flex items-center gap-2">
                👤 உங்கள் பெயர் <span className="text-red-500 text-lg">*</span>
              </label>
              <input
                id="name-input"
                type="text"
                className="w-full bg-white border-2 border-gray-200 rounded-2xl px-4 py-4 text-[var(--text)] text-lg font-bold transition-all duration-200 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-50 placeholder-gray-400"
                placeholder="உங்கள் பெயர் எழுதுங்கள்"
                value={userDetails.name}
                onChange={(e) => updateField('name', e.target.value)}
              />
            </div>

            {/* DESIGNATION */}
            <div>
              <label className="text-sm font-black mb-1.5 block flex items-center gap-2">
                🏷️ பொறுப்பு
              </label>
              <select
                className="w-full bg-white border-2 border-gray-200 rounded-2xl px-4 py-4 text-[var(--text)] text-base font-bold transition-all duration-200 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-50 appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%2364748b' d='M1 1l5 5 5-5'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 16px center',
                }}
                value={isCustomDesig ? 'custom' : userDetails.desig}
                onChange={(e) => {
                  if (e.target.value === 'custom') {
                    setIsCustomDesig(true);
                    updateField('desig', '');
                  } else {
                    setIsCustomDesig(false);
                    updateField('desig', e.target.value);
                  }
                }}
              >
                <option value="">-- பொறுப்பு தேர்வு செய்யவும் --</option>
                <optgroup label="கட்சி பொறுப்புகள்">
                  <option>மாவட்ட செயலாளர்</option>
                  <option>நகர செயலாளர்</option>
                  <option>வட்டார செயலாளர்</option>
                  <option>ஊர் செயலாளர்</option>
                  <option>கிளை செயலாளர்</option>
                  <option>பகுதி செயலாளர்</option>
                  <option>கோட்ட செயலாளர்</option>
                  <option>தலைவர்</option>
                  <option>துணை தலைவர்</option>
                  <option>பொருளாளர்</option>
                  <option>ஒருங்கிணைப்பாளர்</option>
                </optgroup>
                <optgroup label="இளைஞர் அணி">
                  <option>இளைஞர் அணி மாவட்ட செயலாளர்</option>
                  <option>இளைஞர் அணி தலைவர்</option>
                  <option>இளைஞர் அணி செயலர்</option>
                </optgroup>
                <optgroup label="மகளிர் அணி">
                  <option>மகளிர் அணி மாவட்ட செயலாளர்</option>
                  <option>மகளிர் அணி தலைவர்</option>
                </optgroup>
                <optgroup label="மாணவர் அணி">
                  <option>மாணவர் அணி மாவட்ட செயலாளர்</option>
                  <option>மாணவர் அணி தலைவர்</option>
                </optgroup>
                <optgroup label="தேர்தல் பொறுப்புகள்">
                  <option>நகர மன்ற வேட்பாளர்</option>
                  <option>சட்டமன்ற வேட்பாளர்</option>
                  <option>கவுன்சிலர்</option>
                  <option>பஞ்சாயத்து தலைவர்</option>
                </optgroup>
                <optgroup label="மற்றவை (Other)">
                  <option value="custom">➕ வேறு பொறுப்பை தட்டச்சு செய்ய...</option>
                </optgroup>
              </select>

              {isCustomDesig && (
                <input
                  type="text"
                  className="w-full bg-white border-2 border-gray-200 rounded-2xl px-4 py-4 mt-3 text-[var(--text)] text-base font-bold transition-all duration-200 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-50 placeholder-gray-400 animate-in fade-in slide-in-from-top-2"
                  placeholder="உங்கள் பொறுப்பை எழுதுங்கள்"
                  value={userDetails.desig}
                  onChange={(e) => updateField('desig', e.target.value)}
                  autoFocus
                />
              )}
            </div>

            {/* AREA */}
            <div>
              <label className="text-sm font-black mb-1.5 block flex items-center gap-2">
                📍 பகுதி / தொகுதி
              </label>
              <input
                type="text"
                className="w-full bg-white border-2 border-gray-200 rounded-2xl px-4 py-4 text-[var(--text)] text-base font-bold transition-all duration-200 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-50 placeholder-gray-400"
                placeholder="உ.ம்: புவனகிரி / சென்னை மத்திய"
                value={userDetails.area}
                onChange={(e) => updateField('area', e.target.value)}
              />
            </div>
          </div>

          {/* CREATE BUTTON — Massive & Green */}
          <button
            onClick={handleCreatePoster}
            className="w-full mt-6 py-5 rounded-2xl border-none font-black text-xl cursor-pointer transition-all duration-300 bg-gradient-to-r from-green-600 to-green-500 text-white shadow-xl shadow-green-200 hover:shadow-2xl hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3"
            style={{ animation: 'pulse-green 2s infinite' }}
          >
            🎨 போஸ்டர் உருவாக்கு!
          </button>
        </section>

        {/* ═══════════════════════════════════════════
            SECTION 4: LIVE POSTER PREVIEW
        ═══════════════════════════════════════════ */}
        {posterReady && (
          <section ref={previewRef} className="mb-8" style={{ animation: 'fadeUp 0.4s ease' }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-black flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center text-sm font-black">3</span>
                🖼️ உங்கள் போஸ்டர் ரெடி!
              </h2>
            </div>

            {/* Accessible Actions (Top) */}
            <div className="flex gap-3 mb-5">
              <button
                onClick={shareWA}
                className="flex-1 py-3 rounded-xl border-none font-black text-sm cursor-pointer transition-all duration-300 bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-md shadow-green-200 hover:shadow-lg active:scale-95 flex items-center justify-center gap-2"
              >
                <span className="text-lg">💬</span>
                Share
              </button>
              <button
                onClick={dlPoster}
                className="flex-1 py-3 rounded-xl border-none font-black text-sm cursor-pointer transition-all duration-300 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-200 hover:shadow-lg active:scale-95 flex items-center justify-center gap-2"
              >
                <span className="text-lg">⬇️</span>
                Download
              </button>
            </div>

            <div
              className="poster-protected"
              onContextMenu={(e) => e.preventDefault()}
            >
              <PosterCanvas
                width={1080}
                height={1350}
                party={PARTY}
                template={selectedTemplate}
                details={userDetails}
                onStageReady={(stage: any) => {
                  stageRef.current = stage;
                }}
              />
            </div>

            {/* ═══════════════════════════════════════════
                SECTION 5: ACTION BUTTONS
            ═══════════════════════════════════════════ */}
            <div className="mt-6 space-y-3">
              {/* WhatsApp — Primary, MASSIVE */}
              <button
                onClick={shareWA}
                className="w-full py-5 rounded-2xl border-none font-black text-xl cursor-pointer transition-all duration-300 bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-xl shadow-green-200 hover:shadow-2xl hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3"
              >
                <span className="text-2xl">💬</span>
                WhatsApp-ல் Share
              </button>

              {/* Download */}
              <button
                onClick={dlPoster}
                className="w-full py-5 rounded-2xl border-none font-black text-xl cursor-pointer transition-all duration-300 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-200 hover:shadow-2xl hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3"
              >
                <span className="text-2xl">⬇️</span>
                HD Download
              </button>

              {/* New Poster */}
              <button
                onClick={() => {
                  setPosterReady(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full py-4 rounded-2xl font-black text-base cursor-pointer transition-all duration-200 bg-white text-gray-700 border-2 border-gray-200 hover:bg-gray-50 active:scale-[0.97] flex items-center justify-center gap-2"
              >
                🔄 வேறு Design-ல் உருவாக்க
              </button>
            </div>

            {/* WhatsApp Tip Box */}
            <div className="mt-5 bg-green-50 border border-green-200 rounded-2xl p-4 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-green-500 rounded-l-2xl" />
              <h4 className="text-sm font-black text-green-800 mb-2 flex items-center gap-2">
                📱 WhatsApp Status-ல் போட
              </h4>
              <div className="space-y-1 text-xs font-bold text-green-700 pl-1">
                <p>① Download அழுத்துங்கள்</p>
                <p>② WhatsApp திறக்கவும்</p>
                <p>③ Status → Gallery-ல் போஸ்டரை Share செய்யுங்கள்!</p>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* FREE Pilot CTA Section */}
      <div className="max-w-[500px] mx-auto px-4 pb-6">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-3xl p-6 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-white to-green-600" />

          {/* Urgency badge */}
          <div className="flex justify-center mb-3">
            <span className="bg-red-500 text-white text-[11px] font-black px-3 py-1 rounded-full animate-pulse">
              ⏰ முதல் 5 தொகுதிகளுக்கு மட்டுமே!
            </span>
          </div>

          <div className="text-4xl mb-2">🎁</div>
          <h3 className="text-lg font-black text-green-900 mb-1">
            FREE Pilot — 6 போஸ்டர்கள் இலவசம்!
          </h3>
          <p className="text-sm font-semibold text-green-700 mb-4 leading-relaxed">
            உங்கள் தொகுதி பெயர், வேட்பாளர் படம் சேர்த்து 6 தனிப்பயன் HD போஸ்டர்கள் — முற்றிலும் இலவசம்!
          </p>
          <Link
            href="/request"
            className="inline-flex items-center justify-center gap-2 py-4 px-8 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-500 text-white font-black text-base shadow-xl shadow-green-200 hover:-translate-y-1 active:scale-95 transition-all duration-300 no-underline w-full"
            style={{ animation: 'pulse-green 2s infinite' }}
          >
            🎁 இலவச Pilot-ல் இடம் பிடி!
          </Link>
          <p className="text-[11px] font-black text-red-600 mt-3">
            🔥 இடங்கள் குறைவு — இப்போதே பதிவு செய்யுங்கள்!
          </p>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="text-center py-8 px-5 text-[var(--muted)] text-xs border-t border-green-100 bg-green-50/50">
        <div className="flex justify-center gap-3 mb-4">
          <span className="bg-white px-3 py-1.5 rounded-lg border border-green-200 text-xs font-black text-green-700">HD Quality</span>
          <span className="bg-white px-3 py-1.5 rounded-lg border border-green-200 text-xs font-black text-green-700">100% Free</span>
        </div>

        <div className="flex justify-center gap-3 mb-4">
          <Link href="/about" className="text-green-700 font-bold hover:underline no-underline">
            எங்களை பற்றி
          </Link>
          <span className="text-gray-300">|</span>
          <Link href="/request" className="text-green-700 font-bold hover:underline no-underline">
            தொகுதி போஸ்டர் கேளுங்கள்
          </Link>
        </div>

        <p>Made with ❤️ | <b>PosterTamizh.app</b></p>
        <span className="text-[10px] mt-1.5 block opacity-60">© {new Date().getFullYear()} PosterTamizh</span>
      </footer>
    </div>
  );
}

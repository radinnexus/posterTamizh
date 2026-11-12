'use client';

import Link from 'next/link';
import { useState } from 'react';
import { track } from '@vercel/analytics';

type LeadFormData = {
  name: string;
  phone: string;
  constituency: string;
  designation: string;
  message: string;
};

const INITIAL_FORM: LeadFormData = {
  name: '',
  phone: '',
  constituency: '',
  designation: '',
  message: '',
};

const RequestPage = () => {
  const [form, setForm] = useState<LeadFormData>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const updateField = (field: keyof LeadFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.phone.trim() || !form.constituency.trim()) {
      return;
    }

    setSubmitting(true);

    // Track the lead submission in Vercel Analytics
    track('lead_form_submit', {
      constituency: form.constituency,
      designation: form.designation || 'N/A',
    });

    // Build WhatsApp message with the form data
    const waMessage = [
      '🌱 *PosterTamizh - புதிய தொகுதி போஸ்டர் கோரிக்கை*',
      '',
      `👤 *பெயர்:* ${form.name}`,
      `📞 *தொலைபேசி:* ${form.phone}`,
      `📍 *தொகுதி:* ${form.constituency}`,
      form.designation ? `🏷️ *பொறுப்பு:* ${form.designation}` : '',
      form.message ? `💬 *குறிப்பு:* ${form.message}` : '',
      '',
      '---',
      'PosterTamizh.app வழியாக அனுப்பப்பட்டது',
    ]
      .filter(Boolean)
      .join('\n');

    const waUrl = `https://wa.me/917010608294?text=${encodeURIComponent(waMessage)}`;
    window.open(waUrl, '_blank');

    // Show success state
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  if (submitted) {
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
          </div>
        </header>

        <main className="max-w-[500px] mx-auto px-4 py-12 text-center">
          <div
            className="bg-white rounded-3xl p-8 shadow-lg border border-green-200 relative overflow-hidden"
            style={{ animation: 'fadeUp 0.5s ease' }}
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-green-500 via-green-400 to-green-500" />
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-black text-green-800 mb-3">
              கோரிக்கை பெறப்பட்டது!
            </h2>
            <p className="text-sm font-semibold text-gray-600 mb-6 leading-relaxed">
              உங்கள் தொகுதிக்கான போஸ்டர் விரைவில் தயாரிக்கப்பட்டு, WhatsApp-ல் உங்களுக்குத் தெரிவிக்கப்படும்.
            </p>

            <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-6">
              <div className="text-sm font-black text-green-800 mb-1">📞 உங்கள் விவரங்கள்</div>
              <div className="text-xs font-semibold text-green-700 space-y-0.5">
                <p>👤 {form.name}</p>
                <p>📍 {form.constituency}</p>
                <p>📞 {form.phone}</p>
              </div>
            </div>

            <div className="space-y-3">
              <Link
                href="/"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-green-600 to-green-500 text-white font-black text-base shadow-lg shadow-green-200 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 no-underline flex items-center justify-center gap-2"
              >
                🌱 போஸ்டர் உருவாக்க
              </Link>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setForm(INITIAL_FORM);
                }}
                className="w-full py-3 rounded-2xl bg-white text-gray-700 font-black text-sm border-2 border-gray-200 hover:bg-gray-50 active:scale-[0.97] transition-all cursor-pointer"
              >
                🔄 மற்றொரு கோரிக்கை அனுப்ப
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] font-sans antialiased">
      {/* Header */}
      <header className="bg-gradient-to-b from-green-900 via-green-800 to-green-700 text-white py-6 px-5 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 flex">
          <div className="flex-1 bg-red-600" />
          <div className="flex-1 bg-white" />
          <div className="flex-1 bg-black" />
        </div>
        <div className="max-w-[500px] mx-auto">
          <Link
            href="/"
            className="text-green-200 text-sm font-bold no-underline flex items-center gap-1 mb-3 hover:text-white transition-colors"
          >
            ← முகப்பு பக்கம்
          </Link>
          <h1 className="text-2xl font-black tracking-tight mb-1">
            🎁 FREE Pilot — தொகுதி போஸ்டர்!
          </h1>
          <p className="text-green-200 text-sm font-semibold opacity-90">
            ஒரு தொகுதிக்கு 6 போஸ்டர்கள் முற்றிலும் இலவசம்!
          </p>
        </div>
      </header>

      <main className="max-w-[500px] mx-auto px-4 pb-10">
        {/* Urgency Banner */}
        <div
          className="mt-5 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl p-4 relative overflow-hidden"
          style={{ animation: 'fadeUp 0.3s ease' }}
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-orange-500" />
          <div className="flex items-center gap-3">
            <div className="text-3xl">⏰</div>
            <div>
              <div className="text-sm font-black text-red-800">முதல் 5 தொகுதிகளுக்கு மட்டுமே FREE!</div>
              <div className="text-xs font-semibold text-red-600 mt-0.5">
                இடங்கள் குறைவு — இப்போதே பதிவு செய்யுங்கள்!
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className={`flex-1 h-2 rounded-full ${i <= 0 ? 'bg-red-400' : 'bg-green-400 animate-pulse'}`} />
            ))}
          </div>
          <div className="flex justify-between mt-1 text-[10px] font-bold text-gray-500">
            <span>0 நிரம்பியது</span>
            <span>5 இடங்கள் மட்டுமே!</span>
          </div>
        </div>

        {/* Social Proof Banner (Hidden until there are active users)
        <div
          className="mt-3 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-2xl p-3.5 flex items-center gap-3 relative overflow-hidden"
          style={{ animation: 'fadeUp 0.35s ease' }}
        >
          <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-400 rounded-l-2xl" />
          <div className="text-2xl">🔥</div>
          <div>
            <div className="text-sm font-black text-amber-900">100+ தொண்டர்கள் ஏற்கனவே பயன்படுத்துகிறார்கள்!</div>
            <div className="text-xs font-semibold text-amber-700 mt-0.5">
              அதிமுக தொண்டர்கள் நம்பும் #1 போஸ்டர் App
            </div>
          </div>
        </div>
        */}

        {/* Free Pilot Offer Box */}
        <div
          className="mt-4 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-2xl p-5 relative overflow-hidden"
          style={{ animation: 'fadeUp 0.4s ease' }}
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-400" />
          <div className="text-center mb-3">
            <span className="inline-block bg-green-600 text-white text-xs font-black px-3 py-1 rounded-full">🎁 FREE PILOT OFFER</span>
          </div>
          <div className="text-center mb-3">
            <div className="text-3xl font-black text-green-900">6 போஸ்டர்கள்</div>
            <div className="text-sm font-bold text-green-700">ஒவ்வொரு தொகுதிக்கும் முற்றிலும் இலவசம்!</div>
          </div>
          <div className="bg-white rounded-xl p-3 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
              <span className="text-green-500">✅</span> 6 தனிப்பயன் HD போஸ்டர்கள்
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
              <span className="text-green-500">✅</span> உங்கள் தொகுதி பெயர் + வேட்பாளர் படம்
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
              <span className="text-green-500">✅</span> WhatsApp-ல் நேரடி டெலிவரி
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
              <span className="text-green-500">✅</span> 24 மணி நேரத்தில் ரெடி
            </div>
          </div>
          <div className="text-center mt-3">
            <span className="text-xs font-black text-red-600">⏰ முதல் 5 தொகுதிகளுக்கு மட்டுமே — பிறகு கட்டணம் விதிக்கப்படும்</span>
          </div>
        </div>

        {/* How It Works */}
        <div
          className="mt-4 bg-white border border-gray-200 rounded-2xl p-4 relative overflow-hidden"
          style={{ animation: 'fadeUp 0.45s ease' }}
        >
          <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500 rounded-l-2xl" />
          <div className="flex items-start gap-3">
            <div className="text-2xl mt-0.5">💡</div>
            <div>
              <div className="text-sm font-black text-gray-800 mb-1">இது எப்படி வேலை செய்கிறது?</div>
              <div className="text-xs font-semibold text-gray-600 space-y-1">
                <p>① கீழே உங்கள் விவரங்களை நிரப்புங்கள்</p>
                <p>② நாங்கள் உங்கள் தொகுதிக்கு 6 போஸ்டர் தயாரிப்போம்</p>
                <p>③ 24 மணி நேரத்தில் WhatsApp-ல் டெலிவரி!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Lead Capture Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-4"
          style={{ animation: 'fadeUp 0.5s ease' }}
        >
          <h2 className="text-lg font-black flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center text-sm font-black">
              📝
            </span>
            உங்கள் விவரங்கள்
          </h2>

          {/* Name */}
          <div>
            <label className="text-sm font-black mb-1.5 block flex items-center gap-2">
              👤 பெயர் <span className="text-red-500 text-lg">*</span>
            </label>
            <input
              type="text"
              required
              className="w-full bg-white border-2 border-gray-200 rounded-2xl px-4 py-4 text-[var(--text)] text-lg font-bold transition-all duration-200 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-50 placeholder-gray-400"
              placeholder="உங்கள் பெயர் எழுதுங்கள்"
              value={form.name}
              onChange={(e) => updateField('name', e.target.value)}
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm font-black mb-1.5 block flex items-center gap-2">
              📞 தொலைபேசி எண் <span className="text-red-500 text-lg">*</span>
            </label>
            <input
              type="tel"
              required
              inputMode="numeric"
              pattern="[0-9]{10}"
              className="w-full bg-white border-2 border-gray-200 rounded-2xl px-4 py-4 text-[var(--text)] text-lg font-bold transition-all duration-200 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-50 placeholder-gray-400"
              placeholder="உ.ம்: 9876543210"
              value={form.phone}
              onChange={(e) => updateField('phone', e.target.value.replace(/\D/g, '').slice(0, 10))}
            />
            <p className="text-xs font-semibold text-gray-400 mt-1 ml-1">
              WhatsApp எண் கொடுத்தால் விரைவாக பதில் வரும்
            </p>
          </div>

          {/* Constituency */}
          <div>
            <label className="text-sm font-black mb-1.5 block flex items-center gap-2">
              📍 தொகுதி / பகுதி <span className="text-red-500 text-lg">*</span>
            </label>
            <input
              type="text"
              required
              className="w-full bg-white border-2 border-gray-200 rounded-2xl px-4 py-4 text-[var(--text)] text-lg font-bold transition-all duration-200 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-50 placeholder-gray-400"
              placeholder="உ.ம்: புவனகிரி / சென்னை மத்திய"
              value={form.constituency}
              onChange={(e) => updateField('constituency', e.target.value)}
            />
          </div>

          {/* Designation */}
          <div>
            <label className="text-sm font-black mb-1.5 block flex items-center gap-2">
              🏷️ கட்சி பொறுப்பு
            </label>
            <select
              className="w-full bg-white border-2 border-gray-200 rounded-2xl px-4 py-4 text-[var(--text)] text-base font-bold transition-all duration-200 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-50 appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%2364748b' d='M1 1l5 5 5-5'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 16px center',
              }}
              value={form.designation}
              onChange={(e) => updateField('designation', e.target.value)}
            >
              <option value="">-- பொறுப்பு தேர்வு செய்யவும் --</option>
              <option>மாவட்ட செயலாளர்</option>
              <option>நகர செயலாளர்</option>
              <option>வட்டார செயலாளர்</option>
              <option>ஊர் செயலாளர்</option>
              <option>கிளை செயலாளர்</option>
              <option>பகுதி செயலாளர்</option>
              <option>தலைவர்</option>
              <option>துணை தலைவர்</option>
              <option>பொருளாளர்</option>
              <option>ஒருங்கிணைப்பாளர்</option>
              <option>இளைஞர் அணி தலைவர்</option>
              <option>மகளிர் அணி தலைவர்</option>
              <option>தொண்டர்</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label className="text-sm font-black mb-1.5 block flex items-center gap-2">
              💬 குறிப்பு (விருப்பத்திற்கு)
            </label>
            <textarea
              className="w-full bg-white border-2 border-gray-200 rounded-2xl px-4 py-4 text-[var(--text)] text-base font-bold transition-all duration-200 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-50 placeholder-gray-400 resize-none"
              rows={3}
              placeholder="போஸ்டரில் என்ன வேண்டும் என்று குறிப்பிடுங்கள்..."
              value={form.message}
              onChange={(e) => updateField('message', e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full mt-2 py-5 rounded-2xl border-none font-black text-xl cursor-pointer transition-all duration-300 bg-gradient-to-r from-green-600 to-green-500 text-white shadow-xl shadow-green-200 hover:shadow-2xl hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-wait"
            style={{ animation: submitting ? 'none' : 'pulse-green 2s infinite' }}
          >
            {submitting ? (
              <>
                <span className="w-5 h-5 border-2 border-t-white border-white/30 rounded-full animate-spin" />
                அனுப்புகிறது...
              </>
            ) : (
              <>🎁 இலவச Pilot-ல் இடம் பிடி!</>
            )}
          </button>

          <p className="text-xs font-semibold text-center text-red-500 mt-2">
            ⏰ முதல் 5 தொகுதிகளுக்கு மட்டுமே — விரைவில் நிரம்பும்!
          </p>
          <p className="text-[11px] font-semibold text-center text-gray-400 mt-1">
            🔒 உங்கள் தகவல்கள் பாதுகாப்பாக வைக்கப்படும்
          </p>
        </form>

        {/* Back to poster maker */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-white border-2 border-gray-200 text-gray-700 font-black text-sm hover:bg-gray-50 active:scale-[0.97] transition-all no-underline"
          >
            🌱 போஸ்டர் உருவாக்கி பக்கத்திற்கு செல்ல
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 px-5 text-[var(--muted)] text-xs border-t border-green-100 bg-green-50/50">
        <p className="font-medium">Made with ❤️ | <b>PosterTamizh.app</b></p>
        <span className="text-[10px] mt-1 block opacity-60">© {new Date().getFullYear()} PosterTamizh</span>
      </footer>
    </div>
  );
};

export default RequestPage;

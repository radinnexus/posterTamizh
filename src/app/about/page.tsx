'use client';

import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] font-sans antialiased pb-10">
      {/* Header */}
      <header className="bg-gradient-to-b from-green-900 to-green-700 text-white py-6 px-5 text-center relative overflow-hidden shadow-md">
        <div className="absolute top-0 left-0 right-0 h-1.5 flex">
          <div className="flex-1 bg-red-600" />
          <div className="flex-1 bg-white" />
          <div className="flex-1 bg-black" />
        </div>
        <div className="max-w-[500px] mx-auto text-left flex flex-col pt-2">
          <Link
            href="/"
            className="text-green-200 text-sm font-bold no-underline flex items-center gap-1 mb-3 hover:text-white transition-colors w-fit"
          >
            ← முகப்பு பக்கம்
          </Link>
          <h1 className="text-2xl font-black tracking-tight mb-1">
            எங்களை பற்றி (About Us)
          </h1>
          <p className="text-green-100 text-sm font-medium">
            PosterTamizh - உங்கள் போஸ்டர் உங்கள் கையில்
          </p>
        </div>
      </header>

      <main className="max-w-[500px] mx-auto px-5 py-8 space-y-8">

        {/* Mission Section */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-green-500" />
          <h2 className="text-xl font-black text-green-800 mb-4 flex items-center gap-2">
            <span>🎯</span> நமது நோக்கம்
          </h2>
          <div className="space-y-4 text-sm font-medium text-gray-700 leading-relaxed">
            <p>
              கட்சியின் கடைக்கோடி தொண்டனும் எந்த ஒரு செலவுமின்றி, மிக எளிதாக, தொழில்முறை (Professional) தரத்தில் அரசியல் போஸ்டர்களை உருவாக்க வேண்டும் என்பதே <strong>PosterTamizh</strong>-இன் நோக்கம்.
            </p>
            <p>
              தொழில்நுட்ப அறிவு அல்லது டிசைனிங் திறன் எதுவும் இல்லாமல், அனைவராலும் பயன்படுத்தக்கூடிய வகையில் இந்த செயலியை வடிவமைத்துள்ளோம்.
            </p>
          </div>
        </section>

        {/* Future Features */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500" />
          <h2 className="text-xl font-black text-blue-900 mb-4 flex items-center gap-2">
            <span>🚀</span> வரவிருக்கும் சிறப்பம்சங்கள்
          </h2>
          <ul className="space-y-3 text-sm font-medium text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-500">✅</span> இன்னும் பல புதிய கவர்ச்சிகரமான மாடல்கள்
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500">✅</span> பண்டிகை மற்றும் பிறந்தநாள் போஸ்டர்கள்
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500">✅</span> செயலியை மேலும் மேம்படுத்தும் பல புதிய வசதிகள்!
            </li>
          </ul>
        </section>

        {/* Connect Section */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-500" />
          <h2 className="text-xl font-black text-amber-900 mb-4 flex items-center gap-2">
            <span>🤝</span> தொடர்புகொள்ள
          </h2>
          <p className="text-sm font-medium text-gray-700 mb-5">
            உங்கள் கருத்துக்கள், புதிய போஸ்டர் மாடல் தேவைகள் அல்லது சந்தேகங்களுக்கு எங்களை தொடர்புகொள்ளவும்.
          </p>

          <div className="space-y-3">
            <a
              href="https://wa.me/917010608294"
              target="_blank"
              rel="noreferrer"
              className="w-full bg-green-50 hover:bg-green-100 border border-green-200 p-4 rounded-xl flex items-center gap-3 transition-colors no-underline"
            >
              <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center text-xl">
                💬
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-green-900 text-sm">WhatsApp</span>
                <span className="font-semibold text-green-700 text-xs">+91 70106 08294</span>
              </div>
            </a>

            <a
              href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}
              className="w-full bg-blue-50 hover:bg-blue-100 border border-blue-200 p-4 rounded-xl flex items-center gap-3 transition-colors no-underline"
            >
              <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl">
                ✉️
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-blue-900 text-sm">Email Support</span>
                <span className="font-semibold text-blue-700 text-xs">{process.env.NEXT_PUBLIC_EMAIL}</span>
              </div>
            </a>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="text-center py-6 px-5 mt-10 text-[var(--muted)] text-xs border-t border-green-100 bg-green-50/50">
        <p className="font-medium">Made with ❤️ for Tamil Nadu</p>
        <span className="text-[10px] mt-1 block opacity-60">© {new Date().getFullYear()} PosterTamizh</span>
      </footer>
    </div>
  );
}

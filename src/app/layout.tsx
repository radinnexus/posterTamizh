import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Analytics } from '@vercel/analytics/next';

const url = process.env.NEXT_PUBLIC_API_URL || "https://postertamizh.app";
//export const url = process.env.NEXT_PUBLIC_API_URL;
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#16a34a',
};

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: 'PosterTamizh | அதிமுக HD போஸ்டர் உருவாக்கி | AIADMK Poster Maker Free',
  description:
    'அதிமுக அரசியல் போஸ்டர்களை இலவசமாக HD-யில் உருவாக்குங்கள். பெயர், பதவி, புகைப்படத்துடன் உங்கள் சொந்த போஸ்டரை WhatsApp-ல் பகிருங்கள். Create free AIADMK political posters in HD with your name, designation & photo.',
  keywords: [
    'PosterTamizh', 'அதிமுக போஸ்டர்', 'AIADMK poster maker',
    'political poster Tamil Nadu', 'free poster generator',
    'HD poster download', 'அரசியல் போஸ்டர்', 'WhatsApp poster share',
    'Tamil political poster', 'ADMK poster', 'இரட்டை இலை',
  ],
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'ta_IN',
    url: url,
    siteName: 'PosterTamizh',
    title: 'PosterTamizh | அதிமுக HD போஸ்டர் இலவசமாக உருவாக்கு | AIADMK Poster Maker Free',
    description: 'உங்கள் பெயர், பதவி & புகைப்படத்துடன் அதிமுக HD போஸ்டர் உருவாக்கி WhatsApp-ல் Share செய்யுங்கள்! 100% Free.',
    images: [
      {
        url: '/icons/icon-512x512.png',
        width: 512,
        height: 512,
        alt: 'PosterTamizh - AIADMK Poster Maker',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PosterTamizh | அதிமுக HD போஸ்டர் உருவாக்கி',
    description: 'அதிமுக போஸ்டர்களை இலவசமாக HD-யில் உருவாக்குங்கள். WhatsApp-ல் பகிருங்கள்!',
    images: ['/icons/icon-512x512.png'],
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/icons/icon-192x192.png',
    apple: '/icons/icon-512x512.png',
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'PosterTamizh',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ta" data-scroll-behavior="smooth">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-512x512.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="antialiased">
        {children}
        <Analytics />
        {/* Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(reg) { console.log('SW registered:', reg.scope); })
                    .catch(function(err) { console.log('SW registration failed:', err); });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}

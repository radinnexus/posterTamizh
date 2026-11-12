export interface FooterStyle {
  id: string;
  label: string;         // Tamil label shown in UI
  colors: [string, string, string]; // gradient: start, mid, en
  overlay: string;       // semi-transparent overlay color
  textColorPrimary?: string; // Optional custom text color for Name
  textColorSecondary?: string; // Optional custom text color for Designation
  textColorAccent?: string; // Optional custom text color for Area
}

export const FOOTER_STYLES: FooterStyle[] = [
  {
    id: 'premium_admk_flag',
    label: 'கட்சி',
    colors: ['#FE0000', '#ffffffff', '#000000'],
    overlay: 'rgba(0, 0, 0, 0.35)',
    textColorSecondary: '#114D23',
    textColorAccent: '#084523ff',
  },
  {
    id: 'earth',
    label: 'மண் நிறம்',
    colors: ['#8A9460', '#B5988A', '#8B5248'],
    overlay: 'rgba(47, 44, 44, 0.62)',
  },
  {
    id: 'forest',
    label: 'பசுமை',
    colors: ['#1B5E20', '#2E7D32', '#388E3C'],
    overlay: 'rgba(10, 40, 10, 0.65)',
  },
  {
    id: 'night',
    label: 'இரவு',
    colors: ['#1a1a2e', '#16213e', '#0f3460'],
    overlay: 'rgba(5, 5, 20, 0.55)',
  },
  {
    id: 'crimson',
    label: 'சிவப்பு',
    colors: ['#7f0000', '#b71c1c', '#7f0000'],
    overlay: 'rgba(30, 0, 0, 0.60)',
  },
  // --- Premium Dark Themes ---
  {
    id: 'premium_obsidian',
    label: 'கறுப்பு',
    colors: ['#2D2D2D', '#141414', '#050505'],
    overlay: 'rgba(0, 0, 0, 0.45)',
  },
  {
    id: 'premium_emerald',
    label: 'இரட்டை இலை (Emerald)',
    colors: ['#18452B', '#0A2113', '#030E07'],
    overlay: 'rgba(0, 5, 0, 0.40)',
  },
  {
    id: 'premium_crimson_dark',
    label: 'கடும் சிவப்பு',
    colors: ['#590E0E', '#2D0505', '#120000'],
    overlay: 'rgba(10, 0, 0, 0.45)',
  },
  {
    id: 'premium_gold',
    label: 'தங்கம்',
    colors: ['#5E4A1A', '#332608', '#140E00'],
    overlay: 'rgba(10, 5, 0, 0.40)',
  },
  // --- Elegant Light Themes ---
  {
    id: 'light_pearl',
    label: 'முத்து',
    colors: ['#FFFFFF', '#F2F2F2', '#E0E0E0'],
    overlay: 'rgba(255, 255, 255, 0.25)',
    textColorPrimary: '#111111',
    textColorSecondary: '#444444',
    textColorAccent: '#D32F2F',
  },
  {
    id: 'light_gold',
    label: 'ஒளி தங்கம்',
    colors: ['#FFF9DB', '#FFE89E', '#E6BA00'],
    overlay: 'rgba(255, 255, 255, 0.1)',
    textColorPrimary: '#2B1A00',
    textColorSecondary: '#543A00',
    textColorAccent: '#B82828',
  },
  {
    id: 'light_green',
    label: 'இளம் பச்சை',
    colors: ['#EBF5EC', '#C4E3CC', '#94CDA2'],
    overlay: 'rgba(255, 255, 255, 0.15)',
    textColorPrimary: '#05210D',
    textColorSecondary: '#114D23',
    textColorAccent: '#D32F2F',
  }
];

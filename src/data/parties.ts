import { PosterLayout } from '@/types';

export type Template = {
  id: string;
  name: string;
  TamizhName: string;
  layout?: PosterLayout;
  tags?: string[];
};

export type PartyColors = {
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  TamizhText: string;
};

export type Party = {
  id: string;
  name: string;
  TamizhName: string;
  fullName: string;
  emoji: string;
  cardBackground: string;
  cardBorder: string;
  cardText: string;
  colors: PartyColors;
  templates: Template[];
  footerImages?: string[];
};

export const PARTIES: Party[] = [
  {
    id: 'aiadmk', name: 'AIADMK', TamizhName: 'அதிமுக', fullName: 'All India Anna Dravida Munnetra Kazhagam', emoji: '🌱',
    cardBackground: 'linear-gradient(to right, #ed1c24 33.3%, #ffffff 33.3%, #ffffff 66.6%, #000000 66.6%)', cardBorder: '#228B22', cardText: '#90EE90',
    colors: { primary: '#228B22', secondary: '#000000', accent: '#8cd0abff', text: '#FFFFFF', TamizhText: '#90EE90' },
    footerImages: [
      '/poster/footer/arunmozhithevan.png',
      '/poster/footer/eps_win.png'
    ],
    templates: [
      {
        id: 't_m_voteforadmk',
        name: 'manifesto_voteforadmk',
        TamizhName: 'வாக்களிப்பீர்',
        layout: { bgImageSrc: '/poster/manifesto_voteforadmk.jpeg', hasCoords: false },
        tags: ['Manifesto']
      },
      {
        id: 't_voteforadmk',
        name: 'voteforadmk',
        TamizhName: 'வாக்களிப்பீர்',
        layout: { bgImageSrc: '/poster/voteforadmk.jpeg', hasCoords: false },
        tags: ['Leader']
      },
      {
        id: 't_bhuvanagiri_winning',
        name: 'bhuvanagiri_winning_candidate',
        TamizhName: 'வெற்றி வேட்பாளர்',
        layout: {
          bgImageSrc: '/poster/bhuvanagiri_winning_candidate.png',
          hasCoords: false,
        },
        tags: ['Bhuvanagiri', 'Leader']
      },
      {
        id: 't_thittakudi_winning',
        name: 'thittakudi_winning_candidate',
        TamizhName: 'வெற்றி வேட்பாளர்',
        layout: {
          bgImageSrc: '/poster/thittakudi winning candidate.png',
          hasCoords: false,
        },
        tags: ['Thittakudi', 'Leader']
      },
      {
        id: 't_tamil_new_year_bhu',
        name: 'tamil_new_year_wish_bhuvanagiri',
        TamizhName: 'தமிழ் புத்தாண்டு',
        layout: {
          bgImageSrc: '/poster/tamil_new_year_wish_bhuvanagiri.png',
          hasCoords: false,
        },
        tags: ['Bhuvanagiri', 'Festival']
      },
      {
        id: 't_tamil_new_year_thi',
        name: 'tamil_new_year_wish_thittakudi',
        TamizhName: 'தமிழ் புத்தாண்டு',
        layout: {
          bgImageSrc: '/poster/tamil_new_year_wish_thittakudi.png',
          hasCoords: false,
        },
        tags: ['Thittakudi', 'Festival']
      },
      {
        id: 't_manifesto_3rd',
        name: '3rd_manifesto',
        TamizhName: 'தேர்தல் அறிக்கை 3',
        layout: { bgImageSrc: '/poster/3rd manifesto.PNG', hasCoords: false },
        tags: ['Manifesto']
      },
      {
        id: 't_eps_2026',
        name: 'eps_for_2026',
        TamizhName: 'EPS 2026',
        layout: { bgImageSrc: '/poster/eps for 2026.webp', hasCoords: false },
        tags: ['Leader']
      },
      {
        id: 't_eps_did',
        name: 'eps_did',
        TamizhName: 'சாதனைகள்',
        layout: { bgImageSrc: '/poster/eps_did.jpeg', hasCoords: false },
        tags: ['Manifesto']
      },
      {
        id: 't_eps_farmers',
        name: 'eps_farmers',
        TamizhName: 'விவசாயிகள்',
        layout: { bgImageSrc: '/poster/eps_farmers.PNG', hasCoords: false },
        tags: ['Manifesto', 'Farmers']
      },
      {
        id: 't_manifesto',
        name: 'manifesto',
        TamizhName: 'தேர்தல் அறிக்கை',
        layout: { bgImageSrc: '/poster/manifesto.heic', hasCoords: false },
        tags: ['Manifesto']
      },
      {
        id: 't_manifesto_2nd',
        name: 'manifesto_2ndRound',
        TamizhName: 'தேர்தல் அறிக்கை 2',
        layout: { bgImageSrc: '/poster/manifesto_2ndRound.JPG', hasCoords: false },
        tags: ['Manifesto']
      },
      {
        id: 't_social_justice',
        name: 'social_justice_eps',
        TamizhName: 'சமூக நீதி',
        layout: { bgImageSrc: '/poster/social_justice eps.PNG', hasCoords: false },
        tags: ['Manifesto']
      },
      {
        id: 't_arunmozhithevan_1',
        name: 'arunmozhithevan_1',
        TamizhName: 'வெற்றி வேட்பாளர்',
        layout: { bgImageSrc: '/poster/bhuvanagiri_arunmozhithevan.jpeg', hasCoords: false },
        tags: ['Bhuvanagiri']
      },
      {
        id: 't_countdown_13',
        name: '13_days_countdown',
        TamizhName: '13 நாட்கள்',
        layout: { bgImageSrc: '/poster/13 DAYS TO GO COUNTDOWN.png', hasCoords: false },
        tags: ['Countdown']
      },
      {
        id: 't_countdown_12',
        name: '12_days_countdown',
        TamizhName: '12 நாட்கள்',
        layout: { bgImageSrc: '/poster/12 days countdown.png', hasCoords: false },
        tags: ['Countdown']
      },
      {
        id: 't_countdown_11',
        name: '11_days_countdown',
        TamizhName: '11 நாட்கள்',
        layout: { bgImageSrc: '/poster/11_countdown.png', hasCoords: false },
        tags: ['Countdown']
      },
      {
        id: 't_countdown_10',
        name: '10_days_countdown',
        TamizhName: '10 நாட்கள்',
        layout: { bgImageSrc: '/poster/10_countdown.png', hasCoords: false },
        tags: ['Countdown']
      },
      {
        id: 't_countdown_9',
        name: '9_days_countdown',
        TamizhName: '9 நாட்கள்',
        layout: { bgImageSrc: '/poster/9_countdown.png', hasCoords: false },
        tags: ['Countdown']
      },
      {
        id: 't_countdown_8',
        name: '8_days_countdown',
        TamizhName: '8 நாட்கள்',
        layout: { bgImageSrc: '/poster/8_countdown.png', hasCoords: false },
        tags: ['Countdown']
      },
      {
        id: 't_countdown_7',
        name: '7_days_countdown',
        TamizhName: '7 நாட்கள்',
        layout: { bgImageSrc: '/poster/7_countdown_new.png', hasCoords: false },
        tags: ['Countdown']
      },
      {
        id: 't_countdown_6',
        name: '6_days_countdown',
        TamizhName: '6 நாட்கள்',
        layout: { bgImageSrc: '/poster/6_countdown_new.png', hasCoords: false },
        tags: ['Countdown']
      },
      {
        id: 't_countdown_5',
        name: '5_days_countdown',
        TamizhName: '5 நாட்கள்',
        layout: { bgImageSrc: '/poster/5_countdown_new.png', hasCoords: false },
        tags: ['Countdown']
      },
      {
        id: 't_countdown_4',
        name: '4_days_countdown',
        TamizhName: '4 நாட்கள்',
        layout: { bgImageSrc: '/poster/4_countdown_new.png', hasCoords: false },
        tags: ['Countdown']
      },
      {
        id: 't_countdown_3',
        name: '3_days_countdown',
        TamizhName: '3 நாட்கள்',
        layout: { bgImageSrc: '/poster/3_countdown_new.png', hasCoords: false },
        tags: ['Countdown']
      },
      {
        id: 't_countdown_2',
        name: '2_days_countdown',
        TamizhName: '2 நாட்கள்',
        layout: { bgImageSrc: '/poster/2_countdown_new.png', hasCoords: false },
        tags: ['Countdown']
      },
      {
        id: 't_countdown_1',
        name: '1_day_countdown',
        TamizhName: '1 நாள்',
        layout: { bgImageSrc: '/poster/1_countdown_new.png', hasCoords: false },
        tags: ['Countdown']
      },
      {
        id: 't1',
        name: 'manifesto_farmers_rice',
        TamizhName: 'விவசாயிகள் - அரிசி',
        layout: { bgImageSrc: '/poster/manifesto_farmers_rice.PNG', hasCoords: false },
        tags: ['Manifesto', 'Farmers']
      },
      {
        id: 't_arunmozhithevan_history',
        name: 'manifesto_farmers_rice',
        TamizhName: 'மக்கள் தோழன்!',
        layout: { bgImageSrc: '/poster/arunthevan_journey.png', hasCoords: false },
        tags: ['Bhuvanagiri', 'Leader']
      },
      {
        id: 't_arunmozhithevan',
        name: 'arunmozhithevan',
        TamizhName: 'வெற்றி வேட்பாளர்',
        layout: { bgImageSrc: '/poster/arunmozhithevan.jpg', hasCoords: false },
        tags: ['Bhuvanagiri']
      },
      {
        id: 't_m_women',
        name: 'manifesto_women',
        TamizhName: 'மகளிர் நலன்',
        layout: { bgImageSrc: '/poster/manifesto_women.PNG', hasCoords: false },
        tags: ['Manifesto', 'Women']
      },
      {
        id: 't_m_edu',
        name: 'manifesto_education',
        TamizhName: 'கல்வி புரட்சி',
        layout: { bgImageSrc: '/poster/manifesto_education.PNG', hasCoords: false },
        tags: ['Manifesto']
      },
      {
        id: 't_m_ins',
        name: 'manifesto_insurance',
        TamizhName: 'காப்பீடு',
        layout: { bgImageSrc: '/poster/manifesto_insurance.PNG', hasCoords: false },
        tags: ['Manifesto']
      },
      {
        id: 't_m_ration',
        name: 'manifesto_ration',
        TamizhName: 'ரேஷன் பொருட்கள்',
        layout: { bgImageSrc: '/poster/manifesto_ration.PNG', hasCoords: false },
        tags: ['Manifesto']
      },
      {
        id: 't_m_farmers',
        name: 'manifesto_farmers',
        TamizhName: 'விவசாயிகள் நலன்',
        layout: { bgImageSrc: '/poster/manifesto_farmers.PNG', hasCoords: false },
        tags: ['Manifesto', 'Farmers']
      },
      {
        id: 't_m_loan',
        name: 'manifesto_farmer_loanpayoff',
        TamizhName: 'கடன் தள்ளுபடி',
        layout: { bgImageSrc: '/poster/manifesto_farmer_loanpayoff.PNG', hasCoords: false },
        tags: ['Manifesto', 'Farmers']
      },
      {
        id: 't2',
        name: 'bhuvanagiri_post',
        TamizhName: 'Bhuvanagiri',
        layout: {
          bgImageSrc: '/poster/bhuvanagiri_poster.heic',
          hasCoords: false,
        },
        tags: ['Leader', 'Bhuvanagiri']
      },
      {
        id: 't3',
        name: 'bhuvanagiri_post_2',
        TamizhName: 'Bhuvanagiri',
        layout: {
          bgImageSrc: '/poster/bhuvanagiri_poster_2.webp',
          hasCoords: false,
        },
        tags: ['Leader', 'Bhuvanagiri']
      },
      {
        id: 't4',
        name: 'history_poster',
        TamizhName: 'ADMK History Repeats',
        layout: {
          bgImageSrc: '/poster/history_poster.jpg',
          hasCoords: false,
        },
        tags: ['Leader']
      },
      {
        id: 't5',
        name: 'era_2026',
        TamizhName: 'ADMK 2026 Era Starts',
        layout: {
          bgImageSrc: '/poster/era_2026.heic',
          hasCoords: false,
        },
        tags: ['Leader']
      },
      {
        id: 't6',
        name: 'cdm',
        TamizhName: 'CDM',
        layout: {
          bgImageSrc: '/poster/image_cdm.webp',
          hasCoords: false,
        },
        tags: ['Leader', 'CDM']
      },
      {
        id: 't8',
        name: 'பிரம்மாண்ட போஸ்டர்',
        TamizhName: 'போஸ்டர்',
        layout: {
          bgImageSrc: '/poster/admk.png',
          hasCoords: true,
          photo: {
            shape: 'circle',
            config: { x: -4, y: 410, scale: 1 },
            behindBg: false
          },
          text: {
            name: { x: 109, y: 559, color: '#000000', align: 'left', baseline: 'top', baseSize: 21 },
            designation: { x: 111, y: 570, color: '#129f33ff', align: 'left', baseline: 'top', baseSize: 16 },
            area: { x: 115, y: 584, color: '#FE0000', align: 'left', baseline: 'top', baseSize: 17 }
          }
        },
        tags: ['Leader', 'Bhuvanagiri']
      }
    ]
  },
];

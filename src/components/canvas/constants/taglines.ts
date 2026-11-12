// Taglines (Main motivational lines with Amma / service theme)
export const taglines = [
    '✊ அம்மா காட்டிய பாதையில்... மக்கள் சேவையே மகேசன் சேவை!',
    '🌟 அம்மாவின் அருள், அதிமுகவின் ஆட்சி!',
    '💪 மக்களால் நான்... மக்களுக்காகவே நான்!',
    '🏵️ அம்மா வழியில்... தமிழகம் முன்னேறும்!',
    '✊ மக்களைக் காப்போம்... தமிழகத்தை மீட்போம்!',
    '🌱 அம்மா காட்டிய ஒளியில்... அதிமுக வெற்றி பெறும்!',
    '❤️ மக்கள் நலனே அதிமுகவின் கொள்கை!',
    '🔥 அம்மாவின் பாதையில்... புரட்சி தமிழரின் எழுச்சி!',
    '🌟 அம்மா இருக்கும் வரை... அதிமுக வாழும்!',
    '🛡️ தமிழகத்தைக் காக்க... அதிமுகவை வலுப்படுத்துவோம்!',
];

// Footer taglines (Short, punchy, often with emojis)
export const footerTaglines = [
    '🌱 அதிமுக வாழ்க! 🌱',
    '💚 அம்மா வழி... அதிமுக வெற்றி! 💚',
    '✊ இரட்டை இலை வெற்றி பெறும்! ✊',
    '🌟 அம்மாவுக்கு வணக்கம்... அதிமுகவுக்கு வாழ்த்து! 🌟',
    '❤️ மக்களுக்காக... அதிமுகவுடன்! ❤️',
    '🔥 அம்மா புகழ்... என்றும் நிலைத்திருக்கும்! 🔥',
    '🏵️ அதிமுக... மக்கள் இதயத்தில்! 🏵️',
    '🌾 அம்மா காட்டிய பாதை... என்றும் ஒளிரும்! 🌾',
    '🕊️ அமைதி, வளர்ச்சி, முன்னேற்றம்... அதிமுகவுடன்! 🕊️',
    '💪 தமிழகம் மீண்டும் அதிமுக ஆட்சி! 💪',
];

// Function to randomly pick one tagline + one footer
export const getRandomTaglineSet = () => {
    const randomTagline = taglines[Math.floor(Math.random() * taglines.length)];
    const randomFooter = footerTaglines[Math.floor(Math.random() * footerTaglines.length)];

    return {
        tagline: randomTagline,
        footer: randomFooter,
    };
};

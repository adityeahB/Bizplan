import React from 'react';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'pt', label: 'Português', flag: '🇵🇹' },
  { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
  { code: 'bn', label: 'বাংলা', flag: '🇧🇩' },
  { code: 'ur', label: 'اردو', flag: '🇵🇰' },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    localStorage.setItem('i18nextLng', code);
  };

  return (
    <div className="flex gap-2 bg-white/90 backdrop-blur-sm p-1 rounded-full shadow-sm">
      {languages.map(lang => (
        <button
          key={lang.code}
          onClick={() => changeLanguage(lang.code)}
          className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm transition ${
            i18n.language === lang.code ? 'bg-primary text-white' : 'hover:bg-gray-100'
          }`}
          title={lang.label}
        >
          <span>{lang.flag}</span>
          <span className="hidden md:inline">{lang.label}</span>
        </button>
      ))}
    </div>
  );
}

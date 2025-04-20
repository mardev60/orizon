import React from 'react';
import { Language } from '../types';
import { Globe } from 'lucide-react';

interface LanguageToggleProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({
  currentLanguage,
  onLanguageChange,
}) => {
  return (
    <div className="fixed top-4 right-4 flex items-center gap-2 bg-dark-gray/30 backdrop-blur-md rounded-full px-4 py-2 border border-ice-blue/30">
      <Globe size={18} className="text-ice-blue" />
      <button
        onClick={() => onLanguageChange('en')}
        className={`px-2 py-1 rounded-md transition-colors ${
          currentLanguage === 'en'
            ? 'bg-neon-blue/20 text-white'
            : 'text-ice-blue hover:bg-dark-gray/40'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => onLanguageChange('fr')}
        className={`px-2 py-1 rounded-md transition-colors ${
          currentLanguage === 'fr'
            ? 'bg-neon-blue/20 text-white'
            : 'text-ice-blue hover:bg-dark-gray/40'
        }`}
      >
        FR
      </button>
    </div>
  );
};

export default LanguageToggle;
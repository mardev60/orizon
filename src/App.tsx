import React, { useState } from 'react';
import TravelForm from './components/TravelForm';
import ParticleBackground from './components/ParticleBackground';
import LanguageToggle from './components/LanguageToggle';
import { motion } from 'framer-motion';
import { Language } from './types';
import { getTranslation } from './utils/translations';

function App() {
  const [language, setLanguage] = useState<Language>('en');

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-blue to-black text-white font-sans overflow-x-hidden">
      <ParticleBackground />
      <LanguageToggle currentLanguage={language} onLanguageChange={setLanguage} />
      
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-ice-blue to-neon-blue">
            {getTranslation('title', language)}
          </h1>
          <p className="text-ice-blue/70 max-w-2xl mx-auto">
            {getTranslation('subtitle', language)}
          </p>
        </motion.div>
        
        <TravelForm language={language} />
        
        <footer className="mt-16 text-center text-ice-blue/50 text-sm">
          <p>{getTranslation('footer', language)}</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
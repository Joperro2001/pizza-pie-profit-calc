
import React from 'react';
import { Pizza, CakeSlice } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export function PageFooter() {
  const { t } = useLanguage();
  
  return (
    <footer className="py-6 bg-red-600/10 text-center text-sm text-red-700 relative overflow-hidden">
      {/* Fun pizza-themed footer decorations */}
      <div className="absolute left-0 top-0 w-full h-1 bg-gradient-to-r from-yellow-200 via-red-400 to-yellow-200"></div>
      
      {/* Pepperoni decorations */}
      <div className="absolute top-4 left-1/4 w-5 h-5 rounded-full bg-red-700 opacity-60 animate-pepperoni-dance" style={{ animationDelay: '0.2s' }}></div>
      <div className="absolute top-8 left-1/3 w-4 h-4 rounded-full bg-red-700 opacity-60 animate-pepperoni-dance" style={{ animationDelay: '0.7s' }}></div>
      <div className="absolute top-6 left-2/3 w-6 h-6 rounded-full bg-red-700 opacity-60 animate-pepperoni-dance" style={{ animationDelay: '1.1s' }}></div>
      <div className="absolute bottom-3 right-1/4 w-5 h-5 rounded-full bg-red-700 opacity-60 animate-pepperoni-dance" style={{ animationDelay: '0.5s' }}></div>
      
      <div className="container relative z-10">
        <p>© {new Date().getFullYear()} {t('appTitle')} | <span className="italic">{t('copyright')}</span></p>
        <div className="flex justify-center gap-2 mt-2">
          <Pizza className="h-4 w-4 animate-pizza-rotate" />
          <CakeSlice className="h-4 w-4 animate-slice-wobble" />
          <Pizza className="h-4 w-4 animate-pizza-rotate" style={{ animationDelay: '0.5s', animationDirection: 'reverse' }} />
        </div>
      </div>
    </footer>
  );
}


import React from 'react';
import { Pizza } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export function PageFooter() {
  const { t } = useLanguage();
  
  return (
    <footer className="py-6 bg-red-600/10 text-center text-sm text-red-700">
      <div className="container">
        <p>© {new Date().getFullYear()} {t('appTitle')} | <span className="italic">{t('copyright')}</span></p>
        <div className="flex justify-center gap-2 mt-2">
          <Pizza className="h-4 w-4" />
          <Pizza className="h-4 w-4" />
          <Pizza className="h-4 w-4" />
        </div>
      </div>
    </footer>
  );
}

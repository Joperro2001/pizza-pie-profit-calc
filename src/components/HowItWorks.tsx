
import React from 'react';
import { DollarSign } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export function HowItWorks() {
  const { t } = useLanguage();
  
  return (
    <div className="mt-6 p-4 bg-white/80 backdrop-blur-sm rounded-lg border border-red-100 shadow-sm text-sm text-gray-700">
      <div className="flex items-center gap-2 mb-2">
        <DollarSign className="h-5 w-5 text-green-500" />
        <p className="font-medium text-base">{t('howItWorks')}</p>
      </div>
      <ul className="list-disc pl-5 space-y-2">
        <li>{t('step1')}</li>
        <li>{t('step2')}</li>
        <li>{t('step3')}</li>
        <li>{t('step4')}</li>
        <li>{t('electricityStep')}</li>
        <li>{t('step5')}</li>
      </ul>
      
      <div className="mt-4 pt-4 border-t border-red-100 text-center">
        <p className="italic text-red-600">{t('quote')}</p>
      </div>
    </div>
  );
}

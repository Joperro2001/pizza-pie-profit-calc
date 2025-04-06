
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Globe } from 'lucide-react';

export function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();

  const handleToggle = (checked: boolean) => {
    setLanguage(checked ? 'it' : 'en');
  };

  return (
    <div className="fixed top-4 right-4 z-50 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-full shadow-sm border border-red-100 flex items-center gap-2">
      <Globe className="h-4 w-4 text-red-500" />
      <div className="flex items-center gap-2">
        <span className={`text-xs font-medium ${language === 'en' ? 'text-red-800' : 'text-gray-500'}`}>EN</span>
        <Switch
          checked={language === 'it'}
          onCheckedChange={handleToggle}
          className="data-[state=checked]:bg-red-500"
        />
        <span className={`text-xs font-medium ${language === 'it' ? 'text-red-800' : 'text-gray-500'}`}>IT</span>
      </div>
    </div>
  );
}

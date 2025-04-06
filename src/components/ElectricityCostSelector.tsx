
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ElectricityCost } from '@/types/pizza';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ElectricityCostSelectorProps {
  selectedCountry: string;
  onCountryChange: (country: string) => void;
  electricityCosts: ElectricityCost[];
}

export function ElectricityCostSelector({ 
  selectedCountry, 
  onCountryChange,
  electricityCosts
}: ElectricityCostSelectorProps) {
  const { t } = useLanguage();
  
  const selectedCostData = electricityCosts.find(cost => cost.country === selectedCountry);

  return (
    <div className="p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-red-100">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="h-5 w-5 text-yellow-500" />
        <h2 className="text-xl font-medium text-red-800">{t('electricityCost')}</h2>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('selectCountry')}
          </label>
          <Select value={selectedCountry} onValueChange={onCountryChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={t('selectCountry')} />
            </SelectTrigger>
            <SelectContent>
              {electricityCosts.map((cost) => (
                <SelectItem key={cost.country} value={cost.country}>
                  {t(cost.country.toLowerCase().replace(' ', ''))}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {selectedCostData && (
          <div className="grid grid-cols-2 gap-3 mt-2">
            <div className="bg-red-50/80 p-3 rounded-md">
              <p className="text-xs uppercase font-medium text-gray-600">{t('electricityPrice')}</p>
              <p className="font-medium">€{selectedCostData.pricePerKWh.toFixed(3)}/kWh</p>
            </div>
            <div className="bg-red-50/80 p-3 rounded-md">
              <p className="text-xs uppercase font-medium text-gray-600">{t('costPerPizza')}</p>
              <p className="font-medium">€{selectedCostData.costPerPizza.toFixed(3)}</p>
            </div>
            <div className="bg-red-50/80 p-3 rounded-md">
              <p className="text-xs uppercase font-medium text-gray-600">{t('preheatCost')}</p>
              <p className="font-medium">€{selectedCostData.preheatCost.toFixed(3)}</p>
            </div>
            <div className="bg-red-50/80 p-3 rounded-md">
              <p className="text-xs uppercase font-medium text-gray-600">{t('totalFirstPizza')}</p>
              <p className="font-medium">€{selectedCostData.totalFirstPizza.toFixed(3)}</p>
            </div>
          </div>
        )}
        
        <div className="text-xs text-gray-500 mt-2 italic">
          {t('electricityNote')}
        </div>
      </div>
    </div>
  );
}


import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Percent } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProfitMarginInputProps {
  profitMargin: number;
  onChange: (value: number) => void;
}

export function ProfitMarginInput({ profitMargin, onChange }: ProfitMarginInputProps) {
  const { t } = useLanguage();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? 0 : parseFloat(e.target.value);
    if (value >= 0 && value <= 500) {
      onChange(value);
    }
  };

  const handleSliderChange = (value: number[]) => {
    onChange(value[0]);
  };

  return (
    <Card className="border border-red-100 shadow-sm bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center gap-2 text-red-800">
          <Percent className="h-5 w-5 text-red-500" />
          {t('profitMargin')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="profit-margin" className="text-gray-700">{t('profitMarginPercentage')}</Label>
              <div className="w-24 relative">
                <Input
                  id="profit-margin"
                  type="number"
                  min="0"
                  max="500"
                  value={profitMargin}
                  onChange={handleInputChange}
                  className="pl-7 border-red-200 focus-visible:ring-red-400"
                />
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500">%</span>
              </div>
            </div>
            <div className="px-1">
              <Slider
                value={[profitMargin]}
                min={0}
                max={500}
                step={5}
                onValueChange={handleSliderChange}
                className="py-4"
              />
            </div>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span className="px-1 py-0.5 bg-gray-100 rounded-md">0%</span>
            <span className="px-1 py-0.5 bg-gray-100 rounded-md">250%</span>
            <span className="px-1 py-0.5 bg-gray-100 rounded-md">500%</span>
          </div>
          
          <div className="pt-3 mt-3 border-t border-red-100 text-sm text-gray-600">
            <p className="flex items-center gap-1">
              <span className="inline-block w-3 h-3 bg-green-500 rounded-full"></span>
              <span>{t('lowerMargins')}</span>
            </p>
            <p className="flex items-center gap-1 mt-1">
              <span className="inline-block w-3 h-3 bg-red-500 rounded-full"></span>
              <span>{t('higherMargins')}</span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

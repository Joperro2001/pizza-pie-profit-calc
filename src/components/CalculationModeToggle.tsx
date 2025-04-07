
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { CircleDollarSign, Calculator } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface CalculationModeToggleProps {
  mode: "setProfit" | "calculateProfit";
  onModeChange: (mode: "setProfit" | "calculateProfit") => void;
}

export function CalculationModeToggle({ mode, onModeChange }: CalculationModeToggleProps) {
  const { t } = useLanguage();

  return (
    <Card className="border border-red-100 shadow-sm bg-white/80 backdrop-blur-sm">
      <CardContent className="p-4">
        <div className="flex flex-col space-y-3">
          <p className="text-sm text-gray-700 font-medium">{t('calculationMode')}:</p>
          <ToggleGroup 
            type="single" 
            value={mode}
            onValueChange={(value) => {
              if (value) onModeChange(value as "setProfit" | "calculateProfit");
            }}
            className="flex flex-col sm:flex-row gap-2 w-full"
          >
            <ToggleGroupItem 
              value="setProfit" 
              aria-label={t('setProfitMode')}
              className="flex items-center gap-2 text-sm data-[state=on]:bg-red-100 data-[state=on]:text-red-800 justify-start flex-1"
            >
              <CircleDollarSign className="h-4 w-4 shrink-0" />
              <span className="text-left">{t('setProfitMode')}</span>
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="calculateProfit" 
              aria-label={t('calculateProfitMode')}
              className="flex items-center gap-2 text-sm data-[state=on]:bg-red-100 data-[state=on]:text-red-800 justify-start flex-1"
            >
              <Calculator className="h-4 w-4 shrink-0" />
              <span className="text-left">{t('calculateProfitMode')}</span>
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </CardContent>
    </Card>
  );
}

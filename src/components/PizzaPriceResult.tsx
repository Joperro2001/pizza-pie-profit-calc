
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PizzaCostCalculation } from "@/types/pizza";
import { CircleDollarSign, CirclePercent, Percent, Pizza, Lightbulb } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface PizzaPriceResultProps {
  calculation: PizzaCostCalculation;
}

export function PizzaPriceResult({ calculation }: PizzaPriceResultProps) {
  const { t } = useLanguage();

  const formatCurrency = (value: number) => {
    return value.toFixed(2);
  };

  // Calculate the total cost for 6 pizzas including electricity
  const totalCostFor6PizzasWithElectricity = calculation.totalCostFor6Pizzas + (calculation.electricityCost * 6);

  return (
    <Card className="border-2 border-red-500/30 bg-gradient-to-br from-red-50 to-orange-50 shadow-md overflow-hidden">
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-red-500/10 rounded-full blur-xl"></div>
      <CardHeader className="pb-2 relative z-10">
        <CardTitle className="text-xl flex items-center gap-2 text-red-800">
          <Pizza className="h-5 w-5 text-red-500" />
          {t('pizzaPriceCalculation')}
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1 bg-white/60 p-3 rounded-md">
              <p className="text-xs text-gray-500 uppercase font-medium">{t('costFor6Pizzas')}</p>
              <p className="text-lg font-semibold flex items-center gap-1 text-gray-800">
                €{formatCurrency(totalCostFor6PizzasWithElectricity)}
              </p>
              {calculation.electricityCost > 0 && (
                <p className="text-xs text-yellow-600 flex items-center gap-1">
                  <Lightbulb className="h-3 w-3" />
                  {t('forSixPizzas')}: €{formatCurrency(calculation.electricityCost * 6)}
                </p>
              )}
            </div>
            <div className="space-y-1 bg-white/60 p-3 rounded-md">
              <p className="text-xs text-gray-500 uppercase font-medium">{t('costPerPizza')}</p>
              <p className="text-lg font-semibold flex items-center gap-1 text-gray-800">
                €{formatCurrency(calculation.totalCostWithElectricity)}
              </p>
              {calculation.electricityCost > 0 && (
                <p className="text-xs text-yellow-600 flex items-center gap-1">
                  <Lightbulb className="h-3 w-3" />
                  €{formatCurrency(calculation.electricityCost)}
                </p>
              )}
            </div>
            
            {calculation.electricityCost > 0 && (
              <div className="space-y-1 bg-white/60 p-3 rounded-md">
                <p className="text-xs text-gray-500 uppercase font-medium">{t('electricityCostLabel')}</p>
                <p className="text-lg font-semibold flex items-center gap-1 text-yellow-600">
                  <Lightbulb className="h-4 w-4" />
                  €{formatCurrency(calculation.electricityCost)}
                </p>
              </div>
            )}
            
            <div className="space-y-1 bg-white/60 p-3 rounded-md">
              <p className="text-xs text-gray-500 uppercase font-medium">{t('profitPerPizza')}</p>
              <p className="text-lg font-semibold flex items-center gap-1 text-green-700">
                €{formatCurrency(calculation.profitPerPizza)}
              </p>
            </div>
            <div className="space-y-1 bg-white/60 p-3 rounded-md">
              <p className="text-xs text-gray-500 uppercase font-medium">{t('profitMargin')}</p>
              <p className="text-lg font-semibold flex items-center gap-1 text-red-600">
                <Percent className="h-4 w-4" />
                {calculation.profitMarginPercentage.toFixed(0)}
              </p>
            </div>
          </div>
          
          <div className="pt-4 border-t border-red-200">
            <div className="flex flex-col items-center">
              <p className="text-sm text-gray-500 uppercase font-medium">{t('recommendedSellingPrice')}</p>
              <div className="mt-2 relative">
                <p className="text-3xl font-bold text-red-600 relative z-10">€{formatCurrency(calculation.sellingPrice)}</p>
                <div className="absolute inset-0 bg-yellow-300/20 blur-sm rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

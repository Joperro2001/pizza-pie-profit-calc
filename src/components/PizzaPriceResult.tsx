import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PizzaCostCalculation } from "@/types/pizza";
import { CircleDollarSign, CirclePercent, Percent, Pizza, Lightbulb, Building } from "lucide-react";
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
    <Card className="border-2 border-red-500/30 bg-gradient-to-br from-red-50 to-orange-50 shadow-md overflow-hidden relative">
      {/* Pizza slice decoration in corner */}
      <div className="absolute -right-10 -top-10 w-20 h-20 bg-yellow-200 rounded-tl-none rounded-tr-full rounded-br-none rounded-bl-full rotate-45 border-2 border-yellow-400"></div>
      <div className="absolute -right-5 -top-5 w-10 h-10 rounded-full bg-red-500 opacity-70"></div>
      
      {/* Cheese drips */}
      <div className="absolute right-1/4 top-0 w-3 h-8 bg-yellow-300 opacity-40 origin-top animate-cheese-stretch" style={{ animationDelay: '0.9s' }}></div>
      <div className="absolute right-1/3 top-0 w-2 h-5 bg-yellow-300 opacity-40 origin-top animate-cheese-stretch" style={{ animationDelay: '0.4s' }}></div>
      
      <CardHeader className="pb-2 relative z-10">
        <CardTitle className="text-xl flex items-center gap-2 text-red-800">
          <Pizza className="h-5 w-5 text-red-500 animate-slice-wobble" />
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
                  {t('forSixPizzas')} €{formatCurrency(calculation.electricityCost * 6)}
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
            
            {calculation.businessCostsPerPizza > 0 && (
              <div className="space-y-1 bg-white/60 p-3 rounded-md">
                <p className="text-xs text-gray-500 uppercase font-medium">{t('businessCostsPerPizza')}</p>
                <p className="text-lg font-semibold flex items-center gap-1 text-blue-600">
                  <Building className="h-4 w-4" />
                  €{formatCurrency(calculation.businessCostsPerPizza)}
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
                {/* Small pizza slices decoration */}
                <div className="absolute -right-12 top-0 w-8 h-8 bg-yellow-200 rounded-tl-none rounded-tr-full rounded-br-none rounded-bl-full rotate-45 opacity-80 animate-slice-wobble"></div>
                <div className="absolute -left-12 top-0 w-8 h-8 bg-yellow-200 rounded-tl-none rounded-tr-full rounded-br-none rounded-bl-full -rotate-45 opacity-80 animate-slice-wobble" style={{ animationDelay: '0.5s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

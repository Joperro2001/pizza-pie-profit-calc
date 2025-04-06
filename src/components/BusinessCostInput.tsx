
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Building, Users } from "lucide-react";
import { BusinessCost } from "@/types/pizza";
import { useLanguage } from "@/contexts/LanguageContext";

interface BusinessCostInputProps {
  businessCosts: BusinessCost[];
  onCostChange: (costId: string, updatedCost: BusinessCost) => void;
  pizzasPerMonth: number;
  onPizzasPerMonthChange: (value: number) => void;
}

export function BusinessCostInput({ 
  businessCosts, 
  onCostChange, 
  pizzasPerMonth,
  onPizzasPerMonthChange
}: BusinessCostInputProps) {
  const { t } = useLanguage();

  const handleAmountChange = (costId: string, amount: number) => {
    const cost = businessCosts.find(c => c.id === costId);
    if (cost) {
      onCostChange(costId, {
        ...cost,
        monthlyCost: amount
      });
    }
  };

  const handleToggleChange = (costId: string, checked: boolean) => {
    const cost = businessCosts.find(c => c.id === costId);
    if (cost) {
      onCostChange(costId, {
        ...cost,
        enabled: checked
      });
    }
  };

  const handlePizzasPerMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    if (value >= 0) {
      onPizzasPerMonthChange(value);
    }
  };

  return (
    <Card className="border border-red-100 shadow-sm bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center gap-2 text-red-800">
          <Building className="h-5 w-5 text-red-500" />
          {t('businessCosts')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="mb-4">
            <Label htmlFor="pizzas-per-month" className="text-sm font-medium mb-1 block">
              {t('pizzasPerMonth')}
            </Label>
            <Input
              id="pizzas-per-month"
              type="number"
              min="0"
              value={pizzasPerMonth}
              onChange={handlePizzasPerMonthChange}
              className="border-red-200 focus-visible:ring-red-400"
            />
            <p className="text-xs text-gray-500 mt-1">
              {t('pizzasPerMonthHelp')}
            </p>
          </div>

          <div className="space-y-3">
            {businessCosts.map((cost) => (
              <div key={cost.id} className="flex items-center justify-between p-2 rounded-md bg-white border border-gray-100">
                <div className="flex items-center">
                  <Switch
                    id={`enable-${cost.id}`}
                    checked={cost.enabled}
                    onCheckedChange={(checked) => handleToggleChange(cost.id, checked)}
                    className="mr-3"
                  />
                  <Label htmlFor={`enable-${cost.id}`} className={`font-medium ${!cost.enabled ? 'text-gray-500' : 'text-gray-700'}`}>
                    {cost.name}
                  </Label>
                </div>
                <div className="w-28 relative">
                  <Input
                    id={`cost-${cost.id}`}
                    type="number"
                    min="0"
                    disabled={!cost.enabled}
                    value={cost.monthlyCost}
                    onChange={(e) => handleAmountChange(cost.id, parseFloat(e.target.value) || 0)}
                    className="pl-7 border-red-200 focus-visible:ring-red-400"
                  />
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500">€</span>
                </div>
              </div>
            ))}
          </div>
          
          {businessCosts.some(cost => cost.enabled) && (
            <p className="text-sm text-red-600 mt-2 pt-2 border-t border-red-100">
              {t('businessCostsImpact')}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

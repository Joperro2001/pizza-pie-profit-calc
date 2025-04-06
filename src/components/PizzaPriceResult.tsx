
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PizzaCostCalculation } from "@/types/pizza";
import { CircleDollarSign, CirclePercent } from "lucide-react";

interface PizzaPriceResultProps {
  calculation: PizzaCostCalculation;
}

export function PizzaPriceResult({ calculation }: PizzaPriceResultProps) {
  const formatCurrency = (value: number) => {
    return value.toFixed(2);
  };

  return (
    <Card className="border-2 border-primary/40 bg-primary/5">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center gap-2">
          <CircleDollarSign className="h-5 w-5" />
          Final Price Calculation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Cost for 6 Pizzas</p>
              <p className="text-lg font-semibold">€{formatCurrency(calculation.totalCostFor6Pizzas)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Cost per Pizza</p>
              <p className="text-lg font-semibold">€{formatCurrency(calculation.costPerPizza)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Profit per Pizza</p>
              <p className="text-lg font-semibold">€{formatCurrency(calculation.profitPerPizza)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Profit Margin</p>
              <p className="text-lg font-semibold flex items-center gap-1">
                <CirclePercent className="h-4 w-4" />
                {calculation.profitMarginPercentage.toFixed(0)}%
              </p>
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <div className="flex justify-between items-center">
              <p className="text-lg font-medium">Recommended Selling Price</p>
              <p className="text-2xl font-bold text-primary">€{formatCurrency(calculation.sellingPrice)}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Ingredient } from "@/types/pizza";
import { useLanguage } from "@/contexts/LanguageContext";

interface IngredientInputProps {
  ingredient: Ingredient;
  onChange: (updatedIngredient: Ingredient) => void;
  showPriceInput?: boolean;
}

export function IngredientInput({ ingredient, onChange, showPriceInput = true }: IngredientInputProps) {
  const { t } = useLanguage();

  const handleCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const numericValue = newValue === "" ? 0 : parseFloat(newValue);
    
    onChange({
      ...ingredient,
      costPerUnit: numericValue,
    });
  };

  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor={`cost-${ingredient.id}`} className="text-sm font-medium">
        {ingredient.name} {showPriceInput ? `(€/${ingredient.unit})` : ''}
      </Label>
      {showPriceInput ? (
        <div className="relative">
          <Input
            id={`cost-${ingredient.id}`}
            type="number"
            min="0"
            step="0.01"
            value={ingredient.costPerUnit || ""}
            onChange={handleCostChange}
            className="pl-7"
          />
          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
        </div>
      ) : (
        <div className="text-sm text-gray-600 italic">
          {t('forSixPizzas')} {ingredient.amountFor6Pizzas} {ingredient.unit}
        </div>
      )}
      {showPriceInput && (
        <p className="text-xs text-muted-foreground mt-1">
          {t('forSixPizzas')} {ingredient.amountFor6Pizzas} {ingredient.unit}
        </p>
      )}
    </div>
  );
}

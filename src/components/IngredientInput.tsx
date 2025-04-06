
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Ingredient } from "@/types/pizza";

interface IngredientInputProps {
  ingredient: Ingredient;
  onChange: (updatedIngredient: Ingredient) => void;
}

export function IngredientInput({ ingredient, onChange }: IngredientInputProps) {
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
        {ingredient.name} (€/{ingredient.unit})
      </Label>
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
      <p className="text-xs text-muted-foreground mt-1">
        For 6 pizzas: {ingredient.amountFor6Pizzas} {ingredient.unit}
      </p>
    </div>
  );
}

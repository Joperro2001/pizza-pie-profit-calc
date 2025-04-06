
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IngredientInput } from "./IngredientInput";
import { Ingredient, IngredientCategory as IngredientCategoryType } from "@/types/pizza";

interface IngredientCategoryProps {
  category: IngredientCategoryType;
  onIngredientChange: (categoryId: string, ingredientId: string, updatedIngredient: Ingredient) => void;
}

export function IngredientCategory({ category, onIngredientChange }: IngredientCategoryProps) {
  const handleIngredientChange = (updatedIngredient: Ingredient) => {
    onIngredientChange(category.id, updatedIngredient.id, updatedIngredient);
  };

  const getCategoryIcon = () => {
    if (category.id === "dough") {
      return (
        <div className="h-5 w-5 rounded-full bg-yellow-100 flex items-center justify-center">
          <span className="text-xs text-yellow-800">🍞</span>
        </div>
      );
    } else {
      return (
        <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center">
          <span className="text-xs text-red-800">🧀</span>
        </div>
      );
    }
  };

  return (
    <Card className={`border ${category.id === "dough" ? "border-yellow-200" : "border-red-200"} bg-white`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          {getCategoryIcon()}
          {category.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {category.ingredients.map((ingredient) => (
            <IngredientInput
              key={ingredient.id}
              ingredient={ingredient}
              onChange={handleIngredientChange}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

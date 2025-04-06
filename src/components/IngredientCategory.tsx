
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

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{category.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

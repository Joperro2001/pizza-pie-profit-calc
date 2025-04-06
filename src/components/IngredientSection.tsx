
import React from 'react';
import { Utensils } from 'lucide-react';
import { IngredientCategory as IngredientCategoryComponent } from "@/components/IngredientCategory";
import { Ingredient, IngredientCategory } from "@/types/pizza";
import { useLanguage } from '@/contexts/LanguageContext';

interface IngredientSectionProps {
  categories: IngredientCategory[];
  onIngredientChange: (categoryId: string, ingredientId: string, updatedIngredient: Ingredient) => void;
}

export function IngredientSection({ categories, onIngredientChange }: IngredientSectionProps) {
  const { t } = useLanguage();
  
  return (
    <div className="p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-red-100">
      <div className="flex items-center mb-4 gap-2">
        <Utensils className="h-5 w-5 text-red-500" />
        <h2 className="text-xl font-medium text-red-800">{t('ingredients')}</h2>
      </div>
      <div className="space-y-6">
        {categories.map(category => (
          <IngredientCategoryComponent
            key={category.id}
            category={category}
            onIngredientChange={onIngredientChange}
          />
        ))}
      </div>
    </div>
  );
}

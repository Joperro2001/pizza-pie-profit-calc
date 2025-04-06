
import { useState, useEffect } from "react";
import { Ingredient, IngredientCategory } from "@/types/pizza";
import { useLanguage } from "@/contexts/LanguageContext";

export function useIngredientCategories() {
  const { t } = useLanguage();
  
  // Initial state for ingredient categories
  const [categories, setCategories] = useState<IngredientCategory[]>([
    {
      id: "dough",
      name: t("doughIngredients"),
      ingredients: [
        { id: "flour", name: t("flour"), costPerUnit: 1.5, unit: "kg", amountFor6Pizzas: 1 },
        { id: "water", name: t("water"), costPerUnit: 0.1, unit: "L", amountFor6Pizzas: 0.6 },
        { id: "yeast", name: t("yeast"), costPerUnit: 15, unit: "kg", amountFor6Pizzas: 0.02 },
        { id: "salt", name: t("salt"), costPerUnit: 1.2, unit: "kg", amountFor6Pizzas: 0.02 },
        { id: "olive-oil", name: t("oliveOil"), costPerUnit: 10, unit: "L", amountFor6Pizzas: 0.03 },
      ]
    },
    {
      id: "condiments",
      name: t("condiments"),
      ingredients: [
        { id: "tomato-sauce", name: t("tomatoSauce"), costPerUnit: 3.5, unit: "kg", amountFor6Pizzas: 0.5 },
        { id: "mozzarella", name: t("mozzarella"), costPerUnit: 8, unit: "kg", amountFor6Pizzas: 0.6 },
        { id: "mushrooms", name: t("mushrooms"), costPerUnit: 0, unit: "kg", amountFor6Pizzas: 0.3 },
        { id: "anchovies", name: t("anchovies"), costPerUnit: 0, unit: "kg", amountFor6Pizzas: 0.2 },
        { id: "prosciutto", name: t("prosciutto"), costPerUnit: 0, unit: "kg", amountFor6Pizzas: 0.25 },
        { id: "salame", name: t("salame"), costPerUnit: 0, unit: "kg", amountFor6Pizzas: 0.25 },
        { id: "zucchini", name: t("zucchini"), costPerUnit: 0, unit: "kg", amountFor6Pizzas: 0.3 },
      ]
    }
  ]);

  // Update category names when language changes
  useEffect(() => {
    setCategories(prevCategories => 
      prevCategories.map(category => ({
        ...category,
        name: t(category.id === "dough" ? "doughIngredients" : "condiments"),
        ingredients: category.ingredients.map(ingredient => ({
          ...ingredient,
          name: t(ingredient.id.replace(/-/g, ''))
        }))
      }))
    );
  }, [t]);

  // Handle ingredient value change
  const handleIngredientChange = (categoryId: string, ingredientId: string, updatedIngredient: Ingredient) => {
    setCategories(prevCategories => {
      return prevCategories.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            ingredients: category.ingredients.map(ingredient => 
              ingredient.id === ingredientId ? updatedIngredient : ingredient
            )
          };
        }
        return category;
      });
    });
  };

  return { categories, handleIngredientChange };
}

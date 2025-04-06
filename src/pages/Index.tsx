
import React, { useState, useEffect } from "react";
import { IngredientCategory as IngredientCategoryComponent } from "@/components/IngredientCategory";
import { ProfitMarginInput } from "@/components/ProfitMarginInput";
import { PizzaPriceResult } from "@/components/PizzaPriceResult";
import { Ingredient, IngredientCategory, PizzaCostCalculation } from "@/types/pizza";
import { Pizza, Utensils, DollarSign } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const { toast } = useToast();
  
  // Initial state for ingredient categories
  const [categories, setCategories] = useState<IngredientCategory[]>([
    {
      id: "dough",
      name: "Dough Ingredients",
      ingredients: [
        { id: "flour", name: "Flour", costPerUnit: 1.5, unit: "kg", amountFor6Pizzas: 1 },
        { id: "water", name: "Water", costPerUnit: 0.1, unit: "L", amountFor6Pizzas: 0.6 },
        { id: "yeast", name: "Yeast", costPerUnit: 15, unit: "kg", amountFor6Pizzas: 0.02 },
        { id: "salt", name: "Salt", costPerUnit: 1.2, unit: "kg", amountFor6Pizzas: 0.02 },
        { id: "olive-oil", name: "Olive Oil", costPerUnit: 10, unit: "L", amountFor6Pizzas: 0.03 },
      ]
    },
    {
      id: "condiments",
      name: "Condiments",
      ingredients: [
        { id: "tomato-sauce", name: "Tomato Sauce", costPerUnit: 3.5, unit: "kg", amountFor6Pizzas: 0.5 },
        { id: "mozzarella", name: "Mozzarella", costPerUnit: 8, unit: "kg", amountFor6Pizzas: 0.6 },
        { id: "mushrooms", name: "Mushrooms", costPerUnit: 0, unit: "kg", amountFor6Pizzas: 0.3 },
        { id: "anchovies", name: "Anchovies", costPerUnit: 0, unit: "kg", amountFor6Pizzas: 0.2 },
        { id: "prosciutto", name: "Prosciutto", costPerUnit: 0, unit: "kg", amountFor6Pizzas: 0.25 },
        { id: "salame", name: "Salame", costPerUnit: 0, unit: "kg", amountFor6Pizzas: 0.25 },
        { id: "zucchini", name: "Zucchini", costPerUnit: 0, unit: "kg", amountFor6Pizzas: 0.3 },
      ]
    }
  ]);

  // Profit margin state
  const [profitMargin, setProfitMargin] = useState<number>(50);
  
  // Calculation result state
  const [calculation, setCalculation] = useState<PizzaCostCalculation>({
    totalCostFor6Pizzas: 0,
    costPerPizza: 0,
    sellingPrice: 0,
    profitPerPizza: 0,
    profitMarginPercentage: 0,
  });

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

  // Handle profit margin change
  const handleProfitMarginChange = (value: number) => {
    setProfitMargin(value);
  };

  // Calculate pizza costs and selling price
  useEffect(() => {
    // Get all ingredients
    const allIngredients = categories.flatMap(category => category.ingredients);
    
    // Calculate total cost for 6 pizzas - only include ingredients with cost > 0
    const totalCostFor6Pizzas = allIngredients.reduce((sum, ingredient) => {
      return sum + (ingredient.costPerUnit > 0 ? ingredient.costPerUnit * ingredient.amountFor6Pizzas : 0);
    }, 0);
    
    // Calculate cost per pizza
    const costPerPizza = totalCostFor6Pizzas / 6;
    
    // Calculate selling price based on profit margin
    // For ALL profit margin values:
    // If margin is 20%, then selling price = cost / (1 - 0.2) = cost / 0.8
    // If margin is 50%, then selling price = cost / (1 - 0.5) = cost / 0.5
    // If margin is 150%, then selling price = cost / (1 - 0.6) = cost * 2.5
    const marginDecimal = profitMargin / 100;
    const sellingPrice = costPerPizza * (1 + marginDecimal);
    
    // Calculate profit amount
    const profitPerPizza = sellingPrice - costPerPizza;
    
    // Update calculation state
    setCalculation({
      totalCostFor6Pizzas,
      costPerPizza,
      sellingPrice,
      profitPerPizza,
      profitMarginPercentage: profitMargin,
    });
  }, [categories, profitMargin]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-red-50">
      <header className="bg-gradient-to-r from-red-600 to-red-500 text-white py-8 mb-8 shadow-md">
        <div className="container">
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="relative">
              <Pizza className="h-12 w-12 animate-pizza-rotate text-yellow-100" />
              <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400 to-red-400 opacity-20 rounded-full blur-sm"></div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold font-serif tracking-tight">Pizza Profit Calculator</h1>
          </div>
          <p className="text-red-100 text-center md:text-left mt-2 max-w-2xl">
            Calculate your authentic pizza selling price based on ingredient costs and maximize your profit margin
          </p>
        </div>
      </header>
      
      <main className="container mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-red-100">
              <div className="flex items-center mb-4 gap-2">
                <Utensils className="h-5 w-5 text-red-500" />
                <h2 className="text-xl font-medium text-red-800">Ingredients</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categories.map(category => (
                  <IngredientCategoryComponent
                    key={category.id}
                    category={category}
                    onIngredientChange={handleIngredientChange}
                  />
                ))}
              </div>
            </div>
            
            <ProfitMarginInput
              profitMargin={profitMargin}
              onChange={handleProfitMarginChange}
            />
          </div>
          
          <div className="sticky top-4 h-fit lg:col-span-1">
            <PizzaPriceResult calculation={calculation} />
            
            <div className="mt-6 p-4 bg-white/80 backdrop-blur-sm rounded-lg border border-red-100 shadow-sm text-sm text-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-5 w-5 text-green-500" />
                <p className="font-medium text-base">How it works:</p>
              </div>
              <ul className="list-disc pl-5 space-y-2">
                <li>Enter the cost per unit for each ingredient</li>
                <li>Set cost to 0 for ingredients you're not using</li>
                <li>The calculator uses a standard recipe for 6 pizzas</li>
                <li>Adjust the profit margin using the slider</li>
                <li>See your recommended selling price!</li>
              </ul>
              
              <div className="mt-4 pt-4 border-t border-red-100 text-center">
                <p className="italic text-red-600">"The secret to success is not the sauce, it's the profit margin!"</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="py-6 bg-red-600/10 text-center text-sm text-red-700">
        <div className="container">
          <p>© {new Date().getFullYear()} Pizza Profit Calculator | <span className="italic">Making pizza profitable, one slice at a time</span></p>
          <div className="flex justify-center gap-2 mt-2">
            <Pizza className="h-4 w-4" />
            <Pizza className="h-4 w-4" />
            <Pizza className="h-4 w-4" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;


import React, { useState, useEffect } from "react";
import { IngredientCategory as IngredientCategoryComponent } from "@/components/IngredientCategory";
import { ProfitMarginInput } from "@/components/ProfitMarginInput";
import { PizzaPriceResult } from "@/components/PizzaPriceResult";
import { Ingredient, IngredientCategory, PizzaCostCalculation } from "@/types/pizza";
import { Pizza } from "lucide-react";
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
    
    // Calculate total cost for 6 pizzas
    const totalCostFor6Pizzas = allIngredients.reduce((sum, ingredient) => {
      return sum + (ingredient.costPerUnit * ingredient.amountFor6Pizzas);
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
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30 pb-12">
      <header className="bg-primary text-primary-foreground py-6 mb-8 shadow-md">
        <div className="container">
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <Pizza className="h-8 w-8 animate-pizza-rotate" />
            <h1 className="text-2xl md:text-3xl font-bold">Pizza Profit Calculator</h1>
          </div>
          <p className="text-primary-foreground/80 text-center md:text-left mt-2">
            Calculate your pizza selling price based on ingredient costs and desired profit margin
          </p>
        </div>
      </header>
      
      <main className="container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categories.map(category => (
                <IngredientCategoryComponent
                  key={category.id}
                  category={category}
                  onIngredientChange={handleIngredientChange}
                />
              ))}
            </div>
            
            <ProfitMarginInput
              profitMargin={profitMargin}
              onChange={handleProfitMarginChange}
            />
          </div>
          
          <div className="sticky top-4 h-fit lg:col-span-1">
            <PizzaPriceResult calculation={calculation} />
            
            <div className="mt-6 text-sm text-muted-foreground">
              <p className="mb-2">💡 <strong>How it works:</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Enter the cost per unit for each ingredient</li>
                <li>The calculator uses a standard recipe for 6 pizzas</li>
                <li>Adjust the profit margin using the slider</li>
                <li>See your recommended selling price!</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="mt-16 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Pizza Profit Calculator</p>
      </footer>
    </div>
  );
};

export default Index;

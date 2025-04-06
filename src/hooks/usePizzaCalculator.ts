
import { useState, useEffect } from "react";
import { Ingredient, IngredientCategory, PizzaCostCalculation, ElectricityCost } from "@/types/pizza";

export function usePizzaCalculator(
  categories: IngredientCategory[],
  profitMargin: number,
  selectedCountry: string,
  electricityCosts: ElectricityCost[],
  businessCostsPerPizza: number = 0
) {
  const [calculation, setCalculation] = useState<PizzaCostCalculation>({
    totalCostFor6Pizzas: 0,
    costPerPizza: 0,
    sellingPrice: 0,
    profitPerPizza: 0,
    profitMarginPercentage: 0,
    electricityCost: 0,
    totalCostWithElectricity: 0,
    businessCostsPerPizza: 0,
    totalCostWithBusinessCosts: 0
  });

  useEffect(() => {
    // Get all ingredients
    const allIngredients = categories.flatMap(category => category.ingredients);
    
    // Calculate total cost for 6 pizzas - only include ingredients with cost > 0
    const totalCostFor6Pizzas = allIngredients.reduce((sum, ingredient) => {
      return sum + (ingredient.costPerUnit > 0 ? ingredient.costPerUnit * ingredient.amountFor6Pizzas : 0);
    }, 0);
    
    // Calculate cost per pizza
    const costPerPizza = totalCostFor6Pizzas / 6;
    
    // Get electricity cost if country is selected
    let electricityCost = 0;
    if (selectedCountry) {
      const countryData = electricityCosts.find(cost => cost.country === selectedCountry);
      if (countryData) {
        // We'll calculate for 6 pizzas: first pizza plus 5 additional
        electricityCost = (countryData.totalFirstPizza + (5 * countryData.additionalPizzaCost)) / 6;
      }
    }
    
    // Calculate total cost with electricity
    const totalCostWithElectricity = costPerPizza + electricityCost;
    
    // Add business costs
    const totalCostWithBusinessCosts = totalCostWithElectricity + businessCostsPerPizza;
    
    // Calculate selling price based on profit margin and total cost with all expenses
    const marginDecimal = profitMargin / 100;
    const sellingPrice = totalCostWithBusinessCosts * (1 + marginDecimal);
    
    // Calculate profit amount
    const profitPerPizza = sellingPrice - totalCostWithBusinessCosts;
    
    // Update calculation state
    setCalculation({
      totalCostFor6Pizzas,
      costPerPizza,
      sellingPrice,
      profitPerPizza,
      profitMarginPercentage: profitMargin,
      electricityCost,
      totalCostWithElectricity,
      businessCostsPerPizza,
      totalCostWithBusinessCosts
    });
  }, [categories, profitMargin, selectedCountry, electricityCosts, businessCostsPerPizza]);

  return calculation;
}

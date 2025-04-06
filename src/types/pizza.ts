
export interface Ingredient {
  id: string;
  name: string;
  costPerUnit: number;
  unit: string;
  amountFor6Pizzas: number;
}

export interface IngredientCategory {
  id: string;
  name: string;
  ingredients: Ingredient[];
}

export interface PizzaCostCalculation {
  totalCostFor6Pizzas: number;
  costPerPizza: number;
  sellingPrice: number;
  profitPerPizza: number;
  profitMarginPercentage: number;
}

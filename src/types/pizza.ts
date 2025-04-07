
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

export interface ElectricityCost {
  country: string;
  pricePerKWh: number;
  preheatCost: number;
  costPerPizza: number;
  totalFirstPizza: number;
  additionalPizzaCost: number;
}

export interface BusinessCost {
  id: string;
  name: string;
  monthlyCost: number;
  enabled: boolean;
}

export interface PizzaCostCalculation {
  totalCostFor6Pizzas: number;
  costPerPizza: number;
  sellingPrice: number;
  profitPerPizza: number;
  profitMarginPercentage: number;
  electricityCost: number;
  totalCostWithElectricity: number;
  businessCostsPerPizza: number;
  totalCostWithBusinessCosts: number;
}

export type CalculationMode = "setProfit" | "calculateProfit";

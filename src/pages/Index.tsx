
import React, { useState } from "react";
import { LanguageToggle } from "@/components/LanguageToggle";
import { ProfitMarginInput } from "@/components/ProfitMarginInput";
import { PizzaPriceResult } from "@/components/PizzaPriceResult";
import { ElectricityCostSelector } from "@/components/ElectricityCostSelector";
import { PageHeader } from "@/components/PageHeader";
import { PageFooter } from "@/components/PageFooter";
import { HowItWorks } from "@/components/HowItWorks";
import { IngredientSection } from "@/components/IngredientSection";
import { BusinessCostInput } from "@/components/BusinessCostInput";
import { useIngredientCategories } from "@/hooks/useIngredientCategories";
import { useElectricityCosts } from "@/hooks/useElectricityCosts";
import { useBusinessCosts } from "@/hooks/useBusinessCosts";
import { usePizzaCalculator } from "@/hooks/usePizzaCalculator";
import { CalculationModeToggle } from "@/components/CalculationModeToggle";
import { SellingPriceInput } from "@/components/SellingPriceInput";

const Index = () => {
  // Calculation mode state
  const [calculationMode, setCalculationMode] = useState<"setProfit" | "calculateProfit">("setProfit");
  
  // Profit margin state (for setProfit mode)
  const [profitMargin, setProfitMargin] = useState<number>(50);
  
  // Selling price state (for calculateProfit mode)
  const [sellingPrice, setSellingPrice] = useState<number>(10);
  
  // Custom hooks for state management
  const { categories, handleIngredientChange } = useIngredientCategories();
  const { electricityCosts, selectedCountry, handleCountryChange } = useElectricityCosts();
  const { 
    businessCosts, 
    handleCostChange, 
    calculateBusinessCostsPerPizza,
    pizzasPerMonth,
    setPizzasPerMonth
  } = useBusinessCosts();
  
  // Calculate business costs per pizza
  const businessCostsPerPizza = calculateBusinessCostsPerPizza();
  
  // Calculate the pizza price and costs
  const calculation = usePizzaCalculator(
    categories,
    profitMargin,
    selectedCountry,
    electricityCosts,
    businessCostsPerPizza,
    calculationMode,
    sellingPrice
  );

  // Handle profit margin change
  const handleProfitMarginChange = (value: number) => {
    setProfitMargin(value);
  };

  // Handle selling price change
  const handleSellingPriceChange = (value: number) => {
    setSellingPrice(value);
  };

  // Handle mode change
  const handleModeChange = (mode: "setProfit" | "calculateProfit") => {
    setCalculationMode(mode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-red-50">
      <LanguageToggle />
      <PageHeader />
      
      <main className="container mb-16">
        <CalculationModeToggle 
          mode={calculationMode} 
          onModeChange={handleModeChange} 
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          <div className="lg:col-span-2 space-y-8">
            {/* Show selling price input at the top when in calculateProfit mode */}
            {calculationMode === "calculateProfit" && (
              <SellingPriceInput
                sellingPrice={sellingPrice}
                onChange={handleSellingPriceChange}
              />
            )}
            
            <IngredientSection 
              categories={categories}
              onIngredientChange={handleIngredientChange}
            />
            
            <ElectricityCostSelector 
              selectedCountry={selectedCountry}
              onCountryChange={handleCountryChange}
              electricityCosts={electricityCosts}
            />
            
            <BusinessCostInput
              businessCosts={businessCosts}
              onCostChange={handleCostChange}
              pizzasPerMonth={pizzasPerMonth}
              onPizzasPerMonthChange={setPizzasPerMonth}
            />
            
            {/* Only show profit margin input in setProfit mode */}
            {calculationMode === "setProfit" && (
              <ProfitMarginInput
                profitMargin={profitMargin}
                onChange={handleProfitMarginChange}
              />
            )}
          </div>
          
          <div className="sticky top-4 h-fit lg:col-span-1">
            <PizzaPriceResult 
              calculation={calculation} 
              mode={calculationMode}
            />
            <HowItWorks />
          </div>
        </div>
      </main>
      
      <PageFooter />
    </div>
  );
};

export default Index;


import React, { useState } from "react";
import { LanguageToggle } from "@/components/LanguageToggle";
import { ProfitMarginInput } from "@/components/ProfitMarginInput";
import { PizzaPriceResult } from "@/components/PizzaPriceResult";
import { ElectricityCostSelector } from "@/components/ElectricityCostSelector";
import { PageHeader } from "@/components/PageHeader";
import { PageFooter } from "@/components/PageFooter";
import { HowItWorks } from "@/components/HowItWorks";
import { IngredientSection } from "@/components/IngredientSection";
import { useIngredientCategories } from "@/hooks/useIngredientCategories";
import { useElectricityCosts } from "@/hooks/useElectricityCosts";
import { usePizzaCalculator } from "@/hooks/usePizzaCalculator";

const Index = () => {
  // Profit margin state
  const [profitMargin, setProfitMargin] = useState<number>(50);
  
  // Custom hooks for state management
  const { categories, handleIngredientChange } = useIngredientCategories();
  const { electricityCosts, selectedCountry, handleCountryChange } = useElectricityCosts();
  
  // Calculate the pizza price and costs
  const calculation = usePizzaCalculator(
    categories,
    profitMargin,
    selectedCountry,
    electricityCosts
  );

  // Handle profit margin change
  const handleProfitMarginChange = (value: number) => {
    setProfitMargin(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-red-50">
      <LanguageToggle />
      <PageHeader />
      
      <main className="container mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <IngredientSection 
              categories={categories}
              onIngredientChange={handleIngredientChange}
            />
            
            <ElectricityCostSelector 
              selectedCountry={selectedCountry}
              onCountryChange={handleCountryChange}
              electricityCosts={electricityCosts}
            />
            
            <ProfitMarginInput
              profitMargin={profitMargin}
              onChange={handleProfitMarginChange}
            />
          </div>
          
          <div className="sticky top-4 h-fit lg:col-span-1">
            <PizzaPriceResult calculation={calculation} />
            <HowItWorks />
          </div>
        </div>
      </main>
      
      <PageFooter />
    </div>
  );
};

export default Index;

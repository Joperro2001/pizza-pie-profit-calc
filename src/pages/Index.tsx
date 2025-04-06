
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

const Index = () => {
  // Profit margin state
  const [profitMargin, setProfitMargin] = useState<number>(50);
  
  const { categories, handleIngredientChange } = useIngredientCategories();
  const { electricityCosts, selectedCountry, handleCountryChange } = useElectricityCosts();
  const { 
    businessCosts, 
    handleCostChange, 
    calculateBusinessCostsPerPizza,
    pizzasPerMonth,
    setPizzasPerMonth
  } = useBusinessCosts();
  
  const businessCostsPerPizza = calculateBusinessCostsPerPizza();
  
  const calculation = usePizzaCalculator(
    categories,
    profitMargin,
    selectedCountry,
    electricityCosts,
    businessCostsPerPizza
  );

  const handleProfitMarginChange = (value: number) => {
    setProfitMargin(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-red-50 relative">
      {/* Decorative pepperoni circles in background */}
      <div className="absolute top-20 left-10 w-16 h-16 rounded-full bg-red-600 opacity-10 animate-pepperoni-dance" style={{ animationDelay: '1.3s' }}></div>
      <div className="absolute top-40 right-20 w-20 h-20 rounded-full bg-red-600 opacity-10 animate-pepperoni-dance" style={{ animationDelay: '0.7s' }}></div>
      <div className="absolute bottom-60 left-1/4 w-24 h-24 rounded-full bg-red-600 opacity-10 animate-pepperoni-dance" style={{ animationDelay: '2.1s' }}></div>
      <div className="absolute bottom-20 right-1/3 w-14 h-14 rounded-full bg-red-600 opacity-10 animate-pepperoni-dance" style={{ animationDelay: '1.5s' }}></div>
      
      {/* Pizza slices in background */}
      <div className="absolute top-60 right-10 w-28 h-28 bg-yellow-200/20 rounded-tl-none rounded-tr-full rounded-br-none rounded-bl-full rotate-45 animate-slice-wobble"></div>
      <div className="absolute bottom-40 left-10 w-32 h-32 bg-yellow-200/20 rounded-tl-none rounded-tr-full rounded-br-none rounded-bl-full -rotate-12 animate-slice-wobble" style={{ animationDelay: '1.2s' }}></div>
      
      <LanguageToggle />
      <PageHeader />
      
      <main className="container mb-16 relative z-10">
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
            
            <BusinessCostInput
              businessCosts={businessCosts}
              onCostChange={handleCostChange}
              pizzasPerMonth={pizzasPerMonth}
              onPizzasPerMonthChange={setPizzasPerMonth}
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

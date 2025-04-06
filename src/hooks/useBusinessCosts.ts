
import { useState, useEffect } from "react";
import { BusinessCost } from "@/types/pizza";
import { useLanguage } from "@/contexts/LanguageContext";

export function useBusinessCosts(pizzasPerMonth: number = 1000) {
  const { t } = useLanguage();
  
  const [businessCosts, setBusinessCosts] = useState<BusinessCost[]>([
    { id: "rent", name: t("rent"), monthlyCost: 2000, enabled: false },
    { id: "staff", name: t("staff"), monthlyCost: 4000, enabled: false },
    { id: "utilities", name: t("utilities"), monthlyCost: 500, enabled: false },
    { id: "insurance", name: t("insurance"), monthlyCost: 300, enabled: false },
    { id: "maintenance", name: t("maintenance"), monthlyCost: 200, enabled: false },
  ]);

  const [pizzasPerMonthVal, setPizzasPerMonth] = useState<number>(pizzasPerMonth);

  // Update cost names when language changes
  useEffect(() => {
    setBusinessCosts(prevCosts => 
      prevCosts.map(cost => ({
        ...cost,
        name: t(cost.id)
      }))
    );
  }, [t]);

  // Handle cost change
  const handleCostChange = (costId: string, updatedCost: BusinessCost) => {
    setBusinessCosts(prevCosts => {
      return prevCosts.map(cost => 
        cost.id === costId ? updatedCost : cost
      );
    });
  };

  // Calculate business costs per pizza
  const calculateBusinessCostsPerPizza = (): number => {
    if (pizzasPerMonthVal <= 0) return 0;

    const totalMonthlyCosts = businessCosts.reduce((sum, cost) => 
      sum + (cost.enabled ? cost.monthlyCost : 0), 0);
    
    return totalMonthlyCosts / pizzasPerMonthVal;
  };

  return { 
    businessCosts, 
    handleCostChange, 
    calculateBusinessCostsPerPizza,
    pizzasPerMonth: pizzasPerMonthVal,
    setPizzasPerMonth
  };
}

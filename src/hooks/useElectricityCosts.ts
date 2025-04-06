
import { useState } from "react";
import { ElectricityCost } from "@/types/pizza";

export function useElectricityCosts() {
  // Electricity costs data
  const [electricityCosts] = useState<ElectricityCost[]>([
    {
      country: "Germany",
      pricePerKWh: 0.398,
      preheatCost: 0.328,
      costPerPizza: 0.143,
      totalFirstPizza: 0.471,
      additionalPizzaCost: 0.143
    },
    {
      country: "France",
      pricePerKWh: 0.239,
      preheatCost: 0.197,
      costPerPizza: 0.086,
      totalFirstPizza: 0.283,
      additionalPizzaCost: 0.086
    },
    {
      country: "United Kingdom",
      pricePerKWh: 0.31,
      preheatCost: 0.256,
      costPerPizza: 0.112,
      totalFirstPizza: 0.368,
      additionalPizzaCost: 0.112
    },
    {
      country: "Spain",
      pricePerKWh: 0.25,
      preheatCost: 0.206,
      costPerPizza: 0.09,
      totalFirstPizza: 0.296,
      additionalPizzaCost: 0.09
    },
    {
      country: "Italy",
      pricePerKWh: 0.3128,
      preheatCost: 0.258,
      costPerPizza: 0.113,
      totalFirstPizza: 0.371,
      additionalPizzaCost: 0.113
    }
  ]);
  
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  
  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
  };
  
  return { electricityCosts, selectedCountry, handleCountryChange };
}

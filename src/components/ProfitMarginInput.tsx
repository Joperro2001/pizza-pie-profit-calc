
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface ProfitMarginInputProps {
  profitMargin: number;
  onChange: (value: number) => void;
}

export function ProfitMarginInput({ profitMargin, onChange }: ProfitMarginInputProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? 0 : parseFloat(e.target.value);
    if (value >= 0 && value <= 500) {
      onChange(value);
    }
  };

  const handleSliderChange = (value: number[]) => {
    onChange(value[0]);
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Profit Margin</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="profit-margin">Profit Margin (%)</Label>
              <div className="w-24 relative">
                <Input
                  id="profit-margin"
                  type="number"
                  min="0"
                  max="500"
                  value={profitMargin}
                  onChange={handleInputChange}
                  className="pl-7"
                />
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
              </div>
            </div>
            <Slider
              value={[profitMargin]}
              min={0}
              max={500}
              step={5}
              onValueChange={handleSliderChange}
              className="py-2"
            />
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>0%</span>
            <span>250%</span>
            <span>500%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

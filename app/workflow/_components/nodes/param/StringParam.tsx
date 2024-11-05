"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ParamProps } from "@/types/appNodes";
import { useId } from "react";

export default function StringParam({
  param,
  value,
  updateNodeParamValue,
}: ParamProps) {
  const id = useId();
  return (
    <div className="space-y-1 w-full p-1">
      <Label htmlFor={id} className="text-xs flex">
        {param.name}
        {param.required && <span className="text-red-400 px-2">*</span>}
      </Label>
      <Input
        id={id}
        value={value}
        placeholder="Enter value here"
        onChange={(e) => {
          updateNodeParamValue(e.target.value);
        }}
      />
      {param.helperText && (
        <p className="text-muted-foreground px-2">{param.helperText}</p>
      )}
    </div>
  );
}

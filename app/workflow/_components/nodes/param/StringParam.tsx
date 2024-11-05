"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ParamProps } from "@/types/appNodes";
import { useId, useState } from "react";

export default function StringParam({
  param,
  value,
  updateNodeParamValue,
}: ParamProps) {
  const id = useId();
  const [internalValue, setInternalValue] = useState(value);
  return (
    <div className="space-y-1 w-full p-1">
      <Label htmlFor={id} className="text-xs flex">
        {param.name}
        {param.required && <span className="text-red-400 px-2">*</span>}
      </Label>
      <Input
        className="text-xs"
        id={id}
        value={internalValue}
        placeholder="Enter value here"
        onChange={(e) => {
          setInternalValue(e.target.value);
        }}
        onBlur={(e) => {
          updateNodeParamValue(e.target.value);
        }}
      />
      {param.helperText && (
        <p className="text-muted-foreground px-2">{param.helperText}</p>
      )}
    </div>
  );
}

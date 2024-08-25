import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectShadcn = ({ label, items, placeholder }) => {
  return (
    <Select dir="rtl">
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {label === undefined ? null : (
            <SelectLabel className="text-[12px] text-gray-500">{label}</SelectLabel>
          )}
          {items.map((item, index) => {
            return (
              <SelectItem key={index} value={item.value}>
                {item.label}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectShadcn;

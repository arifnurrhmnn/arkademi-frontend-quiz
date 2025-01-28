import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

interface FormStartProps {
  placeholder: string;
  textBtn: string;
}

const FormStart = ({ placeholder, textBtn }: FormStartProps) => {
  return (
    <div className="w-full max-w-[320px] p-4 bg-white rounded-md">
      <Input
        placeholder={placeholder}
        className="mb-[10px] h-[60px] text-center !text-xl !font-bold"
      />
      <Button className="w-full h-[44px] font-bold text-base">{textBtn}</Button>
    </div>
  );
};

export default FormStart;

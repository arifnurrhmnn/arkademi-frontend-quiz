import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

interface FormStartProps {
  placeholder: string;
  textBtn: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
}

const FormStart = ({
  placeholder,
  textBtn,
  value,
  onChange,
  onClick,
}: FormStartProps) => {
  return (
    <div className="w-full max-w-[320px] p-4 bg-white rounded-md">
      <Input
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="mb-[10px] h-[60px] text-center !text-xl !font-bold"
      />
      <Button className="w-full h-[44px] font-bold text-base" onClick={onClick}>
        {textBtn}
      </Button>
    </div>
  );
};

export default FormStart;

import React from "react";
import { Button as ButtonUI } from "@/components/ui/button";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  onClick?: () => void;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  onClick,
  className = "",
}) => {
  const baseStyle = "px-4 py-2 rounded font-medium";
  const styles = {
    primary: `${baseStyle} bg-blue-600 text-white hover:bg-blue-700`,
    secondary: `${baseStyle} bg-white text-blue-600 border border-blue-600 hover:bg-blue-100`,
    ghost: `${baseStyle} text-blue-600 hover:bg-gray-100`,
  };

  return (
    <ButtonUI className={`${styles[variant]} ${className}`} onClick={onClick}>
      {children}
    </ButtonUI>
  );
};

export default Button;

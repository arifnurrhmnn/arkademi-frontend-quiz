import React from "react";

interface SpinnerProps {
  className?: string;
}
const Spinner = ({ className }: SpinnerProps) => {
  return (
    <div
      className={`w-20 h-20 border-[25px] border-white
                        border-t-transparent rounded-full 
                        animate-spin ${className}`}
    />
  );
};

export default Spinner;

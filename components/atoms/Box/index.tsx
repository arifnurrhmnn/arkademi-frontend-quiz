import React from "react";

type BoxProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

const Box: React.FC<BoxProps> = ({ children, className, onClick }) => {
  return (
    <div className={`${className}`} onClick={onClick}>
      {children}
    </div>
  );
};

export default Box;

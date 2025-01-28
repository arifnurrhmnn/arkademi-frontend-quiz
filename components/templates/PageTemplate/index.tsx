import FooterScore from "@/components/organisms/FooterScore/index";
import React from "react";

type PageTemplateProps = {
  children: React.ReactNode;
  className?: string;
};

const PageTemplate: React.FC<PageTemplateProps> = ({ children, className }) => {
  return (
    <div className={`flex flex-col w-full h-screen ${className}`}>
      <h2 className="font-bold text-white text-2xl text-center mt-8 mb-2">
        Question 1
      </h2>
      {children}
      <FooterScore />
    </div>
  );
};

export default PageTemplate;

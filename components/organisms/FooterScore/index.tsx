import Box from "@/components/atoms/Box/index";
import Button from "@/components/atoms/Button/index";
import React from "react";

const FooterScore = () => {
  return (
    <div className="w-full flex items-center justify-between bg-white py-3 px-8">
      <p className="font-bold">Jack Berwin</p>
      <Box className="font-semibold bg-black text-white py-1 px-6 rounded-sm">
        567
      </Box>
    </div>
  );
};

export default FooterScore;

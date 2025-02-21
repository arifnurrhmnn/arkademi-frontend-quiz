import { Button } from "@/components/ui/button";
import React from "react";

const AdminHeader = () => {
  return (
    <div className="w-full bg-white px-8 py-2 flex justify-between items-center">
      <h1 className="font-bold text-lg">Arkademi</h1>
      <Button className="font-bold">Create</Button>
    </div>
  );
};

export default AdminHeader;

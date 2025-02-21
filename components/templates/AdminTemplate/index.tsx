"use client";
import AdminHeader from "@/components/organisms/AdminHeader";
import React from "react";

type AdminTemplateProps = {
  children: React.ReactNode;
  className?: string;
};

const AdminTemplate: React.FC<AdminTemplateProps> = ({
  children,
  className,
}) => {
  return (
    <div className={`flex flex-col w-full h-screen ${className}`}>
      <AdminHeader />
      {children}
    </div>
  );
};

export default AdminTemplate;

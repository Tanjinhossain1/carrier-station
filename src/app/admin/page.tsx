import React from "react";
import DashboardComponent from "./_components/Dashboard";
import DashboardAdminComponent from "./_components/AdminDashboard";

export default function page() {
  return (
    <>
      <DashboardComponent>
        <DashboardAdminComponent />
      </DashboardComponent>
    </>
  );
}

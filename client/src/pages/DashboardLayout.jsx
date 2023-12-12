import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <main>
      <main className="p-4 pt-20 lg:ml-60 h-auto">
        <Outlet />
      </main>
    </main>
  );
};

export default DashboardLayout;

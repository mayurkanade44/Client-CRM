import { Sidebar } from "../components";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <main>
      <Sidebar />
      <main className="p-4 pt-20 lg:ml-60 h-auto">
        <Outlet />
      </main>
    </main>
  );
};

export default Dashboard;

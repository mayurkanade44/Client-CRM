import { Sidebar } from "../components";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <main>
      <Sidebar />
      <main className="p-4 pt-20 lg:ml-64 h-auto dark:bg-gray-800">
        <Outlet />
      </main>
    </main>
  );
};

export default Dashboard;

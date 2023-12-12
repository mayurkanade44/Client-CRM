import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import {
  Clients,
  Complaints,
  Dashboard,
  DashboardLayout,
  Landing,
  Reports,
  Services,
  SingleClient,
  SingleLocation,
  Users,
} from "./pages";
import { Sidebar } from "./components";

function App() {
  const Layout = () => {
    return (
      <>
        <ToastContainer position="top-center" autoClose={2000} />
        <Sidebar />
        <div>
          <Outlet />
        </div>
      </>
    );
  };

  const Router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index={true} path="/" element={<Landing />} />
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index={true} element={<Dashboard />} />
          <Route path="clients" element={<Clients />} />
          <Route path="users" element={<Users />} />
          <Route path="reports" element={<Reports />} />
          <Route path="services" element={<Services />} />
          <Route path="complaints" element={<Complaints />} />
          <Route path="client/:id" element={<SingleClient />} />
        </Route>

        <Route path="/location/:id" element={<SingleLocation />} />
      </Route>
    )
  );

  return <RouterProvider router={Router} />;
}

export default App;

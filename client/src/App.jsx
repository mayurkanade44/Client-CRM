import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import { Clients, Dashboard, Landing, MainLayout, Reports, SingleClient, Users } from "./pages";

function App() {
  const Layout = () => {
    return (
      <>
        <ToastContainer position="top-center" autoClose={2000} />
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
        <Route path="dashboard" element={<MainLayout />}>
          <Route index={true} element={<Dashboard />} />
          <Route path="clients" element={<Clients />} />
          <Route path="users" element={<Users />} />
          <Route path="reports" element={<Reports />} />
          <Route path="client/:id" element={<SingleClient />} />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={Router} />;
}

export default App;

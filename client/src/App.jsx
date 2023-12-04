import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import { Landing } from "./pages";

function App() {
  const Layout = () => {
    return (
      <>
        {/* <ToastContainer position="top-center" autoClose={2000} />
        <Navbar /> */}
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
      </Route>
    )
  );

  return <RouterProvider router={Router} />;
}

export default App;

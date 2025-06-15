import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import Home from "../screens/Home";
import About from "../screens/About";
import Properties from "../screens/Properties";
import Contact from "../screens/Contact";
import NotFound from "../screens/NotFound";
import ViewProperty from "../components/properties/ViewProperty";
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,

    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/properties",
        element: <Properties />,
      },
      {
        path: "/property/:id",
        element: <ViewProperty />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;

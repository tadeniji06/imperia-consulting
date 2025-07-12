import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import Home from "../screens/Home";
import About from "../screens/About";
import Properties from "../screens/Properties";
import Contact from "../screens/Contact";
import NotFound from "../screens/NotFound";
import ViewProperty from "../components/properties/ViewProperty";
import Blogs from "../screens/Blogs";
import Blog from "../components/Blog";

// Export routes configuration for both SSR and client
export const routes = [
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "properties",
        element: <Properties />,
      },
      {
        path: "property/:id",
        element: <ViewProperty />,
      },
      {
        path: "blog/:slug",
        element: <Blog />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "blogs",
        element: <Blogs />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];

// Browser router for client-side
const router = createBrowserRouter(routes);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;

import {
	RouterProvider,
	createBrowserRouter,
} from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import Home from "../screens/Home";
import About from "../screens/About";
import Properties from "../screens/Properties";
import Contact from "../screens/Contact";
import NotFound from "../screens/NotFound";
import ViewProperty from "../components/properties/ViewProperty";
import Blogs from "../screens/Blogs";
import Blog from "../components/Blog";
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
				path: "/blog/:slug",
				element: <Blog />,
			},
			{
				path: "/contact",
				element: <Contact />,
			},
			{
				path: "/blogs",
				element: <Blogs />,
			},
		],
	},
]);

const AppRoutes = () => {
	return <RouterProvider router={router} />;
};

export default AppRoutes;

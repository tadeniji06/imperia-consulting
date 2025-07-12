import { MemoryRouter, Routes, Route } from "react-router-dom";
import { MetaProvider } from "./src/utils/MetaProvider";
import AppLayout from "./src/layouts/AppLayout";
import Home from "./src/screens/Home";
import About from "./src/screens/About";
import Properties from "./src/screens/Properties";
import Contact from "./src/screens/Contact";
import NotFound from "./src/screens/NotFound";
import ViewProperty from "./src/components/properties/ViewProperty";
import Blogs from "./src/screens/Blogs";
import Blog from "./src/components/Blog";
import Announcement from "./src/components/ui/Announcement";

const SSRApp = ({ url, onMetaChange }) => {
  return (
    <MetaProvider>
      <MemoryRouter initialEntries={[url]} initialIndex={0}>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="properties" element={<Properties />} />
            <Route path="property/:id" element={<ViewProperty />} />
            <Route path="blog/:slug" element={<Blog />} />
            <Route path="contact" element={<Contact />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        <Announcement />
      </MemoryRouter>
    </MetaProvider>
  );
};

export default SSRApp;

// import { MetaProvider } from "./utils/MetaProvider";
import AppRoutes from "./routes/routes";
import Announcement from "./components/ui/Announcement";
import { useEffect } from "react";
import Clarity from "@microsoft/clarity";

const App = () => {
  const projectId = "sc89s3h9mh";
  
  useEffect(() => {
    Clarity.init(projectId);
  }, []);

  return (
    <>
      <AppRoutes />
      <Announcement />
    </>
  );
};

export default App;

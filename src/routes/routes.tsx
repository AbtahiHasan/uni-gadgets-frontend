import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import LoginLayout from "../layouts/LoginLayout";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import DashboardHome from "@/pages/DashboardHome";
import AddGadgets from "@/pages/AddGadgets";
import Gadgets from "@/pages/Gadgets";
import SalesManagement from "@/pages/SalesManagement";
import SalesHistory from "@/pages/SalesHistory";

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "home",
        element: <DashboardHome />,
      },
      {
        path: "add-gadgets",
        element: <AddGadgets />,
      },
      {
        path: "gadgets",
        element: <Gadgets />,
      },
      {
        path: "sales-management",
        element: <SalesManagement />,
      },
      {
        path: "sales-history",
        element: <SalesHistory />,
      },
    ],
  },
  {
    path: "/",
    element: <LoginLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Registration />,
      },
    ],
  },
]);

export default router;

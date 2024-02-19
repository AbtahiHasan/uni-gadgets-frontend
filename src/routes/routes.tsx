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
import UpdateGadgets from "@/pages/UpdateGadgets";
import ProtectedRoute from "./ProductedRoute";
import ErrorPage from "@/pages/ErrorPage";
import MyGadgets from "@/pages/MyGadgets";
import Cart from "@/pages/Cart";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
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
        path: "my-gadgets",
        element: <MyGadgets />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "gadgets",
        element: <Gadgets />,
      },
      {
        path: "gadgets/:id",
        element: <UpdateGadgets />,
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

import { currentToken } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { ReactNode, useEffect } from "react";

import { Navigate, useLocation, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector(currentToken);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/home");
    }
  }, [navigate, location]);

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};

export default ProtectedRoute;

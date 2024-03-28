import { Outlet, Navigate } from "react-router-dom";
import { useAuthentication } from "@asgardeo/react-ui";

export const ProtectedRoutes = () => {
  const { isAuthenticated } = useAuthentication();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

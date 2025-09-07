import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../util/AuthContext";

interface ProtectedRouteProps {
  permission: string;
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  permission,
  children,
}) => {
  const { hasPermission } = useAuth();

  if (!hasPermission(permission)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;

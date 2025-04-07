
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface RequireAuthProps {
  children: JSX.Element;
}

export default function RequireAuth({ children }: RequireAuthProps) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    // Show loading state while checking authentication
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1F4959]"></div>
      </div>
    );
  }

  if (!user) {
    // Redirect to the login page if not authenticated
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
}

import { Navigate, useNavigate } from "react-router-dom";
import { GetUser } from "../config/ApiService";
import { useState, useEffect } from "react";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const isAuthenticated = JSON.parse(localStorage.getItem("status"));

  const getDataUser = async () => {
    setLoading(true);
    try {
      const dataUser = await GetUser();
      if (dataUser) {
        setUserRole(dataUser.role);
      } else {
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.error("Gagal ambil data user:", error);
      navigate("/", { replace: true });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      getDataUser();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  if (loading) return null;

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/error" replace />;
  }

  return children;
};

export default ProtectedRoute;

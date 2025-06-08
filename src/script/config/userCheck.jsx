import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GetUser } from "./ApiService";

const UserCheck = ({ setData }) => {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const fetchProtectedData = async () => {
    try {
      const response = await GetUser();
      if(response){
        setIsAuthenticated(response);
        localStorage.setItem("status", true);
      }else{
        localStorage.setItem("status", false);
        setData(null);
      }
    } catch (error) {
      console.error("Error fetching protected data:", error);
    }
  };

  useEffect(() => {
    fetchProtectedData();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      setData(isAuthenticated);
    }
  }, [isAuthenticated, setData]);

  return null;
};

export default UserCheck;

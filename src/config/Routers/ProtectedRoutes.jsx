import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = ({ component }) => {
  const [isUser, setIsUser] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
        return;
      }
      setIsUser(true);
    });
  }, []);
  return isUser ? component : null;
};

export default ProtectedRoutes;

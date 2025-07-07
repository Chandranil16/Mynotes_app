/* eslint-disable react-refresh/only-export-components */
import React, { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // Import toast for notifications
const authcontext = createContext();
const Contextprovider = ({ children }) => {
  const [user, setUser] = useState(null);
  const login = (user) => setUser(user);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    toast.success("Logout successful!");
  };

  useEffect(() => {
    const verifyuser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/verify",{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (res.data.success && res.data.user && res.data.user._id) {
          setUser(res.data.user);
        } else {
          setUser(null);
          localStorage.removeItem("token");
        }
      } catch (error) {
        setUser(null);
        localStorage.removeItem("token");
        console.error("Error verifying user:", error);
      }
    };
    verifyuser();
  }, []);

  return (
    <authcontext.Provider value={{ user, login, logout }}>
      {children}
    </authcontext.Provider>
  );
};
export const useAuth = () => useContext(authcontext);

export default Contextprovider;

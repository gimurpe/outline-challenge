import { useDispatch, useSelector } from "react-redux";
import { authClient } from "../lib/authClient";
import { getCurrentUser, loggedIn, loggedOut } from "../slices/auth.slice";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useState } from "react";

export const useAuth = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(getCurrentUser);
  const navigate = useNavigate();
  const [loading, setIsLoading] = useState(false);

  const logIn = async (loginInfo: { email: string; password: string }) => {
    try {
      setIsLoading(true);
      const user = await authClient.login(loginInfo.email, loginInfo.password);
      setIsLoading(false);
      dispatch(loggedIn(user));
      navigate("/dashboard");
    } catch (error) {
      setIsLoading(false);
      toast.error("Invalid email or password. Please try again.");
    }
  };

  const logOut = () => {
    // Ideally do this in the backend, adding it here as it is not a priority
    Cookies.remove("authToken");
    dispatch(loggedOut({}));
    navigate("/sign-in");
  };

  return {
    logIn,
    loading,
    logOut,
    isAuthenticated,
  };
};

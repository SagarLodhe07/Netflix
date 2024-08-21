import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const userAuthStore = create((set) => ({
  user: null,
  isSigningup: false,
  isCheckingAuth: true,
  isLoggingout: false,
  isLogginin:false,
  signup: async (credentials) => {
    set({ isSigningup: true });
    try {
      const response = await axios.post("/api/v1/auth/sign", credentials);
      set({ user: response.data.user, isSigningup: false });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response.data.message || "An Error occurred");
      set({ isSigningup: false, user: null });
    }
  },
  login: async (credentials) => {
    set({isLogginin:true})
    try {
      const response = await axios.post("/api/v1/auth/login", credentials);
      set({ user: response.data.user, isLogginin: false });
      toast.success("Login Successfully");
    } catch (error) {
      toast.error(error.response.data.message || "An Error occurred");
      set({ isLogginin: false, user: null });
    }
  }
  ,


  logout: async () => {
    set({ isLoggingout: true });
    try {
      await axios.post("/api/v1/auth/logout");
      set({ user: null, isLoggingout: false });
      toast.success("Log out Successfully");
    } catch (error) {
      set({ isLoggingout: false });
      toast.error(error.response.data.message || "Logout failed");
    }
  },

  
  authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axios.get("/api/v1/auth/authcheck");
      set({ user: response.data.user, isCheckingAuth: false });
    } catch (error) {
      set({ isCheckingAuth: false, user: null });
        // toast.error(error.response.data.message || "An Error occurred");
    }
  },
}));

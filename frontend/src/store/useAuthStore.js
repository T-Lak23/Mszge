import { create } from "zustand";
import { api } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  isLoggingOut: false,
  socket: null,
  onlineUsers: [],
  checkAuth: async () => {
    try {
      set({ isCheckingAuth: true });
      const res = await api.get("/auth/check-user");
      // console.log(res);
      set({ authUser: res.data.user });
      get().connectSocket();
    } catch (error) {
      console.log(error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    try {
      set({ isSigningUp: true });
      const res = await api.post("/auth/sign-up", data);
      console.log(res);
      set({ authUser: res.data.user });
      toast.success("Account created successfully");
      get().connectSocket();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    try {
      set({ isLoggingIn: true });
      const res = await api.post("/auth/sign-in", data);
      console.log(res);
      set({ authUser: res.data.user });
      toast.success("Logged In successfully");
      get().connectSocket();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      set({ isLoggingOut: true });
      await api.post("/auth/sign-out");
      set({ authUser: null });
      toast.success("Logged out");
      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.log(error);
    } finally {
      set({ isLoggingOut: false });
    }
  },
  updateProfile: async (data) => {
    try {
      const res = await api.put("/auth/update-profile", data);
      set({ authUser: res.data.user });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  },

  connectSocket: async () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;
    const baseURL = import.meta.env.VITE_BASE_URL;
    const socket = io(baseURL, {
      withCredentials: true,
    });
    socket.connect();
    set({ socket });
    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));

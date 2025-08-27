import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance"; 

interface User {
  id: number;
  email: string;
  username: string;
  createdAt?: string;
  updatedAt?: string;
}

interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  username: string;
}

export const login = async (data: LoginData) => {
  const res = await axiosInstance.post<AuthResponse>("/auth/login", data);
  return res.data;
};

export const register = async (data: RegisterData) => {
  const res = await axiosInstance.post<AuthResponse>("/auth/register", data);
  return res.data;
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null as User | null,
    token: localStorage.getItem("token") || null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
    },
    registerSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

export const { loginSuccess, registerSuccess, logout } = authSlice.actions;
export default authSlice.reducer;

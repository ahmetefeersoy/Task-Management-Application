// store/taskSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import axiosInstanceWithAuth from "../utils/axiosInstance";

type TaskStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
type Priority = "LOW" | "MEDIUM" | "HIGH";

interface Task {
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;
  dueDate?: string;
  priority: Priority;
  createdAt: string;
  updatedAt: string;
  userId: number;
}

interface TaskData {
  title: string;
  description?: string;
  status?: TaskStatus;
  dueDate?: string;
  priority?: Priority;
}

export const fetchTasks = async () => {
  const res = await axiosInstanceWithAuth.get("/tasks");
  return res.data;
};

export const addTask = async (task: TaskData) => {
  const res = await axiosInstanceWithAuth.post("/tasks", task);
  return res.data;
};

export const updateTask = async (id: number, task: Partial<TaskData>) => {
  const res = await axiosInstanceWithAuth.put(`/tasks/${id}`, task);
  return res.data;
};

export const deleteTask = async (id: number) => {
  await axiosInstanceWithAuth.delete(`/tasks/${id}`);
  return id;
};

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    list: [] as Task[],
  },
  reducers: {
    setTasks: (state, action) => {
      state.list = action.payload;
    },
    addTaskSuccess: (state, action) => {
      state.list.push(action.payload);
    },
    updateTaskSuccess: (state, action) => {
      const index = state.list.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...action.payload };
      }
    },
    deleteTaskSuccess: (state, action) => {
      state.list = state.list.filter(task => task.id !== action.payload);
    },
  },
});

export const { setTasks, addTaskSuccess, updateTaskSuccess, deleteTaskSuccess } = taskSlice.actions;
export default taskSlice.reducer;

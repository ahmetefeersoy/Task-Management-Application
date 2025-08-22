import axiosInstance from "./axiosInstance";



async function fetchTasks() {
  try {
    const response = await axiosInstance.get("/tasks");
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
}

export { fetchTasks };


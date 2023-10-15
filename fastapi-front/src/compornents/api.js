import axios from "axios";

export const getTodos = async () => {
  try {
    const response = await axios.get("http://localhost:8000/todos");
    return response.data;
  } catch (error) {
    throw error;
  }
}
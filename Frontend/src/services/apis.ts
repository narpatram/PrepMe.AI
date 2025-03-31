import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000"; 

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(`${API_BASE_URL}/upload-book/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

export const getDownloadUrl = async (fileName: string) => {
  const response = await axios.get(`${API_BASE_URL}/download/${fileName}`);
  return response.data.url;
};

export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("token", token);
  } else {
    delete api.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
  }
};

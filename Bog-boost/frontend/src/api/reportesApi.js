import { axiosClient } from "./axiosClient";

export const obtenerReportes = async () => {
  try {
    const response = await axiosClient.get("/reportes");
    return response.data;
  } catch (error) {
    console.error("Error al obtener reportes:", error);
    throw error;
  }
};
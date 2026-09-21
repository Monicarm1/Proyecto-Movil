import { axiosClient } from "./axiosClient";

export const buscarProductosYNegociosApi = async (query) => {
  try {
    // Al usar axiosClient, solo necesitas poner la ruta relativa "/buscar"
    const response = await axiosClient.get("/buscar", {
      params: { q: query },
    });
    return response.data; // Retorna { productos: [...], negocios: [...] }
  } catch (error) {
    console.error("Error al buscar:", error);
    throw error;
  }
};
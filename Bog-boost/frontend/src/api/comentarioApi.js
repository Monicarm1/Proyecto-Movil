import { axiosClient } from "./axiosClient"; // O como se llame tu instancia configurada

// Crear un comentario (Requiere token)
export const crearComentarioApi = async (datosComentario) => {
  const response = await axiosClient.post("/comentarios/crear", datosComentario);
  return response.data;
};

// Obtener todos los comentarios de un producto específico (Público)
export const obtenerComentariosProductoApi = async (idProducto) => {
  const response = await axiosClient.get(`/comentarios/producto/${idProducto}`);
  return response.data;
};

// Obtener calificación promedio de un producto (Público)
export const obtenerPromedioProductoApi = async (idProducto) => {
  const response = await axiosClient.get(`/comentarios/producto/${idProducto}/promedio`);
  return response.data;
};
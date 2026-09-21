import { axiosClient } from "./axiosClient";

// Obtener los pedidos de los negocios del vendedor (para el panel de administración)
export const listarPedidosVendedor = async () => {
  const response = await axiosClient.get("/seguimientos/mis-pedidos");
  return response.data;
};

// Actualizar el estado de un seguimiento (Ej: cambiar a PREPARANDO, ENVIADO, ENTREGADO)
export const actualizarSeguimientoApi = async (id_seguimiento, estado_seguimiento) => {
  const response = await axiosClient.put(`/seguimientos/actualizar/${id_seguimiento}`, {
    estado_seguimiento,
  });
  return response.data;
};
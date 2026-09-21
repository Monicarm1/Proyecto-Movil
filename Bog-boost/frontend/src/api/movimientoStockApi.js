import { axiosClient } from "./axiosClient";


export const obtenerMovimiento = (id) =>
  axiosClient.get(`/movimientos-stock/${id}`);


export const getNegocioUsuario = async (id_perfil) => {
  const response = await axiosClient.get(`/movimientos-stock/negocio-usuario?id_perfil=${id_perfil}`);
  return response;
};

export const listarMovimientos = async (id_negocio) => {
  const response = await axiosClient.get(`/movimientos-stock?id_negocio=${id_negocio}`);
  return response;
};

export const crearMovimientoApi = async (datosMovimiento) => {
  const response = await axiosClient.post("/movimientos-stock/crear", datosMovimiento);
  return response.data;
};
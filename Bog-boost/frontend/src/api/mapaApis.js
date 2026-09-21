// frontend/src/api/mapaApis.js
import { axiosClient } from './axiosClient';

export const getDatosPuesto = async (numeroPuesto) => {
  const respuesta = await axiosClient.get(`/mapa/puesto/${numeroPuesto}`);
  return respuesta.data;
};
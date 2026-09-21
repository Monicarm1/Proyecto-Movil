import { axiosClient } from "./axiosClient";

export const obtenerMiPerfil = async () => {
  const { data } = await axiosClient.get("/perfil/me");
  return data;
};

export const actualizarPerfil = async (datos) => {
  const { data } = await axiosClient.put(
    "/perfil/completar",
    datos
  );

  return data;
};

export const desactivarCuenta = async () => {
  const { data } = await axiosClient.put(
    "/perfil/desactivar-cuenta"
  );

  return data;
};

export const actualizarFotoPerfil = async (url_foto) => {
  const { data } = await axiosClient.put(
    "/perfil/foto",
    { url_foto }
  );

  return data;
};

// ==============================
// SUPER ADMIN
// ==============================

// Obtener todos los perfiles
export const obtenerPerfiles = async () => {
  const { data } = await axiosClient.get("/perfil");
  return data;
};

// Obtener un perfil por id
export const obtenerPerfilPorId = async (id) => {
  const { data } = await axiosClient.get(`/perfil/${id}`);
  return data;
};

// Convertir usuario en administrador
export const asignarAdministrador = async (id_usuario) => {
  const { data } = await axiosClient.put(
    "/perfil/asignar-administrador",
    { id_usuario }
  );

  return data;
};

// Quitar permisos de administrador
export const quitarAdministrador = async (id_usuario) => {
  const { data } = await axiosClient.put(
    "/perfil/quitar-administrador",
    { id_usuario }
  );

  return data;
};
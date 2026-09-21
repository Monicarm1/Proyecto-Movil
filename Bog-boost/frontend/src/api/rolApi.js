import { axiosClient } from "./axiosClient";

// Obtener todos los roles
export const obtenerRoles = async () => {

    const { data } = await axiosClient.get(
        "/roles"
    );

    return data;

};

// Obtener un rol por id
export const obtenerRolPorId = async (id) => {

    const { data } = await axiosClient.get(
        `/roles/${id}`
    );

    return data;

};

// Cambiar el rol de un usuario
export const cambiarRolUsuario = async (payload) => {

    const { data } = await axiosClient.put(
        "/roles/usuario",
        payload
    );

    return data;

};
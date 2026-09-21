import { axiosClient } from "./axiosClient";

export const obtenerMetodosEnvioPorNegocio = async (idNegocio) => {

    const { data } = await axiosClient.get(
        `/metodos-envio/negocio/${idNegocio}`
    );

    return data;

};

// Obtener los métodos de envío del negocio del vendedor
export const obtenerMisMetodosEnvio = async () => {

    const { data } = await axiosClient.get(
        "/metodos-envio/mis-metodos"
    );

    return data;

};

// Crear un método de envío
export const crearMetodoEnvio = async (metodo) => {

    const { data } = await axiosClient.post(
        "/metodos-envio/crear",
        metodo
    );

    return data;

};

// Actualizar un método de envío
export const actualizarMetodoEnvio = async (
    id,
    metodo
) => {

    const { data } = await axiosClient.put(
        `/metodos-envio/actualizar/${id}`,
        metodo
    );

    return data;

};

// Eliminar un método de envío
export const eliminarMetodoEnvio = async (id) => {

    const { data } = await axiosClient.delete(
        `/metodos-envio/eliminar/${id}`
    );

    return data;

};

// (Opcional) Obtener un método de envío por id
export const obtenerMetodoEnvioPorId = async (id) => {

    const { data } = await axiosClient.get(
        `/metodos-envio/${id}`
    );

    return data;

};
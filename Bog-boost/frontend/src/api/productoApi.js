import { axiosClient } from "./axiosClient";

/* ==========================
   LISTAR TODOS
========================== */

export const obtenerProductos = async () => {

    const { data } = await axiosClient.get("/producto");

    return data;

};

/* ==========================
   LISTAR MIS PRODUCTOS
========================== */

export const obtenerMisProductos = async () => {

    const { data } = await axiosClient.get("/producto/mis-productos");

    return data;

};

/* ==========================
   OBTENER POR ID
========================== */

export const obtenerProducto = async (id) => {

    const { data } = await axiosClient.get(`/producto/${id}`);

    return data;

};

/* ==========================
   CREAR
========================== */

export const crearProducto = async (producto) => {

    const { data } = await axiosClient.post(
        "/producto/crear",
        producto
    );

    return data;

};

/* ==========================
   ACTUALIZAR
========================== */

export const actualizarProducto = async (
    id,
    producto
) => {

    const { data } = await axiosClient.put(
        `/producto/actualizar/${id}`,
        producto
    );

    return data;

};

/* ==========================
   ELIMINAR
========================== */

export const eliminarProducto = async (id) => {

    const { data } = await axiosClient.delete(
        `/producto/eliminar/${id}`
    );

    return data;

};

/* ==========================
   OBTENER PRODUCTOS POR NEGOCIO
========================== */
export const obtenerProductosPorNegocio = async (idNegocio) => {
    const { data } = await axiosClient.get(`/producto/negocio/${idNegocio}`);
    return data;
};
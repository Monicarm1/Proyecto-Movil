import { axiosClient } from "./axiosClient";

// =========================
// ADMIN
// =========================

export const obtenerVentas = async () => {
    const { data } = await axiosClient.get("/ventas");
    return data;
};

export const obtenerVentaPorId = async (id) => {
    const { data } = await axiosClient.get(`/ventas/${id}`);
    return data;
};

// =========================
// CLIENTE
// =========================

export const confirmarCarrito = async (payload) => {
    const { data } = await axiosClient.post(
        "/ventas/confirmar-carrito",
        payload
    );

    return data;
};

export const crearVenta = async (payload) => {
    const { data } = await axiosClient.post(
        "/ventas/crear",
        payload
    );

    return data;
};

export const obtenerMisCompras = async () => {
    const { data } = await axiosClient.get(
        "/ventas/mis-compras"
    );

    return data;
};

export const actualizarVenta = async (id, payload) => {
    const { data } = await axiosClient.put(
        `/ventas/actualizar/${id}`,
        payload
    );

    return data;
};

export const eliminarVenta = async (id) => {
    const { data } = await axiosClient.delete(
        `/ventas/eliminar/${id}`
    );

    return data;
};

// =========================
// VENDEDOR
// =========================

export const listarVentasNegocio = async () => {
  const response = await axiosClient.get("/ventas/mis-ventas");
  return response.data;
};
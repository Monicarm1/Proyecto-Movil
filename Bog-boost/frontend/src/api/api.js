import axios from "axios";

// ============================================
// CONFIGURACIÓN DE LA API
// ============================================

// Crear instancia de axios con la URL base
const api = axios.create({
  baseURL: "http://localhost:5000/api"  // Cambia al puerto de tu backend
});

// ============================================
// INTERCEPTOR PARA AGREGAR TOKEN DE AUTENTICACIÓN
// ============================================

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ============================================
// EXPORTAR LA INSTANCIA DE API
// ============================================

export default api;

// ============================================
// FUNCIONES PARA PUESTOS DEL MERCADO
// ============================================

/**
 * Obtener todos los puestos del mercado
 * GET /api/stands
 * @returns {Promise<Array>} Lista de todos los puestos
 */
export const getAllStands = async () => {
  try {
    const response = await api.get('/stands');
    return response.data;
  } catch (error) {
    console.error('Error al obtener puestos:', error);
    throw error;
  }
};

/**
 * Obtener un puesto por su ID
 * GET /api/stands/:id
 * @param {number} id - ID del puesto
 * @returns {Promise<Object>} Datos del puesto
 */
export const getStandById = async (id) => {
  try {
    const response = await api.get(`/stands/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener puesto ${id}:`, error);
    throw error;
  }
};

/**
 * Obtener puestos disponibles
 * GET /api/stands/available
 * @returns {Promise<Array>} Lista de puestos disponibles
 */
export const getAvailableStands = async () => {
  try {
    const response = await api.get('/stands/available');
    return response.data;
  } catch (error) {
    console.error('Error al obtener puestos disponibles:', error);
    throw error;
  }
};

/**
 * Obtener puestos ocupados
 * GET /api/stands/occupied
 * @returns {Promise<Array>} Lista de puestos ocupados
 */
export const getOccupiedStands = async () => {
  try {
    const response = await api.get('/stands/occupied');
    return response.data;
  } catch (error) {
    console.error('Error al obtener puestos ocupados:', error);
    throw error;
  }
};

/**
 * Buscar puestos por término de búsqueda
 * GET /api/stands/search?q=termino
 * @param {string} query - Término de búsqueda
 * @returns {Promise<Array>} Lista de puestos que coinciden
 */
export const searchStands = async (query) => {
  try {
    const response = await api.get(`/stands/search?q=${encodeURIComponent(query)}`);
    return response.data;
  } catch (error) {
    console.error('Error en búsqueda:', error);
    throw error;
  }
};

/**
 * Obtener puestos por sección
 * GET /api/stands/section/:section
 * @param {string} section - Nombre de la sección
 * @returns {Promise<Array>} Lista de puestos de esa sección
 */
export const getStandsBySection = async (section) => {
  try {
    const response = await api.get(`/stands/section/${encodeURIComponent(section)}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener puestos de sección ${section}:`, error);
    throw error;
  }
};

/**
 * Asignar un negocio a un puesto
 * PUT /api/stands/assign/:standNumber
 * @param {number} standNumber - Número del puesto
 * @param {Object} data - Datos del negocio
 * @param {number} data.negocioId - ID del negocio
 * @param {number} data.userId - ID del usuario
 * @param {string} data.ownerName - Nombre del propietario
 * @param {Array} data.products - Lista de productos
 * @param {string} data.description - Descripción
 * @returns {Promise<Object>} Puesto actualizado
 */
export const assignStandToBusiness = async (standNumber, data) => {
  try {
    const response = await api.put(`/stands/assign/${standNumber}`, data);
    return response.data;
  } catch (error) {
    console.error('Error al asignar puesto:', error);
    throw error;
  }
};

/**
 * Liberar un puesto (desasignar negocio)
 * PUT /api/stands/release/:standNumber
 * @param {number} standNumber - Número del puesto
 * @param {number} userId - ID del usuario dueño
 * @returns {Promise<Object>} Puesto liberado
 */
export const releaseStand = async (standNumber, userId) => {
  try {
    const response = await api.put(`/stands/release/${standNumber}`, { userId });
    return response.data;
  } catch (error) {
    console.error('Error al liberar puesto:', error);
    throw error;
  }
};

/**
 * Actualizar información de un puesto (requiere autenticación)
 * PUT /api/stands/:id
 * @param {number} id - ID del puesto
 * @param {Object} data - Datos a actualizar
 * @returns {Promise<Object>} Puesto actualizado
 */
export const updateStand = async (id, data) => {
  try {
    const response = await api.put(`/stands/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar puesto ${id}:`, error);
    throw error;
  }
};

/**
 * Asignar un puesto a un usuario (solo admin)
 * PUT /api/stands/:id/assign
 * @param {number} id - ID del puesto
 * @param {string} userId - ID del usuario
 * @returns {Promise<Object>} Puesto actualizado
 */
export const assignStandToUser = async (id, userId) => {
  try {
    const response = await api.put(`/stands/${id}/assign`, { userId });
    return response.data;
  } catch (error) {
    console.error(`Error al asignar puesto ${id}:`, error);
    throw error;
  }
};

// ============================================
// NOTA: Aquí puedes agregar más funciones según
// las necesidades de tu aplicación
// ============================================
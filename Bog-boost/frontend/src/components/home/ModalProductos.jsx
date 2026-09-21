import { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaStore, FaUser, FaBox, FaStar, FaInfoCircle } from "react-icons/fa";

// IMPORTS DE TU API EXISTENTE
import { obtenerMisProductos, crearProducto, actualizarProducto, eliminarProducto } from "../../api/productoApi";

import { obtenerCategorias } from "../../api/categoriaApi";

import { subirImagenProducto } from "../../api/uploadApi";

import "../../styles/PerfilNegocio.css";  
import "./ModalProductos.css"; // Estilos adicionales para el mapa

export default function ModalProductos({
    abierto,      // Controla si el modal está abierto
    onClose,      // Función para cerrar
    idNegocio,    // ID del negocio (para productos)
    standData,    // Datos del puesto del mapa (NUEVO)
    isOwner,      // Si el usuario es dueño del puesto (NUEVO)
    isMapMode     // Si es modo mapa o modo negocio (NUEVO)
}) {
    
    // ESTADOS EXISTENTES PARA PRODUCTOS
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [editando, setEditando] = useState(null);
    const [previewImagen, setPreviewImagen] = useState("");
    const [subiendoImagen, setSubiendoImagen] = useState(false);
    const [formulario, setFormulario] = useState({
        id_categoria: "",
        nombre_producto: "",
        descripcion: "",
        caracteristicas: "",
        stock: "",
        precio: "",
        imagen: ""
    });

    // EFECTOS
    useEffect(() => {
        if (abierto) {
            cargarProductos();
            cargarCategorias();
            limpiarFormulario();
        }
    }, [abierto]);

  
    // FUNCIONES EXISTENTES PARA PRODUCTOS
    const cargarProductos = async () => {
        try {
            const data = await obtenerMisProductos();
            setProductos(data);
        } catch (error) {
            console.error(error);
        }
    };

    const cargarCategorias = async () => {
        try {
            const data = await obtenerCategorias();
            setCategorias(data);
        } catch (error) {
            console.error(error);
        }
    };

    const subirImagen = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (!file.type.startsWith("image/")) {
            alert("Solo se permiten imágenes");
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            alert("Máximo 5MB");
            return;
        }

        const imagen = new Image();
        imagen.src = URL.createObjectURL(file);

        try {
            await new Promise((resolve, reject) => {
                imagen.onload = () => {
                    if (imagen.width > 2500 || imagen.height > 2500) {
                        reject(new Error("La imagen es demasiado grande."));
                    } else {
                        resolve();
                    }
                };
            });

            setPreviewImagen(URL.createObjectURL(file));
            setSubiendoImagen(true);

            const respuesta = await subirImagenProducto(file);
            setFormulario((prev) => ({
                ...prev,
                imagen: respuesta.url
            }));
        } catch (error) {
            alert(
                error.response?.data?.mensaje ||
                error.message ||
                "Error al subir la imagen"
            );
        } finally {
            setSubiendoImagen(false);
        }
    };

    const guardar = async () => {
        try {
            if (editando) {
                await actualizarProducto(editando, formulario);
            } else {
                await crearProducto({
                    ...formulario,
                    id_negocio: idNegocio
                });
            }
            limpiarFormulario();
            cargarProductos();
        } catch (error) {
            console.error(error);
        }
    };

    const editar = (producto) => {
        setEditando(producto.id_producto);
        setFormulario({
            id_categoria: producto.id_categoria,
            nombre_producto: producto.nombre_producto,
            descripcion: producto.descripcion,
            caracteristicas: producto.caracteristicas,
            stock: producto.stock,
            precio: producto.precio,
            imagen: producto.imagen
        });
        setPreviewImagen(producto.imagen || "");
    };

    const eliminar = async (id) => {
        if (!window.confirm("¿Eliminar este producto?")) {
            return;
        }
        try {
            await eliminarProducto(id);
            cargarProductos();
        } catch (error) {
            console.error(error);
        }
    };

    const limpiarFormulario = () => {
        setFormulario({
            id_categoria: "",
            nombre_producto: "",
            descripcion: "",
            caracteristicas: "",
            stock: "",
            precio: "",
            imagen: ""
        });
        setPreviewImagen("");
        setEditando(null);
    };

    
    // FUNCIÓN PARA CERRAR EL MODAL
    const handleClose = () => {
        limpiarFormulario();
        onClose();
    };

    
    // RENDER
    if (!abierto) return null;

    return (
        <div className="modal-overlay" onClick={(e) => {
            if (e.target === e.currentTarget) {
                handleClose();
            }
        }}>
            <div className="modal-content modal-productos-stand">
                {/* BOTÓN CERRAR */}
                <button className="modal-close" onClick={handleClose}>
                    ×
                </button>

                {/* HEADER - Información del puesto (si es modo mapa) */}
                {isMapMode && standData && (
                    <div className="stand-info-header">
                        <div className="stand-info-main">
                            <h2>
                                <FaStore /> Puesto #{standData.number}
                            </h2>
                            <span className="section-badge">{standData.section}</span>
                            {isOwner && (
                                <span className="owner-badge">⭐ Tu puesto</span>
                            )}
                        </div>
                        
                        <div className="stand-info-grid">
                            <div className="stand-info-item">
                                <FaUser />
                                <span><strong>Propietario:</strong> {standData.owner}</span>
                            </div>
                            {standData.rating && (
                                <div className="stand-info-item">
                                    <FaStar />
                                    <span><strong>Calificación:</strong> {standData.rating} ⭐</span>
                                </div>
                            )}
                        </div>

                        {standData.description && (
                            <div className="stand-info-item full-width">
                                <FaInfoCircle />
                                <span>{standData.description}</span>
                            </div>
                        )}
                    </div>
                )}

                {/* HEADER - Modo negocio (tu diseño original) */}
                {!isMapMode && (
                    <div className="modal-header">
                        <h2>
                            {editando ? "Editar producto" : "Administrar productos"}
                        </h2>
                    </div>
                )}

                {/* BODY - Formulario de productos*/}
                <div className="modal-body">
                    {/* Si es modo mapa, mostrar un título para los productos */}
                    {isMapMode && (
                        <div className="productos-section-title">
                            <h3><FaBox /> Productos disponibles</h3>
                            {isOwner && (
                                <button 
                                    className="btn-add-producto"
                                    onClick={() => setEditando(null)}
                                >
                                    <FaPlus /> Agregar producto
                                </button>
                            )}
                        </div>
                    )}

                    {/* Formulario de producto (si está en modo edición o es dueño) */}
                    {(isOwner || editando) && (
                        <>
                            <div className="form-group">
                                <label>Imagen del producto</label>
                                <label className="logo-upload">
                                    {previewImagen ? (
                                        <img
                                            src={previewImagen}
                                            alt="Producto"
                                            className="preview-logo"
                                        />
                                    ) : (
                                        <>
                                            <div className="logo-icon">📦</div>
                                            <p>Haz clic para seleccionar la imagen</p>
                                            <small>PNG, JPG o WEBP (máx. 5MB)</small>
                                        </>
                                    )}
                                    <input
                                        type="file"
                                        hidden
                                        accept="image/png,image/jpeg,image/webp"
                                        onChange={subirImagen}
                                    />
                                </label>
                            </div>

                            {subiendoImagen && (
                                <div className="uploading">⏳ Subiendo imagen...</div>
                            )}

                            {previewImagen && !subiendoImagen && (
                                <button
                                    type="button"
                                    className="btn-eliminar-logo"
                                    onClick={() => {
                                        setPreviewImagen("");
                                        setFormulario({
                                            ...formulario,
                                            imagen: ""
                                        });
                                    }}
                                >
                                    🗑 Cambiar imagen
                                </button>
                            )}

                            <div className="form-group">
                                <label>Categoría</label>
                                <select
                                    value={formulario.id_categoria}
                                    onChange={(e) =>
                                        setFormulario({
                                            ...formulario,
                                            id_categoria: e.target.value
                                        })
                                    }
                                >
                                    <option value="">Seleccione una categoría</option>
                                    {categorias.map((categoria) => (
                                        <option
                                            key={categoria.id_categoria}
                                            value={categoria.id_categoria}
                                        >
                                            {categoria.nombre_categoria}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Nombre</label>
                                <input
                                    placeholder="Nombre del producto"
                                    value={formulario.nombre_producto}
                                    onChange={(e) =>
                                        setFormulario({
                                            ...formulario,
                                            nombre_producto: e.target.value
                                        })
                                    }
                                />
                            </div>

                            <div className="form-group">
                                <label>Descripción</label>
                                <textarea
                                    rows="3"
                                    value={formulario.descripcion}
                                    onChange={(e) =>
                                        setFormulario({
                                            ...formulario,
                                            descripcion: e.target.value
                                        })
                                    }
                                />
                            </div>

                            <div className="form-group">
                                <label>Características</label>
                                <textarea
                                    rows="3"
                                    value={formulario.caracteristicas}
                                    onChange={(e) =>
                                        setFormulario({
                                            ...formulario,
                                            caracteristicas: e.target.value
                                        })
                                    }
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Stock</label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={formulario.stock}
                                        onChange={(e) =>
                                            setFormulario({
                                                ...formulario,
                                                stock: e.target.value === "" ? "" : Number(e.target.value)
                                            })
                                        }
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Precio</label>
                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={formulario.precio}
                                        onChange={(e) =>
                                            setFormulario({
                                                ...formulario,
                                                precio: e.target.value === "" ? "" : Number(e.target.value)
                                            })
                                        }
                                    />
                                </div>
                            </div>

                            <div className="acciones-formulario">
                                <button
                                    className="btn-green"
                                    disabled={subiendoImagen}
                                    onClick={guardar}
                                >
                                    {editando ? (
                                        <>
                                            <FaEdit /> Actualizar
                                        </>
                                    ) : (
                                        <>
                                            <FaPlus /> Guardar
                                        </>
                                    )}
                                </button>

                                {editando && (
                                    <button
                                        type="button"
                                        className="btn-orange"
                                        onClick={limpiarFormulario}
                                    >
                                        Cancelar
                                    </button>
                                )}
                            </div>
                        </>
                    )}

                    {/* LISTA DE PRODUCTOS */}
                    <div className="lista-medios">
                        {productos.length === 0 ? (
                            <p className="sin-medios">
                                {isOwner 
                                    ? "No has registrado productos. ¡Agrega uno!"
                                    : "Este puesto no tiene productos registrados aún."
                                }
                            </p>
                        ) : (
                            productos.map((producto) => (
                                <div
                                    className="card-medio"
                                    key={producto.id_producto}
                                >
                                    {producto.imagen && (
                                        <img
                                            className="mini-producto"
                                            src={producto.imagen}
                                            alt={producto.nombre_producto}
                                        />
                                    )}
                                    <h4>{producto.nombre_producto}</h4>
                                    <p>
                                        <strong>Categoría:</strong>{" "}
                                        {producto.categoria?.nombre_categoria}
                                    </p>
                                    <p>
                                        <strong>Precio:</strong>{" "}
                                        {Number(producto.precio)
                                            .toLocaleString(
                                                "es-CO",
                                                {
                                                    style: "currency",
                                                    currency: "COP"
                                                }
                                            )}
                                    </p>
                                    <p>
                                        <strong>Stock:</strong> {producto.stock}
                                    </p>
                                    <p>
                                        <strong>Estado:</strong> {producto.estado_producto}
                                    </p>

                                    {/* Acciones solo si es dueño */}
                                    {isOwner && (
                                        <div className="acciones-medio">
                                            <button
                                                className="btn-orange"
                                                onClick={() => editar(producto)}
                                            >
                                                <span>Editar</span>
                                            </button>
                                            <button
                                                className="btn-delete"
                                                onClick={() => eliminar(producto.id_producto)}
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/*FOOTER */}
                <div className="modal-footer">
                    <button
                        className="btn-orange"
                        onClick={handleClose}
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};
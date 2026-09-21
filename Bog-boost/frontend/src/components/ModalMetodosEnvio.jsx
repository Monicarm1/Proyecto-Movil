import { useEffect, useState } from "react";

import {
    FaPlus,
    FaEdit,
    FaTrash
} from "react-icons/fa";

import {
    obtenerMisMetodosEnvio,
    crearMetodoEnvio,
    actualizarMetodoEnvio,
    eliminarMetodoEnvio
} from "../api/metodoEnvioApi";

import "../styles/PerfilNegocio.css";

export default function ModalMetodosEnvio({
    abierto,
    onClose,
    idNegocio
}) {
    const [metodos, setMetodos] = useState([]);

    const [formulario, setFormulario] = useState({
        nombre_metodo: "",
        descripcion_metodo: "",
        costo_envio: ""
    });

    const [editando, setEditando] = useState(null);

    useEffect(() => {
        if (abierto) {
            cargarMetodos();
            limpiarFormulario();
        }
    }, [abierto]);

    const cargarMetodos = async () => {
        try {
            const data = await obtenerMisMetodosEnvio();
            setMetodos(data);
        } catch (error) {
            console.error(error);
        }
    };

    const guardar = async () => {
        if (
            formulario.costo_envio === "" ||
            formulario.costo_envio < 0
        ) {
            alert("Ingresa un costo de envío válido.");
            return;
        }

        try {
            if (editando) {
                await actualizarMetodoEnvio(
                    editando,
                    formulario
                );
            } else {
                await crearMetodoEnvio({
                    ...formulario,
                    id_negocio: idNegocio
                });
            }

            limpiarFormulario();
            cargarMetodos();
        } catch (error) {
            console.error(error);
        }
    };

    const editar = (metodo) => {
        setEditando(
            metodo.id_metodo_envio
        );

        setFormulario({
            nombre_metodo: metodo.nombre_metodo,
            descripcion_metodo: metodo.descripcion_metodo,
            costo_envio: metodo.costo_envio
        });
    };

    const eliminar = async (id) => {
        if (!window.confirm("¿Eliminar este método de envío?")) {
            return;
        }

        await eliminarMetodoEnvio(id);
        cargarMetodos();
    };

    const limpiarFormulario = () => {
        setFormulario({
            nombre_metodo: "",
            descripcion_metodo: "",
            costo_envio: ""
        });

        setEditando(null);
    };

    if (!abierto) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>
                        {
                            editando
                                ? "Editar método de envío"
                                : "Administrar métodos de envío"
                        }
                    </h2>
                </div>

                <div className="modal-body">
                    <div className="form-group">
                        <label>
                            Nombre
                        </label>
                        <input
                            type="text"
                            placeholder="Ej: Domicilio"
                            value={formulario.nombre_metodo}
                            onChange={(e) => {
                                // Permitir solo letras, acentos, eñes y espacios
                                const soloLetras = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
                                setFormulario({
                                    ...formulario,
                                    nombre_metodo: soloLetras
                                });
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <label>
                            Descripción
                        </label>
                        <input
                            placeholder="Descripción"
                            value={formulario.descripcion_metodo}
                            onChange={(e) =>
                                setFormulario({
                                    ...formulario,
                                    descripcion_metodo: e.target.value
                                })
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label>
                            Costo
                        </label>
                        <input
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="Ej: 15000"
                            value={formulario.costo_envio}
                            onChange={(e) =>
                                setFormulario({
                                    ...formulario,
                                    costo_envio:
                                        e.target.value === ""
                                            ? ""
                                            : Number(e.target.value)
                                })
                            }
                        />
                    </div>

                    <div className="acciones-formulario">
                        <button
                            className="btn-green"
                            onClick={guardar}
                        >
                            {editando ? <FaEdit /> : <FaPlus />}
                            <span>
                                {editando ? "Actualizar" : "Guardar"}
                            </span>
                        </button>

                        {
                            editando && (
                                <button
                                    type="button"
                                    className="btn-orange"
                                    onClick={limpiarFormulario}
                                >
                                    Cancelar
                                </button>
                            )
                        }
                    </div>

                    <div className="lista-medios">
                        {
                            metodos.length === 0 ? (
                                <p className="sin-medios">
                                    No has registrado métodos de envío.
                                </p>
                            ) : (
                                metodos.map((metodo) => (
                                    <div
                                        className="card-medio"
                                        key={metodo.id_metodo_envio}
                                    >
                                        <h4>
                                            {metodo.nombre_metodo}
                                        </h4>
                                        <p>
                                            <strong>Descripción:</strong>{" "}
                                            {metodo.descripcion_metodo}
                                        </p>
                                        <p>
                                            <strong>Costo:</strong>{" "}
                                            {Number(metodo.costo_envio).toLocaleString("es-CO", {
                                                style: "currency",
                                                currency: "COP"
                                            })}
                                        </p>
                                        <div className="acciones-medio">
                                            <button
                                                className="btn-orange"
                                                onClick={() =>
                                                    editar(metodo)
                                                }
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                className="btn-delete"
                                                onClick={() =>
                                                    eliminar(
                                                        metodo.id_metodo_envio
                                                    )
                                                }
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )
                        }
                    </div>
                </div>

                <div className="modal-footer">
                    <button
                        className="btn-orange"
                        onClick={() => {
                            limpiarFormulario();
                            onClose();
                        }}
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
}
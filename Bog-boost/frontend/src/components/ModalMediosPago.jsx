import { useEffect, useState } from "react";
import {
    FaPlus,
    FaEdit,
    FaTrash
} from "react-icons/fa";

import {
    obtenerMisMediosPago,
    crearMedioPago,
    actualizarMedioPago,
    eliminarMedioPago
} from "../api/medioPagoApi";

import "../styles/PerfilNegocio.css";

export default function ModalMediosPago({
    abierto,
    onClose,
    idNegocio
}) {
    const [medios, setMedios] = useState([]);
    const [formulario, setFormulario] = useState({
        nombre_medio: "",
        numero_medio: "",
        llave_medio: ""
    });

    const [editando, setEditando] = useState(null);

    useEffect(() => {
        if (abierto) {
            cargarMedios();
            limpiarFormulario();
        }
    }, [abierto]);

    const cargarMedios = async () => {
        try {
            const data = await obtenerMisMediosPago();
            setMedios(data);
        } catch (error) {
            console.error(error);
        }
    };

    const guardar = async () => {
        try {
            if (editando) {
                await actualizarMedioPago(
                    editando,
                    formulario
                );
            } else {
                await crearMedioPago({
                    ...formulario,
                    id_negocio: idNegocio
                });
            }

            limpiarFormulario();
            cargarMedios();
        } catch (error) {
            console.error(error);
        }
    };

    const editar = (medio) => {
        setEditando(medio.id_medio_pago);
        setFormulario({
            nombre_medio: medio.nombre_medio,
            numero_medio: medio.numero_medio,
            llave_medio: medio.llave_medio
        });
    };

    const eliminar = async (id) => {
        if (!window.confirm("¿Eliminar este medio de pago?")) {
            return;
        }

        await eliminarMedioPago(id);
        cargarMedios();
    };

    const limpiarFormulario = () => {
        setFormulario({
            nombre_medio: "",
            numero_medio: "",
            llave_medio: ""
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
                                ? "Editar medio de pago"
                                : "Administrar medios de pago"
                        }
                    </h2>
                </div>

                <div className="modal-body">
                    <div className="form-group">
                        <label>
                            Nombre del medio
                        </label>
                        <input
                            type="text"
                            placeholder="Ej: Nequi"
                            value={formulario.nombre_medio}
                            onChange={(e) => {
                                // Permitir solo letras, acentos, eñes y espacios
                                const soloLetras = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
                                setFormulario({
                                    ...formulario,
                                    nombre_medio: soloLetras
                                });
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <label>
                            Número
                        </label>
                        <input
                            type="text"
                            inputMode="numeric"
                            placeholder="Número"
                            value={formulario.numero_medio}
                            onChange={(e) => {
                                // Permitir únicamente números
                                const soloNumeros = e.target.value.replace(/\D/g, "");
                                setFormulario({
                                    ...formulario,
                                    numero_medio: soloNumeros
                                });
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <label>
                            Llave
                        </label>
                        <input
                            type="text"
                            placeholder="Correo o celular"
                            value={formulario.llave_medio}
                            onChange={(e) =>
                                setFormulario({
                                    ...formulario,
                                    llave_medio: e.target.value
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
                            medios.length === 0 ? (
                                <p className="sin-medios">
                                    No has registrado medios de pago.
                                </p>
                            ) : (
                                medios.map((medio) => (
                                    <div
                                        className="card-medio"
                                        key={medio.id_medio_pago}
                                    >
                                        <h4>
                                            {medio.nombre_medio}
                                        </h4>
                                        <p>
                                            <strong>Número:</strong>{" "}
                                            {medio.numero_medio}
                                        </p>
                                        <p>
                                            <strong>Llave:</strong>{" "}
                                            {medio.llave_medio}
                                        </p>
                                        <div className="acciones-medio">
                                            <button
                                                className="btn-orange"
                                                onClick={() => editar(medio)}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                className="btn-delete"
                                                onClick={() =>
                                                    eliminar(
                                                        medio.id_medio_pago
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
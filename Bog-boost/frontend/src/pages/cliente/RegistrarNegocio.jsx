import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// ============================================
// IMPORTS DE APIS
// ============================================
import { subirLogo as subirLogoApi } from "../../api/uploadApi";
import { registrarNegocio } from "../../api/negocioApi";
import { obtenerMiPerfil } from "../../api/perfilApi";
import {
    getAvailableStands,
    assignStandToBusiness,
} from "../../api/api";

import "../../styles/RegistrarNegocio.css";

function RegistrarNegocio() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [cargandoPerfil, setCargandoPerfil] = useState(true);

    // ============================================
    // ESTADOS
    // ============================================
    const [datos, setDatos] = useState({
        nombre_negocio: "",
        descripcion_negocio: "",
        telefono_negocio: "",
        numero_puesto: "",
        logo: "",
    });

    const [subiendoLogo, setSubiendoLogo] = useState(false);
    const [previewLogo, setPreviewLogo] = useState("");
    const [loading, setLoading] = useState(false);
    const [availableStands, setAvailableStands] = useState([]);
    const [cargandoPuestos, setCargandoPuestos] = useState(false);

    // ============================================
    // VALIDAR PERFIL
    // ============================================
    useEffect(() => {
        const verificarPerfil = async () => {
            try {
                const perfil = await obtenerMiPerfil();

                const perfilIncompleto =
                    !perfil.primer_nombre ||
                    !perfil.primer_apellido ||
                    !perfil.id_tipo_documento ||
                    !perfil.numero_documento;

                if (perfilIncompleto) {
                    alert(
                        "Por favor, completa la información de tu perfil personal antes de registrar un negocio."
                    );

                    navigate("/perfil");
                    return;
                }
            } catch (error) {
                console.error(
                    "Error al verificar el perfil:",
                    error
                );

                alert(
                    "No se pudo verificar tu perfil. Inicia sesión nuevamente."
                );
            } finally {
                setCargandoPerfil(false);
            }
        };

        verificarPerfil();
    }, [navigate]);

    // ============================================
    // CARGAR PUESTOS DISPONIBLES
    // ============================================
    const loadAvailableStands = async () => {
        try {
            setCargandoPuestos(true);

            const data = await getAvailableStands();

            setAvailableStands(
                Array.isArray(data) ? data : []
            );
        } catch (error) {
            console.error(
                "Error al cargar puestos disponibles:",
                error
            );

            alert("Error al cargar los puestos disponibles.");
        } finally {
            setCargandoPuestos(false);
        }
    };

    useEffect(() => {
        loadAvailableStands();
    }, []);

    // ============================================
    // MANEJADOR DE CAMBIOS
    // ============================================
    const handleChange = (e) => {
        const { name, value } = e.target;

        setDatos((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // ============================================
    // SUBIR LOGO
    // ============================================
    const subirLogo = async (e) => {
        if (!e || !e.target) {
            console.error("Evento o target no definido.");
            return;
        }

        const file = e.target.files?.[0];

        if (!file) {
            console.warn("No se seleccionó ningún archivo.");
            return;
        }

        // Validar tipo de imagen
        if (!file.type || !file.type.startsWith("image/")) {
            alert("Solo se permiten imágenes.");
            e.target.value = "";
            return;
        }

        // Máximo 5 MB
        if (file.size > 5 * 1024 * 1024) {
            alert("La imagen no puede superar los 5 MB.");
            e.target.value = "";
            return;
        }

        const previewUrl = URL.createObjectURL(file);
        const imagen = new Image();

        imagen.src = previewUrl;

        try {
            // Validar dimensiones
            await new Promise((resolve, reject) => {
                imagen.onload = () => {
                    if (
                        imagen.width > 2500 ||
                        imagen.height > 2500
                    ) {
                        reject(
                            new Error(
                                "La imagen es demasiado grande. Máximo 2500x2500 píxeles."
                            )
                        );
                    } else {
                        resolve();
                    }
                };

                imagen.onerror = () => {
                    reject(
                        new Error(
                            "Error al cargar la imagen."
                        )
                    );
                };
            });

            // Mostrar preview
            setPreviewLogo(previewUrl);
            setSubiendoLogo(true);

            // Subir logo al backend
            const respuesta = await subirLogoApi(file);

            setDatos((prev) => ({
                ...prev,
                logo: respuesta.url,
            }));
        } catch (error) {
            console.error("Error al subir logo:", error);

            URL.revokeObjectURL(previewUrl);
            setPreviewLogo("");

            alert(
                error.response?.data?.mensaje ||
                    error.message ||
                    "Error al subir el logo."
            );
        } finally {
            setSubiendoLogo(false);

            // Permitir seleccionar nuevamente el mismo archivo
            e.target.value = "";
        }
    };

    // ============================================
    // GUARDAR SOLICITUD
    // ============================================
    const guardarSolicitud = async (e) => {
        e.preventDefault();

        // ============================================
        // VALIDACIONES
        // ============================================

        if (!datos.logo) {
            alert("Debes subir el logo del negocio.");
            return;
        }

        if (!datos.nombre_negocio.trim()) {
            alert("Ingresa el nombre del negocio.");
            return;
        }

        if (!datos.descripcion_negocio.trim()) {
            alert("Ingresa una descripción.");
            return;
        }

        if (!datos.telefono_negocio.trim()) {
            alert("Ingresa el teléfono.");
            return;
        }

        if (!datos.numero_puesto) {
            alert("Selecciona un número de puesto disponible.");
            return;
        }

        // ============================================
        // VERIFICAR DISPONIBILIDAD DEL PUESTO
        // ============================================
        const standSeleccionado = availableStands.find(
            (stand) =>
                Number(stand.number) ===
                Number(datos.numero_puesto)
        );

        if (!standSeleccionado) {
            alert(
                "El puesto seleccionado no está disponible. Por favor, elige otro."
            );

            await loadAvailableStands();
            return;
        }

        setLoading(true);

        try {
            // ============================================
            // 1. REGISTRAR NEGOCIO
            // ============================================
            const respuesta = await registrarNegocio({
                nombre_negocio:
                    datos.nombre_negocio.trim(),

                descripcion_negocio:
                    datos.descripcion_negocio.trim(),

                telefono_negocio:
                    datos.telefono_negocio.trim(),

                numero_puesto:
                    Number(datos.numero_puesto),

                logo: datos.logo,
            });

            console.log(
                "Negocio registrado:",
                respuesta
            );

            // ============================================
            // 2. ASIGNAR NEGOCIO AL PUESTO
            // ============================================
            const negocioId =
                respuesta.id ||
                respuesta.id_negocio;

            if (!negocioId) {
                throw new Error(
                    "El negocio fue registrado, pero no se recibió su ID."
                );
            }

            await assignStandToBusiness(
                datos.numero_puesto,
                {
                    negocioId,
                    userId: user?.id,
                    ownerName: datos.nombre_negocio,
                    products: [],
                    description:
                        datos.descripcion_negocio,
                }
            );

            // ============================================
            // 3. MENSAJE DE ÉXITO
            // ============================================
            alert(
                `✅ ¡Éxito! Tu negocio "${datos.nombre_negocio}" ha sido registrado y asignado al puesto #${datos.numero_puesto}.`
            );

            // ============================================
            // 4. LIMPIAR FORMULARIO
            // ============================================
            setDatos({
                nombre_negocio: "",
                descripcion_negocio: "",
                telefono_negocio: "",
                numero_puesto: "",
                logo: "",
            });

            setPreviewLogo("");

            // ============================================
            // 5. ACTUALIZAR PUESTOS DISPONIBLES
            // ============================================
            await loadAvailableStands();
        } catch (error) {
            console.error(
                "Error al registrar negocio:",
                error
            );

            alert(
                error.response?.data?.mensaje ||
                    error.response?.data?.message ||
                    error.message ||
                    "Error al registrar el negocio. Por favor, intenta de nuevo."
            );
        } finally {
            setLoading(false);
        }
    };

    // ============================================
    // SELECCIONAR PUESTO DESDE EL MAPA
    // ============================================
    const handleStandSelect = (standNumber) => {
        setDatos((prev) => ({
            ...prev,
            numero_puesto: String(standNumber),
        }));
    };

    // ============================================
    // ELIMINAR / CAMBIAR LOGO
    // ============================================
    const eliminarLogo = () => {
        setPreviewLogo("");

        setDatos((prev) => ({
            ...prev,
            logo: "",
        }));
    };

    // ============================================
    // MOSTRAR CARGA MIENTRAS SE VERIFICA PERFIL
    // ============================================
    if (cargandoPerfil) {
        return (
            <main className="registro-negocio-container">
                <div className="registro-negocio-card">
                    <p
                        style={{
                            textAlign: "center",
                            padding: "20px",
                        }}
                    >
                        Verificando información del perfil...
                    </p>
                </div>
            </main>
        );
    }

    // ============================================
    // RENDER
    // ============================================
    return (
        <main className="registro-negocio-container">
            <div className="registro-negocio-card">
                <h1>
                    Solicitud de Registro de Negocio
                </h1>

                <p className="subtitle">
                    Solo se aceptan negocios que tengan un
                    puesto fijo dentro del Mercado de las
                    Pulgas San Alejo.
                    <br />

                    <strong>
                        Puestos disponibles:{" "}
                        {availableStands.length}
                    </strong>
                </p>

                <form onSubmit={guardarSolicitud}>

                    {/* ========================================
                        LOGO
                    ======================================== */}
                    <label>
                        <i className="fas fa-image"></i>{" "}
                        Logo del negocio
                    </label>

                    <label className="logo-upload">
                        {previewLogo ? (
                            <img
                                src={previewLogo}
                                alt="Logo del negocio"
                                className="preview-logo"
                            />
                        ) : (
                            <>
                                <div className="logo-icon">
                                    🏪
                                </div>

                                <p>
                                    Haz clic para seleccionar
                                    el logo
                                </p>

                                <small>
                                    PNG, JPG o WEBP (máx. 5 MB)
                                </small>
                            </>
                        )}

                        <input
                            type="file"
                            hidden
                            accept="image/png,image/jpeg,image/webp"
                            onChange={subirLogo}
                        />
                    </label>

                    {subiendoLogo && (
                        <div className="uploading">
                            ⏳ Subiendo logo...
                        </div>
                    )}

                    {previewLogo && !subiendoLogo && (
                        <button
                            type="button"
                            className="btn-eliminar-logo"
                            onClick={eliminarLogo}
                        >
                            🗑 Cambiar logo
                        </button>
                    )}

                    {/* ========================================
                        NOMBRE
                    ======================================== */}
                    <label>
                        <i className="fas fa-store"></i>{" "}
                        Nombre del negocio
                    </label>

                    <input
                        type="text"
                        name="nombre_negocio"
                        value={datos.nombre_negocio}
                        onChange={(e) => {
                            const soloLetras =
                                e.target.value.replace(
                                    /[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g,
                                    ""
                                );

                            setDatos((prev) => ({
                                ...prev,
                                nombre_negocio: soloLetras,
                            }));
                        }}
                        placeholder="Ej: Antigüedades San Alejo"
                    />

                    {/* ========================================
                        DESCRIPCIÓN
                    ======================================== */}
                    <label>
                        <i className="fas fa-align-left"></i>{" "}
                        Descripción
                    </label>

                    <textarea
                        name="descripcion_negocio"
                        value={datos.descripcion_negocio}
                        onChange={handleChange}
                        placeholder="Describe tu negocio"
                        rows="4"
                    />

                    {/* ========================================
                        TELÉFONO
                    ======================================== */}
                    <label>
                        <i className="fas fa-phone"></i>{" "}
                        Teléfono
                    </label>

                    <input
                        type="text"
                        name="telefono_negocio"
                        inputMode="numeric"
                        value={datos.telefono_negocio}
                        onChange={(e) => {
                            const soloNumeros =
                                e.target.value.replace(
                                    /\D/g,
                                    ""
                                );

                            setDatos((prev) => ({
                                ...prev,
                                telefono_negocio:
                                    soloNumeros,
                            }));
                        }}
                        placeholder="Ej: 3012345678"
                    />

                    {/* ========================================
                        SELECCIÓN DE PUESTO
                    ======================================== */}
                    <label>
                        <i className="fas fa-map-marker-alt"></i>{" "}
                        Número del puesto
                    </label>

                    <select
                        name="numero_puesto"
                        value={datos.numero_puesto}
                        onChange={handleChange}
                        className="stand-select"
                        disabled={cargandoPuestos}
                    >
                        <option value="">
                            -- Selecciona un puesto disponible --
                        </option>

                        {availableStands.map((stand) => (
                            <option
                                key={stand.id}
                                value={stand.number}
                            >
                                Puesto #{stand.number} -{" "}
                                {stand.section}

                                {stand.size
                                    ? ` - ${stand.size}`
                                    : ""}

                                {stand.price
                                    ? ` ($${Number(
                                        stand.price
                                    ).toLocaleString()}/mes)`
                                    : ""}
                            </option>
                        ))}
                    </select>

                    {cargandoPuestos && (
                        <div className="cargando-puestos">
                            ⏳ Cargando puestos disponibles...
                        </div>
                    )}

                    {availableStands.length === 0 &&
                        !cargandoPuestos && (
                            <div className="sin-puestos">
                                ⚠️ No hay puestos disponibles
                                en este momento.
                            </div>
                        )}

                    {/* ========================================
                        MAPA INTERACTIVO
                    ======================================== */}
                    <div className="stand-map-preview">
                        <h4>
                            <i className="fas fa-map"></i>{" "}
                            Selecciona tu puesto en el mapa
                        </h4>

                        <p className="map-hint">
                            Haz clic en cualquier número verde
                            para seleccionar tu puesto
                        </p>

                        <div className="mini-map">
                            {availableStands
                                .slice(0, 30)
                                .map((stand) => (
                                    <button
                                        type="button"
                                        key={stand.id}
                                        className={`stand-selector ${
                                            Number(
                                                datos.numero_puesto
                                            ) ===
                                            Number(
                                                stand.number
                                            )
                                                ? "selected"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            handleStandSelect(
                                                stand.number
                                            )
                                        }
                                        style={{
                                            position: "absolute",
                                            left: `${
                                                (stand.coordinates
                                                    ?.x ||
                                                    stand.number) *
                                                    1.8 +
                                                20
                                            }px`,
                                            top: `${
                                                (stand.coordinates
                                                    ?.y ||
                                                    1) *
                                                    1.8 +
                                                20
                                            }px`,
                                        }}
                                        title={`Puesto #${stand.number} - ${stand.section}`}
                                    >
                                        {stand.number}
                                    </button>
                                ))}

                            <div className="map-legend-mini">
                                <span className="legend-dot available"></span>{" "}
                                Disponible
                            </div>
                        </div>
                    </div>

                    {/* ========================================
                        BOTÓN DE REGISTRO
                    ======================================== */}
                    <button
                        type="submit"
                        className="btn-registrar"
                        disabled={
                            subiendoLogo ||
                            loading ||
                            availableStands.length === 0
                        }
                    >
                        {subiendoLogo
                            ? "⏳ Subiendo logo..."
                            : loading
                            ? "⏳ Registrando..."
                            : "📝 Enviar solicitud"}
                    </button>

                    {loading && (
                        <div className="registrando-mensaje">
                            ⏳ Registrando tu negocio y asignando
                            el puesto...
                        </div>
                    )}
                </form>
            </div>
        </main>
    );
}

export default RegistrarNegocio;
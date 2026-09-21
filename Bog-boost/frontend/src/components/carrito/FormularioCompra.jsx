import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { obtenerMiPerfil, actualizarPerfil } from "../../api/perfilApi";
import { obtenerMediosPagoPorNegocio } from "../../api/medioPagoApi";
import { obtenerMetodosEnvioPorNegocio } from "../../api/metodoEnvioApi";
import { confirmarCarrito } from "../../api/ventaApi";
import ModalComprobante from './ModalComprobante';

import "../../styles/FormularioCompra.css";

function FormularioCompra({
    carrito,
    total,
    onCerrar,
    onCompraExitosa
}) {

    const [perfil, setPerfil] = useState({
        primer_nombre: "",
        segundo_nombre: "",
        primer_apellido: "",
        segundo_apellido: "",
        id_tipo_documento: "",
        numero_documento: "",
        email: ""
    });

    const [mediosPago, setMediosPago] = useState([]);
    const [metodosEnvio, setMetodosEnvio] = useState([]);
    const [idMedioPago, setIdMedioPago] = useState("");
    const [idMetodoEnvio, setIdMetodoEnvio] = useState("");
    const [telefono, setTelefono] = useState("");
    const [direccion, setDireccion] = useState("");

    // Estados para controlar el Modal
    const [showComprobante, setShowComprobante] = useState(false);
    const [ventaConfirmada, setVentaConfirmada] = useState(null);

   useEffect(() => {
    console.log("Carrito actual en FormularioCompra:", carrito); // <-- ¿Aquí sí imprime algo?

    if (carrito && carrito.length > 0) {
        const id = carrito[0].id_negocio;
        
        if (id !== undefined && id !== null) {
            cargarDatos(id);
        } else {
            console.warn("El producto en el carrito no tiene id_negocio");
        }
    }
    cargarPerfil();
}, [carrito]);

    const cargarDatos = async (id) => {
        try {
            const pagos = await obtenerMediosPagoPorNegocio(id);
            const envios = await obtenerMetodosEnvioPorNegocio(id);
            console.log("Lo que devuelve obtenerMetodosEnvioPorNegocio:", envios);
            setMediosPago(pagos);
            setMetodosEnvio(envios);
        } catch (error) {
            console.error("Error al cargar:", error);
            toast.error("No fue posible cargar la información.");
        }
    };

    const cargarPerfil = async () => {
        try {
            const data = await obtenerMiPerfil();
            setPerfil({
                primer_nombre: data.primer_nombre ?? "",
                segundo_nombre: data.segundo_nombre ?? "",
                primer_apellido: data.primer_apellido ?? "",
                segundo_apellido: data.segundo_apellido ?? "",
                id_tipo_documento: data.id_tipo_documento ?? "",
                numero_documento: data.numero_documento ?? "",
                email: data.email ?? ""
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handlePerfilChange = (e) => {
        setPerfil({
            ...perfil,
            [e.target.name]: e.target.value
        });
    };

    const confirmarCompra = async () => {
        if (!perfil.primer_nombre || !perfil.primer_apellido || !perfil.id_tipo_documento || !perfil.numero_documento) {
            toast.error("Completa los datos de tu perfil.");
            return;
        }

        if (!idMedioPago || !idMetodoEnvio || !telefono || !direccion) {
            toast.error("Completa toda la información.");
            return;
        }

        try {
            await actualizarPerfil({
                primer_nombre: perfil.primer_nombre,
                segundo_nombre: perfil.segundo_nombre,
                primer_apellido: perfil.primer_apellido,
                segundo_apellido: perfil.segundo_apellido,
                id_tipo_documento: perfil.id_tipo_documento ? Number(perfil.id_tipo_documento) : "",
                numero_documento: perfil.numero_documento ? Number(perfil.numero_documento) : ""
            });

            const payload = {
                id_medio_pago: Number(idMedioPago),
                id_metodo_envio: Number(idMetodoEnvio),
                telefono,
                direccion,
                carrito: carrito.map((p) => ({
                    id_producto: p.id_producto,
                    cantidad: p.cantidad
                }))
            };

            const data = await confirmarCarrito(payload);
            toast.success(data.mensaje);

            // Guardamos la venta y abrimos el modal
            setVentaConfirmada(data.venta);
            setShowComprobante(true);
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.mensaje || "Error del servidor");
        }
    };


    const metodoSeleccionado = metodosEnvio.find((m) => m.id_metodo_envio == idMetodoEnvio);
    const costoEnvio = Number(metodoSeleccionado?.costo_envio || 0);
    const totalCompra = Number(total || 0) + costoEnvio;

    return (
        <div className="modal-overlay">
            {/* Si no se ha mostrado el comprobante, mostramos el formulario */}
            {!showComprobante ? (
                <div className="modal-compra">
                    <h2>Finalizar compra</h2>
                    <div className="contenido-compra">
                        <div className="seccion-compra">
                            <h3>Datos del comprador</h3>
                            <label>Primer nombre</label>
                            <input className="campo-compra" type="text" name="primer_nombre" value={perfil.primer_nombre} onChange={handlePerfilChange} />
                            <label>Segundo nombre</label>
                            <input className="campo-compra" type="text" name="segundo_nombre" value={perfil.segundo_nombre} onChange={handlePerfilChange} />
                            <label>Primer apellido</label>
                            <input className="campo-compra" type="text" name="primer_apellido" value={perfil.primer_apellido} onChange={handlePerfilChange} />
                            <label>Segundo apellido</label>
                            <input className="campo-compra" type="text" name="segundo_apellido" value={perfil.segundo_apellido} onChange={handlePerfilChange} />
                            <label>Tipo documento</label>
                            <select className="campo-compra" name="id_tipo_documento" value={perfil.id_tipo_documento} onChange={handlePerfilChange}>
                                <option value="">Seleccione...</option>
                                <option value="1">Cédula de Ciudadanía</option>
                                <option value="2">Cédula de Extranjería</option>
                            </select>
                            <label>Número documento</label>
                            <input className="campo-compra" type="text" name="numero_documento" value={perfil.numero_documento} onChange={handlePerfilChange} />
                            <label>Correo electrónico</label>
                            <input className="campo-compra" type="email" value={perfil.email} disabled />
                        </div>

                        <div className="seccion-compra">
                            <h3>Datos de la compra</h3>
                            <label>Medio de pago</label>
                            <select className="campo-compra" value={idMedioPago} onChange={(e) => setIdMedioPago(e.target.value)}>
                                <option value="">Seleccione...</option>
                                {mediosPago.map((medio) => (
                                    <option key={medio.id_medio_pago} value={medio.id_medio_pago}>{medio.nombre_medio}</option>
                                ))}
                            </select>
                            <label>Método de envío</label>
                            <select className="campo-compra" value={idMetodoEnvio} onChange={(e) => setIdMetodoEnvio(e.target.value)}>
                                <option value="">Seleccione...</option>
                                {metodosEnvio.map((metodo) => (
                                    <option key={metodo.id_metodo_envio} value={metodo.id_metodo_envio}>{metodo.nombre_metodo}</option>
                                ))}
                            </select>
                            <label>Teléfono</label>
                            <input className="campo-compra" type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                            <label>Dirección</label>
                            <input className="campo-compra" type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
                            
                            <div className="total-box">
                                <h4>Resumen</h4>
                                <div className="linea-total"><span>Productos</span><span>{total.toLocaleString("es-CO", { style: "currency", currency: "COP" })}</span></div>
                                <div className="linea-total"><span>Envío</span><span>{costoEnvio.toLocaleString("es-CO", { style: "currency", currency: "COP" })}</span></div>
                                <hr />
                                <div className="linea-total total-final"><span>Total</span><span>{totalCompra.toLocaleString("es-CO", { style: "currency", currency: "COP" })}</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="botones-modal">
                        <button onClick={onCerrar}>Cancelar</button>
                        <button onClick={confirmarCompra}>Confirmar compra</button>
                    </div>
                </div>
            ) : (
                // Cuando showComprobante es true, renderizamos el modal
                <ModalComprobante 
                    venta={ventaConfirmada} 
                    onClose={() => {
                        setShowComprobante(false);
                        onCompraExitosa(); // Limpia el carrito
                        onCerrar();        // Cierra el formulario
                    }} 
                />
            )}
        </div>
    );
}

export default FormularioCompra;
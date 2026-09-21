import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useCarrito } from "../../context/CarritoContext";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

function ProductCard({ producto }) {

    const navigate = useNavigate();
    const { agregarProducto } = useCarrito();
    const { isAuthenticated } = useAuth();

    const agregarAlCarrito = (e) => {
        e.stopPropagation();

        if (!isAuthenticated) {
            navigate("/login");
            return;
        }

        // 🟢 logueado → agregar al carrito global
        agregarProducto({
            id_producto: producto.id_producto,
            id_negocio: producto.id_negocio,
            nombre_producto: producto.nombre_producto,
            precio: producto.precio,
            imagen: producto.imagen,
            nombre_negocio: producto.nombre_negocio,
            cantidad: 1
        });


        toast.success("Producto agregado al carrito");

        console.log("Agregado al carrito:", producto);
    };


    const abrirDetalle = () => {
        navigate(`/producto/${producto.id_producto}`);
    };

    return (
        <div
            className="carrusel-item"
            onClick={abrirDetalle}
        >
            <div className="producto-imagen">
                {producto.imagen ? (
                    <img
                        src={producto.imagen}
                        alt={producto.nombre_producto}
                        className="producto-img"
                    />
                ) : (
                    <div className="sin-imagen">
                        Sin imagen
                    </div>
                )}
            </div>

            <div className="producto-info-carrusel">

                <h4>{producto.nombre_producto}</h4>

                <p className="categoria-producto">
                    {producto.categoria?.nombre_categoria}
                </p>

                <p className="descripcion-producto">
                    {producto.descripcion}
                </p>

                <span className="producto-precio-carrusel">
                    {Number(producto.precio).toLocaleString("es-CO", {
                        style: "currency",
                        currency: "COP"
                    })}
                </span>

                <button
                    className="btn-carrito"
                    onClick={agregarAlCarrito}
                >
                    <FaShoppingCart />
                    Agregar
                </button>

            </div>
        </div>
    );
}

export default ProductCard;
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

function HomeCarousel({ title, productos = [] }) {

    const [pagina, setPagina] = useState(0);

    const itemsPorPagina = 4;

    const totalPaginas = Math.max(
        1,
        Math.ceil(productos.length / itemsPorPagina)
    );

    useEffect(() => {
        setPagina(0);
    }, [productos]);

    const inicio = pagina * itemsPorPagina;

    const productosVisibles = productos.slice(
        inicio,
        inicio + itemsPorPagina
    );

    const siguiente = () => {

        if (pagina >= totalPaginas - 1) {

            setPagina(0);

        } else {

            setPagina(pagina + 1);

        }

    };

    const anterior = () => {

        if (pagina <= 0) {

            setPagina(totalPaginas - 1);

        } else {

            setPagina(pagina - 1);

        }

    };

    return (

        <div className="carrusel-container">

            <h2 className="carrusel-title">
                {title}
            </h2>

            <div className="carrusel-wrapper">

                <button
                    className="carrusel-btn"
                    onClick={anterior}
                >
                    ❮
                </button>

                <div className="carrusel-track">

                    {productosVisibles.length === 0 ? (

                        <p className="sin-productos">
                            No hay productos disponibles.
                        </p>

                    ) : (

                        productosVisibles.map((producto) => (

                            <ProductCard
                                key={producto.id_producto}
                                producto={producto}
                            />

                        ))

                    )}

                </div>

                <button
                    className="carrusel-btn"
                    onClick={siguiente}
                >
                    ❯
                </button>

            </div>

        </div>

    );

}

export default HomeCarousel;
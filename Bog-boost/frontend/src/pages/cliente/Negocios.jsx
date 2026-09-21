import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { obtenerNegociosPublicos } from "../../api/negocioApi";
import toast from "react-hot-toast";
import "../../styles/Negocios.css";

function Negocios() {
    const [negocios, setNegocios] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        cargarNegocios();
    }, []);

    const cargarNegocios = async () => {
        try {
            const data = await obtenerNegociosPublicos();
            setNegocios(data);
        } catch (error) {
            console.error(error);
            toast.error("Error al cargar negocios");
        }
    };

    return (
        <div className="negocios-container">
            <h2>Negocios disponibles</h2>

            <div className="negocios-grid">
                {negocios.map((negocio) => (
                    <div
                        key={negocio.id_negocio}
                        className="negocio-card"
                        onClick={() =>
                            navigate(`/negocios/${negocio.id_negocio}`)
                        }
                    >
                        <img
                            src={negocio.logo}
                            alt={negocio.nombre_negocio}
                            className="negocio-logo"
                        />

                        <h3>{negocio.nombre_negocio}</h3>

                        <p>{negocio.descripcion_negocio}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Negocios;
import { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import ModalInfoPuesto from '../components/mapa/ModalInfoPuesto';
import './MapaMercado.css';

const MapaMercado = () => {
  const [escala, setEscala] = useState(1);
  const [puestos, setPuestos] = useState([]);
  const [negocios, setNegocios] = useState([]);
  const [puestoSeleccionado, setPuestoSeleccionado] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarTodo = async () => {
      setCargando(true);
      
      const { data: listaPuestos, error: errorPuestos } = await supabase
        .from('puestos')
        .select('*');
      if (errorPuestos) console.error('Error puestos:', errorPuestos);
      else setPuestos(listaPuestos || []);

      const { data: listaNegocios } = await supabase
        .from('negocios')
        .select('*')
        .eq('estado', 'aceptado');
      setNegocios(listaNegocios || []);
      
      setCargando(false);
    };
    cargarTodo();
  }, []);

  const obtenerNegocio = (numeroPuesto) => {
    return negocios.find(n => String(n.numero_puesto) === String(numeroPuesto));
  };

  const manejarClicPuesto = (numeroPuesto) => {
    const puestoData = puestos.find(p => String(p.numero) === String(numeroPuesto)) || { numero: numeroPuesto };
    const negocio = obtenerNegocio(numeroPuesto);
    setPuestoSeleccionado({ ...puestoData, negocio });
  };

  const acercar = () => setEscala(p => Math.min(p + 0.2, 2.5));
  const alejar = () => setEscala(p => Math.max(p - 0.2, 0.5));
  const reiniciar = () => setEscala(1);

  if (cargando) return <div className="cargando">Cargando mapa...</div>;

  return (
    <div className="pagina-mapa">
      <h1>Mapa — Mercado de Pulgas San Alejo</h1>

      <div className="barra-controles">
        <button onClick={acercar}>+</button>
        <button onClick={alejar}>−</button>
        <button onClick={reiniciar}>↻ Restablecer</button>
      </div>

      <div className="contenedor-central">
        <div className="envoltorio-escalado">
          {/* El lienzo SVG maneja sus coordenadas x e y internas en una ViewBox de 1300x900 */}
          <svg 
            className="lienzo-mapa-svg"
            viewBox="0 0 1300 900"
            style={{ transform: `scale(${escala})` }}
          >
            {/* === REFERENCIAS VISUALES Y ARQUITECTURA === */}
            
            {/* MONSERRATE */}
            <g className="referencia-arquitectura" transform="translate(1000, 30)">
              <text x="50" y="50" className="label-icono">⛪</text>
              <text x="50" y="70" className="label-ref">MONSERRATE</text>
            </g>

            {/* MUSEO DE ARTE MODERNO */}
            <g className="referencia-arquitectura" transform="translate(450, 100)">
              <text x="100" y="40" className="label-icono">🏛️</text>
              <text x="100" y="60" className="label-ref">MUSEO DE ARTE MODERNO</text>
            </g>

            {/* PLANETARIO DISTRITAL */}
            <g className="referencia-arquitectura" transform="translate(100, 300)">
              <text x="50" y="50" className="label-icono">🪐</text>
              <text x="50" y="75" className="label-ref">PLANETARIO DISTRITAL</text>
            </g>

            {/* TORRE COLPATRIA */}
            <g className="referencia-arquitectura" transform="translate(400, 800)">
              <text x="60" y="30" className="label-icono">🏙️</text>
              <text x="60" y="50" className="label-ref">TORRE COLPATRIA</text>
            </g>

            {/* ZONA DE COMIDAS / BICICLETAS */}
            <g className="bloque-comidas" transform="translate(420, 600)">
              <rect x="0" y="0" width="180" height="130" fill="#000" />
              <text x="90" y="50" fill="#fff" fontSize="30" textAnchor="middle">🚲</text>
              <g fill="#fff" fontSize="7" textAnchor="middle">
                <text x="30" y="90">CARNE</text>
                <text x="90" y="90">BOYACÁ</text>
                <text x="150" y="90">LECHONA</text>
                <text x="30" y="110">JEEP</text>
                <text x="90" y="110">VINOS</text>
                <text x="150" y="110">BEBIDAS</text>
              </g>
            </g>

            {/* ETIQUETAS DE ENTRADA Y SERVICIOS */}
            <rect x="1230" y="270" width="60" height="25" fill="#d1e7dd" stroke="#000"/>
            <text x="1260" y="287" className="label-ref-sm">ASEO</text>

            <rect x="800" y="850" width="80" height="30" fill="#fff3cd" stroke="#000"/>
            <text x="840" y="870" className="label-ref-sm">BAÑOS 🚻</text>

            <text x="650" y="880" className="label-ref-lg">ENTRADA Cra 7 ⬆</text>
            <text x="1280" y="420" className="label-ref-lg" transform="rotate(90, 1280, 420)">ENTRADA Calle 24 ➔</text>


            {/* === BLOQUE DE DIBUJO DE PUESTOS VECTORIALES === */}
            
            {/* Ejemplo de Renderizado Directo de tus nodos SVG */}
            <g className="grupo-puestos">
              
              {/* Puesto Renderizado Dinámico helper */}
              {renderPuestoSVG("47", 640, 175, 25, 25, obtenerNegocio("47"), manejarClicPuesto)}
              {renderPuestoSVG("48", 640, 200, 25, 25, obtenerNegocio("48"), manejarClicPuesto)}
              {renderPuestoSVG("49", 640, 225, 25, 25, obtenerNegocio("49"), manejarClicPuesto)}
              {renderPuestoSVG("50", 640, 250, 25, 25, obtenerNegocio("50"), manejarClicPuesto)}
              {renderPuestoSVG("51", 640, 275, 25, 25, obtenerNegocio("51"), manejarClicPuesto)}
              {renderPuestoSVG("52", 640, 300, 25, 25, obtenerNegocio("52"), manejarClicPuesto)}

              {/* Fila 53 a 65 */}
              {renderPuestoSVG("53", 615, 300, 25, 25, obtenerNegocio("53"), manejarClicPuesto)}
              {renderPuestoSVG("54", 590, 300, 25, 25, obtenerNegocio("54"), manejarClicPuesto)}
              {renderPuestoSVG("55", 565, 300, 25, 25, obtenerNegocio("55"), manejarClicPuesto)}
              {renderPuestoSVG("56", 540, 300, 25, 25, obtenerNegocio("56"), manejarClicPuesto)}
              {renderPuestoSVG("57", 515, 300, 25, 25, obtenerNegocio("57"), manejarClicPuesto)}
              {renderPuestoSVG("58", 490, 300, 25, 25, obtenerNegocio("58"), manejarClicPuesto)}
              {renderPuestoSVG("59", 465, 300, 25, 25, obtenerNegocio("59"), manejarClicPuesto)}
              {renderPuestoSVG("60", 440, 300, 25, 25, obtenerNegocio("60"), manejarClicPuesto)}
              {renderPuestoSVG("61", 415, 300, 25, 25, obtenerNegocio("61"), manejarClicPuesto)}
              {renderPuestoSVG("62", 390, 300, 25, 25, obtenerNegocio("62"), manejarClicPuesto)}
              {renderPuestoSVG("63", 365, 300, 25, 25, obtenerNegocio("63"), manejarClicPuesto)}
              {renderPuestoSVG("64", 340, 300, 25, 25, obtenerNegocio("64"), manejarClicPuesto)}
              {renderPuestoSVG("65", 315, 300, 25, 25, obtenerNegocio("65"), manejarClicPuesto)}

              {/* Columna 66-67, 88-89... */}
              {renderPuestoSVG("66", 315, 325, 25, 25, obtenerNegocio("66"), manejarClicPuesto)}
              {renderPuestoSVG("67", 315, 350, 25, 25, obtenerNegocio("67"), manejarClicPuesto)}
              {renderPuestoSVG("88", 315, 375, 25, 25, obtenerNegocio("88"), manejarClicPuesto)}
              {renderPuestoSVG("89", 315, 400, 25, 25, obtenerNegocio("89"), manejarClicPuesto)}
              {renderPuestoSVG("115", 315, 475, 25, 25, obtenerNegocio("115"), manejarClicPuesto)}
              {renderPuestoSVG("138", 315, 500, 25, 25, obtenerNegocio("138"), manejarClicPuesto)}
              {renderPuestoSVG("141", 315, 525, 25, 25, obtenerNegocio("141"), manejarClicPuesto)}

              {/* Columna 23 a 17 */}
              {renderPuestoSVG("23", 1200, 350, 25, 20, obtenerNegocio("23"), manejarClicPuesto)}
              {renderPuestoSVG("22", 1200, 375, 25, 20, obtenerNegocio("22"), manejarClicPuesto)}
              {renderPuestoSVG("21", 1200, 400, 25, 20, obtenerNegocio("21"), manejarClicPuesto)}
              {renderPuestoSVG("20", 1200, 425, 25, 20, obtenerNegocio("20"), manejarClicPuesto)}
              {renderPuestoSVG("19", 1200, 450, 25, 20, obtenerNegocio("19"), manejarClicPuesto)}
              {renderPuestoSVG("18", 1200, 475, 25, 20, obtenerNegocio("18"), manejarClicPuesto)}
              {renderPuestoSVG("17", 1200, 500, 25, 20, obtenerNegocio("17"), manejarClicPuesto)}

            </g>
          </svg>
        </div>
      </div>

      <ModalInfoPuesto
        puesto={puestoSeleccionado}
        negocio={puestoSeleccionado?.negocio}
        alCerrar={() => setPuestoSeleccionado(null)}
      />
    </div>
  );
};

// Función auxiliar para renderizar puestos interactivos SVG
const renderPuestoSVG = (numero, x, y, ancho, alto, negocio, alHacerClic) => {
  const esOcupado = negocio && negocio.estado === 'aceptado';

  return (
    <g 
      key={numero} 
      className={`puesto-svg ${esOcupado ? 'ocupado' : 'disponible'}`}
      onClick={() => alHacerClic(numero)}
    >
      <rect x={x} y={y} width={ancho} height={alto} />
      <text x={x + ancho / 2} y={y + alto / 2 + 3} className="texto-puesto">
        {numero}
      </text>
    </g>
  );
};

export default MapaMercado;
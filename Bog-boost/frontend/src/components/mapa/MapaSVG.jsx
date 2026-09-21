const MapaSVG = ({ puestos, obtenerNegocio, alHacerClicPuesto }) => {
  return (
    <svg
      className="mapa-svg"
      viewBox="-100 -100 2300 1200"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <rect x="0" y="0" width="2100" height="1000" fill="#ffffff" />

      {/* ================================================ */}
      {/* REFERENCIAS VISUALES */}
      {/* ================================================ */}

      {/* MUSEO DE ARTE MODERNO — mueve a la izquierda junto al bloque azul */}
<g transform="translate(580, 20)">
  <text x="60" y="30" textAnchor="middle" fontSize="80">🏛️</text>
  <text x="60" y="55" className="label-ref" textAnchor="middle">
    MUSEO DE
  </text>
  <text x="60" y="68" className="label-ref" textAnchor="middle">
    ARTE MODERNO
  </text>
</g>

{/* MONSERRATE — se queda igual, arriba de los puestos 34-31 */}
<g transform="translate(1180, 5)">
  <text x="60" y="30" textAnchor="middle" fontSize="80">⛪</text>
  <text x="60" y="55" className="label-ref-lg" textAnchor="middle" style={{ fontSize: '13px' }}>
    MONSERRATE
  </text>
</g>

{/* PLANETARIO DISTRITAL — un poco más a la derecha */}
<g transform="translate(80, 420)">
  <text x="45" y="20" textAnchor="middle" fontSize="80">🪐</text>
  <text x="45" y="45" className="label-ref-sm" textAnchor="middle">
    PLANETARIO
  </text>
  <text x="45" y="60" className="label-ref-sm" textAnchor="middle">
    DISTRITAL
  </text>
</g>

{/* TORRE COLPATRIA — ajusta según el nuevo bloque azul */}
<g transform="translate(490, 940)">
  <text x="60" y="15" textAnchor="middle" fontSize="80">🏢</text>
  <text x="60" y="38" className="label-ref-sm" textAnchor="middle">
    TORRE
  </text>
  <text x="60" y="52" className="label-ref-sm" textAnchor="middle">
    COLPATRIA
  </text>
</g>

{/* ASEO — al lado derecho del puesto 24 */}
<rect x="1595" y="238" width="60" height="30" fill="#000" />
<text
  x="1625"
  y="258"
  fill="#fff"
  fontSize="11"
  fontWeight="bold"
  textAnchor="middle"
  fontFamily="Arial"
>
  ASEO
</text>

{/* ENTRADA Calle 24 — derecha, rotada, más cerca de las casillas */}
<text
  x="1750"
  y="220"
  className="label-ref"
  textAnchor="middle"
  transform="rotate(90 1750 220)"
>
  ENTRADA Calle 24
</text>

{/* Zona bicicletas + panel de servicios — corrida a la izquierda */}
<g transform="translate(440, 640)">
  <rect x="0" y="0" width="260" height="220" fill="#000" />
  <text x="130" y="110" textAnchor="middle" fontSize="36" fill="#fff">🚲</text>
  <text x="240" y="50" textAnchor="middle" fontSize="9" fill="#fff" fontFamily="Arial">CARNE</text>
  <text x="240" y="75" textAnchor="middle" fontSize="9" fill="#fff" fontFamily="Arial">BOYACÁ</text>
  <text x="240" y="100" textAnchor="middle" fontSize="9" fill="#fff" fontFamily="Arial">LECHONA</text>
  <text x="240" y="125" textAnchor="middle" fontSize="9" fill="#fff" fontFamily="Arial">JEEP</text>
  <text x="240" y="150" textAnchor="middle" fontSize="9" fill="#fff" fontFamily="Arial">FRUTAS</text>
  <text x="240" y="175" textAnchor="middle" fontSize="9" fill="#fff" fontFamily="Arial">ACHIRAS</text>
  <text x="240" y="200" textAnchor="middle" fontSize="9" fill="#fff" fontFamily="Arial">POSTRES</text>
  <text x="165" y="50" textAnchor="middle" fontSize="9" fill="#fff" fontFamily="Arial">VINOS</text>
  <text x="165" y="75" textAnchor="middle" fontSize="9" fill="#fff" fontFamily="Arial">SAPICON</text>
  <text x="165" y="100" textAnchor="middle" fontSize="9" fill="#fff" fontFamily="Arial">COOP</text>
  <text x="165" y="125" textAnchor="middle" fontSize="9" fill="#fff" fontFamily="Arial">CAKE</text>
  <text x="165" y="150" textAnchor="middle" fontSize="9" fill="#fff" fontFamily="Arial">BEBIDAS</text>
</g>

{/* BAÑOS — más a la izquierda */}
<g transform="translate(1150, 990)">
  <rect x="0" y="0" width="60" height="26" fill="#fff" stroke="#000" strokeWidth="1.2" />
  <text
    x="30"
    y="17"
    fill="#000"
    fontSize="10"
    fontWeight="bold"
    textAnchor="middle"
    fontFamily="Arial"
  >
    BAÑOS
  </text>
  <text x="80" y="20" textAnchor="middle" fontSize="16">🚻</text>
</g>

{/* ENTRADA Cra 7 — corrido a la derecha */}
<text x="1080" y="1050" className="label-ref-lg" textAnchor="middle">
  ENTRADA Cra 7
</text>  

      {/* ================================================ */}
      {/* PUESTOS */}
      {/* ================================================ */}
      <g className="grupo-puestos">
        {puestos.map((puesto) => {
          const negocio = obtenerNegocio(puesto.numero);
          const esOcupado = Boolean(negocio) || puesto.estado === 'ocupado';
          return (
            <g
              key={puesto.numero}
              className={`puesto-svg ${esOcupado ? 'ocupado' : 'disponible'}`}
              onClick={() => alHacerClicPuesto({ ...puesto, negocio })}
            >
              <title>
                Puesto {puesto.numero} — {esOcupado ? 'Ocupado' : 'Disponible'}
              </title>
              <rect
                x={puesto.x}
                y={puesto.y}
                width={puesto.ancho}
                height={puesto.alto}
                rx="1"
              />
              <text
                x={puesto.x + puesto.ancho / 2}
                y={puesto.y + puesto.alto / 2}
                className="texto-p"
              >
                {puesto.numero}
              </text>
            </g>
          );
        })}
      </g>

      <style>{`
        .puesto-svg { cursor: pointer; }
        .puesto-svg rect {
          fill: #ffffff;
          stroke: #333333;
          stroke-width: 1;
          transition: fill 0.2s, stroke 0.2s;
        }
        .puesto-svg.disponible:hover rect {
          fill: #FFF3CD;
          stroke: #F39C12;
          stroke-width: 1.8;
        }
        .puesto-svg.ocupado rect {
          fill: #F39C12;
          stroke: #D35400;
          stroke-width: 1.8;
        }
        .puesto-svg.ocupado:hover rect {
          fill: #E67E22;
          stroke: #D35400;
          stroke-width: 2;
        }
        .texto-p {
          font-size: 12px;
          font-weight: bold;
          fill: #000;
          text-anchor: middle;
          dominant-baseline: middle;
          pointer-events: none;
          user-select: none;
          font-family: Arial, sans-serif;
        }
        .puesto-svg.ocupado .texto-p { fill: #fff; }
        .label-ref-sm {
          font-size: 11px;
          font-weight: bold;
          fill: #333;
          font-family: Arial, sans-serif;
        }
        .label-ref {
          font-size: 13px;
          font-weight: bold;
          fill: #333;
          font-family: Arial, sans-serif;
        }
        .label-ref-lg {
          font-size: 16px;
          font-weight: bold;
          fill: #222;
          font-family: Arial, sans-serif;
        }
      `}</style>
    </svg>
  );
};

export default MapaSVG;
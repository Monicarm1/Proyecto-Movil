import './Puesto.css';

const Puesto = ({ datos, negocio, alHacerClic }) => {
  // Ignorar zonas que son nombres de referencia y no puestos
  const zonasNoPuesto = ['ASEO','BAÑOS','MONSERRATE','MUSEO','PLANETARIO','TORRE_COLPATRIA','ENTRADA_Cra_7','ENTRADA_Calle_24','B'];
  if (zonasNoPuesto.includes(String(datos.numero))) return null;

  // Un puesto está ocupado si tiene un negocio asignado con estado 'aceptado'
  const esOcupado = Boolean(negocio && negocio.estado === 'aceptado');

  return (
    <div
      className={`puesto ${esOcupado ? 'ocupado' : 'disponible'}`}
      onClick={alHacerClic}
      style={{
        left: `${datos.x}px`,
        top: `${datos.y}px`,
        width: `${datos.ancho}px`,
        height: `${datos.alto}px`
      }}
      title={`Puesto ${datos.numero} - ${esOcupado ? 'Ocupado' : 'Disponible'}`}
    >
      {datos.numero}
    </div>
  );
};

export default Puesto;
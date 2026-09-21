import './ModalInfoPuesto.css';

const ModalInfoPuesto = ({ puesto, negocio, alCerrar }) => {
  if (!puesto) return null;
  const estaOcupado = Boolean(negocio);

  return (
    <div className="modal-fondo" onClick={alCerrar}>
      <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
        <button className="boton-cerrar" onClick={alCerrar}>×</button>

        <h2>Puesto N° {puesto.numero}</h2>

        {estaOcupado ? (
          <div className="info-negocio">
            <div className="insignia ocupado">Ocupado</div>
            <p><strong>Propietario:</strong> {negocio.nombre_propietario || 'No especificado'}</p>
            <p><strong>Nombre del negocio:</strong> {negocio.nombre_negocio || 'Sin nombre'}</p>
            <p>
              <strong>Categorías / Productos:</strong>{' '}
              {Array.isArray(negocio.categorias)
                ? negocio.categorias.join(', ')
                : negocio.categorias || 'No especificadas'}
            </p>
            {negocio.descripcion && (
              <p><strong>Descripción:</strong> {negocio.descripcion}</p>
            )}
          </div>
        ) : (
          <div className="info-disponible">
            <div className="insignia disponible">Disponible</div>
            <p>
              Este puesto se encuentra libre. Se mostrará ocupado cuando el
              administrador apruebe un negocio registrado para este número.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalInfoPuesto;
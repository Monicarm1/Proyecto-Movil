import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabase';
import MapaSVG from '../components/mapa/MapaSVG';
import ModalInfoPuesto from '../components/mapa/ModalInfoPuesto';
import './MapaMercadoPagina.css';

const MapaMercadoPagina = () => {
  const [escala, setEscala] = useState(1);
  const [puestos, setPuestos] = useState([]);
  const [negocios, setNegocios] = useState([]);
  const [puestoSeleccionado, setPuestoSeleccionado] = useState(null);
  const [cargando, setCargando] = useState(true);

  const cargarPuestos = useCallback(async () => {
    const { data, error } = await supabase
      .from('puestos')
      .select('*')
      .order('id', { ascending: true });
    if (error) console.error('Error puestos:', error);
    else setPuestos(data || []);
  }, []);

  const cargarNegocios = useCallback(async () => {
    const { data, error } = await supabase
      .from('negocios')
      .select('*')
      .eq('estado', 'aceptado');
    if (error) console.error('Error negocios:', error);
    else setNegocios(data || []);
  }, []);

  useEffect(() => {
    const cargarTodo = async () => {
      setCargando(true);
      await Promise.all([cargarPuestos(), cargarNegocios()]);
      setCargando(false);
    };
    cargarTodo();
  }, [cargarPuestos, cargarNegocios]);

  useEffect(() => {
    const canal = supabase
      .channel('cambios-mapa')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'negocios' },
        () => cargarNegocios()
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'puestos' },
        () => cargarPuestos()
      )
      .subscribe();

    return () => supabase.removeChannel(canal);
  }, [cargarNegocios, cargarPuestos]);

  const obtenerNegocio = (numeroPuesto) =>
    negocios.find((n) => String(n.numero_puesto) === String(numeroPuesto));

  const manejarClicPuesto = (puesto) => {
    const negocio = obtenerNegocio(puesto.numero);
    setPuestoSeleccionado({ ...puesto, negocio });
  };

  const cerrarModal = () => setPuestoSeleccionado(null);

  const acercar = () => setEscala((p) => Math.min(p + 0.15, 3));
  const alejar = () => setEscala((p) => Math.max(p - 0.15, 0.5));
  const restablecer = () => setEscala(1);

  if (cargando) return <div className="mapa-cargando">Cargando mapa...</div>;

  return (
    <div className="mapa-pagina">
      <h1>Mapa — Mercado de Pulgas San Alejo</h1>

      <div className="mapa-controles">
        <button onClick={acercar} title="Acercar">➕</button>
        <button onClick={alejar} title="Alejar">➖</button>
        <button onClick={restablecer} title="Restablecer">↺</button>
        <span className="zoom-indicador">{Math.round(escala * 100)}%</span>
      </div>

      <div className="mapa-viewport">
        <div
          className="mapa-contenido"
          style={{
            transform: `scale(${escala})`,
            transformOrigin: 'top center',
          }}
        >
          <MapaSVG
            puestos={puestos}
            obtenerNegocio={obtenerNegocio}
            alHacerClicPuesto={manejarClicPuesto}
          />
        </div>
      </div>

      <ModalInfoPuesto
        puesto={puestoSeleccionado}
        negocio={puestoSeleccionado?.negocio}
        alCerrar={cerrarModal}
      />
    </div>
  );
};

export default MapaMercadoPagina;
import React, { useEffect, useState } from "react";
import { obtenerReportes } from "../../api/reportesApi"; 
import "../../styles/Reportes.css";

export default function ReportesAdmin() {
  const [reportes, setReportes] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReportes = async () => {
      try {
        const data = await obtenerReportes();
        setReportes(data);
      } catch (err) {
        console.error("Error al cargar reportes:", err);
        setError("No se pudieron cargar los datos de reportes.");
      } finally {
        setCargando(false);
      }
    };

    fetchReportes();
  }, []);

  if (cargando) {
    return <div className="reportes-loading">Cargando reportes del sistema...</div>;
  }

  if (error) {
    return <div className="reportes-error">{error}</div>;
  }

  return (
    <div className="reportes-container">
      <h1 className="reportes-title">Panel de Reportes y Estadísticas</h1>

      <div className="reportes-grid">
        {/* Usuarios Registrados por Mes */}
        <div className="reportes-card">
          <h2>Usuarios Registrados por Mes</h2>
          <div className="table-responsive">
            <table className="reportes-table">
              <thead>
                <tr>
                  <th>Mes</th>
                  <th className="text-right">Nuevos Perfiles</th>
                </tr>
              </thead>
              <tbody>
                {reportes?.usuariosPorMes && Object.keys(reportes.usuariosPorMes).length === 0 ? (
                  <tr>
                    <td colSpan="2" className="text-center">Sin registros de usuarios</td>
                  </tr>
                ) : (
                  reportes?.usuariosPorMes && Object.entries(reportes.usuariosPorMes).map(([mes, total]) => (
                    <tr key={mes}>
                      <td className="font-medium">{mes}</td>
                      <td className="text-right text-primary">{total}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Ventas e Ingresos por Mes */}
        <div className="reportes-card">
          <h2>Ventas e Ingresos por Mes</h2>
          <div className="table-responsive">
            <table className="reportes-table">
              <thead>
                <tr>
                  <th>Mes</th>
                  <th className="text-center">N° Ventas</th>
                  <th className="text-right">Ingresos Totales</th>
                </tr>
              </thead>
              <tbody>
                {reportes?.ventasPorMes && Object.keys(reportes.ventasPorMes).length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-center">Sin ventas registradas</td>
                  </tr>
                ) : (
                  reportes?.ventasPorMes && Object.entries(reportes.ventasPorMes).map(([mes, data]) => (
                    <tr key={mes}>
                      <td className="font-medium">{mes}</td>
                      <td className="text-center">{data.cantidad_ventas}</td>
                      <td className="text-right text-success">
                        ${data.ingresos_totales.toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Ventas por Negocio */}
      <div className="reportes-card mt-8">
        <h2>Ventas e Ingresos por Negocio</h2>
        <div className="table-responsive">
          <table className="reportes-table">
            <thead>
              <tr>
                <th>Negocio</th>
                <th className="text-center">N° de Ventas</th>
                <th className="text-right">Ingresos Totales</th>
              </tr>
            </thead>
            <tbody>
              {reportes?.ventasPorNegocio && reportes.ventasPorNegocio.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center text-muted">No hay ventas registradas por negocio.</td>
                </tr>
              ) : (
                reportes?.ventasPorNegocio?.map((negocio, index) => (
                  <tr key={index}>
                    <td className="negocio-cell">
                      {negocio.logo ? (
                        <img 
                          src={negocio.logo} 
                          alt={negocio.nombre_negocio} 
                          className="negocio-logo" 
                        />
                      ) : (
                        <div className="negocio-avatar">
                          {negocio.nombre_negocio?.charAt(0) || "N"}
                        </div>
                      )}
                      <span className="negocio-nombre">{negocio.nombre_negocio}</span>
                    </td>
                    <td className="text-center">{negocio.cantidad_ventas}</td>
                    <td className="text-right text-success font-bold">
                      ${negocio.ingresos_totales.toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Productos más vendidos */}
      <div className="reportes-card mt-8">
        <h2>Top Productos Más Vendidos</h2>
        <div className="productos-grid">
          {reportes?.productosMasVendidos && reportes.productosMasVendidos.length === 0 ? (
            <p className="text-muted">No hay datos suficientes de ventas de productos.</p>
          ) : (
            reportes?.productosMasVendidos?.map((prod, index) => (
              <div key={index} className="producto-item">
                {prod.imagen ? (
                  <img src={prod.imagen} alt={prod.nombre} className="reporte-producto-img" />
                ) : (
                  <div className="reporte-producto-img-placeholder">Sin foto</div>
                )}
                <h3 className="reporte-producto-nombre">{prod.nombre}</h3>
                <span className="producto-badge">
                  {prod.total_vendidos} vendidos
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
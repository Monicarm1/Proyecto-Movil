import supabase from "../services/supabase.js";

export const obtenerReportes = async (req, res) => {
  try {
    // 1. USUARIOS REGISTRADOS POR MES
    const { data: perfiles, error: errorPerfiles } = await supabase
      .schema("cliente")
      .from("perfil")
      .select("fecha_creacion")
      .order("fecha_creacion", { ascending: true });

    if (errorPerfiles) {
      console.error("Error en perfiles:", errorPerfiles);
      return res.status(400).json({ mensaje: "Error en perfiles", detalle: errorPerfiles });
    }

    const usuariosPorMes = {};
    perfiles.forEach((perfil) => {
      if (perfil.fecha_creacion) {
        const mes = perfil.fecha_creacion.slice(0, 7);
        usuariosPorMes[mes] = (usuariosPorMes[mes] || 0) + 1;
      }
    });

    // 2. VENTAS Y TOTALES POR MES
    const { data: ventas, error: errorVentas } = await supabase
      .schema("ventas")
      .from("venta")
      .select("id_venta, id_negocio, fecha_venta, total")
      .order("fecha_venta", { ascending: true });

    if (errorVentas) {
      console.error("Error en ventas:", errorVentas);
      return res.status(400).json({ mensaje: "Error en ventas", detalle: errorVentas });
    }

    const ventasPorMes = {};
    ventas.forEach((venta) => {
      if (venta.fecha_venta) {
        const mes = venta.fecha_venta.slice(0, 7);
        if (!ventasPorMes[mes]) {
          ventasPorMes[mes] = { cantidad_ventas: 0, ingresos_totales: 0 };
        }
        ventasPorMes[mes].cantidad_ventas += 1;
        ventasPorMes[mes].ingresos_totales += Number(venta.total || 0);
      }
    });

    // 2.1 VENTAS POR NEGOCIO
    const { data: negocios, error: errorNegocios } = await supabase
      .schema("negocio")
      .from("negocio")
      .select("id_negocio, nombre_negocio, logo");

    if (errorNegocios) {
      console.error("Error en negocios:", errorNegocios);
      return res.status(400).json({ mensaje: "Error en negocios", detalle: errorNegocios });
    }

    const negociosDict = {};
    negocios.forEach(n => {
      negociosDict[n.id_negocio] = {
        nombre: n.nombre_negocio,
        logo: n.logo
      };
    });

    const ventasPorNegocioMap = {};
    ventas.forEach((venta) => {
      const idNegocio = venta.id_negocio;
      const infoNegocio = negociosDict[idNegocio];

      if (!ventasPorNegocioMap[idNegocio]) {
        ventasPorNegocioMap[idNegocio] = {
          nombre_negocio: infoNegocio?.nombre_negocio || infoNegocio?.nombre || "Negocio desconocido",
          logo: infoNegocio?.logo || "",
          cantidad_ventas: 0,
          ingresos_totales: 0
        };
      }
      ventasPorNegocioMap[idNegocio].cantidad_ventas += 1;
      ventasPorNegocioMap[idNegocio].ingresos_totales += Number(venta.total || 0);
    });

    const ventasPorNegocio = Object.values(ventasPorNegocioMap)
      .sort((a, b) => b.ingresos_totales - a.ingresos_totales);

    // 3. PRODUCTOS MÁS VENDIDOS
    const { data: detalles, error: errorDetalles } = await supabase
      .schema("ventas")
      .from("detalle_venta")
      .select("cantidad, id_producto");

    if (errorDetalles) {
      console.error("Error en detalles_venta:", errorDetalles);
      return res.status(400).json({ mensaje: "Error en detalles_venta", detalle: errorDetalles });
    }

    const { data: productos, error: errorProductos } = await supabase
      .schema("catalogo")
      .from("producto")
      .select("id_producto, nombre_producto, imagen, precio");

    if (errorProductos) {
      console.error("Error en productos:", errorProductos);
      return res.status(400).json({ mensaje: "Error en productos", detalle: errorProductos });
    }

    const productosDict = {};
    productos.forEach(p => {
      productosDict[p.id_producto] = p;
    });

    const productosMap = {};
    detalles.forEach((item) => {
      const id = item.id_producto;
      const prodInfo = productosDict[id];

      if (!productosMap[id]) {
        productosMap[id] = {
          nombre: prodInfo?.nombre_producto || "Producto desconocido",
          imagen: prodInfo?.imagen || "",
          total_vendidos: 0
        };
      }
      productosMap[id].total_vendidos += item.cantidad;
    });

    const productosMasVendidos = Object.values(productosMap)
      .sort((a, b) => b.total_vendidos - a.total_vendidos)
      .slice(0, 5);

    res.json({
      usuariosPorMes,
      ventasPorMes,
      ventasPorNegocio,
      productosMasVendidos
    });

  } catch (error) {
    console.error("Error crítico en reporte:", error);
    res.status(500).json({ mensaje: "Error interno del servidor al generar reportes", error: error.message });
  }
};
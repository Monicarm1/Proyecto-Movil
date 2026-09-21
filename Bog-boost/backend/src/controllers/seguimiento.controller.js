import supabase from "../services/supabase.js";

export const misSeguimientos = async (req, res) => {
  try {

    const { data, error } = await supabase
      .schema("ventas")
      .from("seguimiento")
      .select(`
        *,
        venta!inner(
          id_venta,
          id_perfil,
          total,
          id_negocio
        )
      `)
      .eq(
        "venta.id_perfil",
        req.user.id
      );

    if (error) {
      return res.status(400).json(error);
    }

    res.json(data);

  } catch (error) {

    res.status(500).json(error);

  }
};

export const misPedidos = async (req, res) => {
  try {

    const {
      data: negocios,
      error: errorNegocios
    } = await supabase
      .schema("negocio")
      .from("negocio")
      .select("id_negocio")
      .eq(
        "id_perfil",
        req.user.id
      );

    if (errorNegocios) {
      return res.status(400).json(errorNegocios);
    }

    const idsNegocios =
      negocios.map(
        n => n.id_negocio
      );

    const { data, error } =
      await supabase
        .schema("ventas")
        .from("seguimiento")
        .select(`
          *,
          venta!inner(
            id_venta,
            id_negocio,
            total,
            id_perfil
          )
        `)
        .in(
          "venta.id_negocio",
          idsNegocios
        );

    if (error) {
      return res.status(400).json(error);
    }

    res.json(data);

  } catch (error) {

    res.status(500).json(error);

  }
};

export const obtenerSeguimientoPorId = async (req, res) => {
  try {

    const { id } = req.params;

    const {
      data,
      error
    } = await supabase
      .schema("ventas")
      .from("seguimiento")
      .select(`
        *,
        venta!inner(
          id_venta,
          id_perfil,
          id_negocio
        )
      `)
      .eq(
        "id_seguimiento",
        id
      )
      .single();

    if (error || !data) {
      return res.status(404).json({
        mensaje: "Seguimiento no encontrado"
      });
    }

    res.json(data);

  } catch (error) {

    res.status(500).json(error);

  }
};

export const actualizarSeguimiento = async (req, res) => {
  try {
    const { id } = req.params; // Puede venir el id_seguimiento o el id_venta
    const { estado_seguimiento } = req.body;

    let idVenta = null;

    // 1. Determinar si el ID recibido es un id_seguimiento o un id_venta
    // Intentamos buscar primero si es un id_seguimiento
    const { data: segPorId } = await supabase
      .schema("ventas")
      .from("seguimiento")
      .select("id_venta")
      .eq("id_seguimiento", id)
      .maybeSingle();

    if (segPorId) {
      idVenta = segPorId.id_venta;
    } else {
      // Si no, asumimos que el id enviado es directamente el id_venta
      const { data: ventaDirecta } = await supabase
        .schema("ventas")
        .from("venta")
        .select("id_venta")
        .eq("id_venta", id)
        .maybeSingle();

      if (ventaDirecta) {
        idVenta = ventaDirecta.id_venta;
      }
    }

    if (!idVenta) {
      return res.status(404).json({ mensaje: "No se encontró la venta o el seguimiento asociado" });
    }

    // 2. Obtener la venta para validar a qué negocio pertenece
    const { data: venta, error: errorVenta } = await supabase
      .schema("ventas")
      .from("venta")
      .select("id_venta, id_negocio")
      .eq("id_venta", idVenta)
      .single();

    if (errorVenta || !venta) {
      return res.status(404).json({ mensaje: "Venta no encontrada" });
    }

    // 3. Validar que el negocio pertenezca al vendedor autenticado (req.user.id)
    const { data: negocio, error: errorNegocio } = await supabase
      .schema("negocio")
      .from("negocio")
      .select("id_negocio")
      .eq("id_negocio", venta.id_negocio)
      .eq("id_perfil", req.user.id)
      .maybeSingle();

    if (errorNegocio || !negocio) {
      return res.status(403).json({ mensaje: "No puedes modificar seguimientos de otros negocios" });
    }

    // 4. Preparar datos y hacer UPSERT aprovechando la restricción unique (id_venta)
    const datosUpsert = {
      id_venta: idVenta,
      estado_seguimiento,
      fecha_entrega: estado_seguimiento === "ENTREGADO" ? new Date() : null
    };

    const { data, error } = await supabase
      .schema("ventas")
      .from("seguimiento")
      .upsert(datosUpsert, { onConflict: "id_venta" })
      .select();

    if (error) {
      console.error("Error en upsert de seguimiento:", error);
      return res.status(400).json(error);
    }

    return res.json(data);

  } catch (error) {
    console.error("Error crítico en actualizarSeguimiento:", error);
    return res.status(500).json({ mensaje: "Error interno del servidor", error: error.message });
  }
};
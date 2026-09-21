import supabase from "../services/supabase.js";

export const listarNegocios = async (req, res) => {
  try {
    const { estado } = req.query;

    let query = supabase
      .schema("negocio")
      .from("negocio")
      .select(`
        *,
        puesto(*)
      `);

    if (estado) {
      query = query.eq("estado_negocio", estado);
    }

    const { data: negocios, error } = await query;

    if (error) {
      console.error("ERROR NEGOCIOS:", error);
      return res.status(400).json(error);
    }

    // ==========================
    // Obtener productos desde catalogo.producto
    // ==========================
    const negocioIds = negocios.map((n) => n.id_negocio);
    let productos = [];

    if (negocioIds.length > 0) {
      const { data: prods, error: errorProds } = await supabase
        .schema("catalogo")
        .from("producto")
        .select("*")
        .in("id_negocio", negocioIds);

      if (errorProds) {
        console.error("ERROR PRODUCTOS:", errorProds);
      } else {
        productos = prods || [];
      }
    }

    // ==========================
    // Obtener perfiles (solo nombre)
    // ==========================
    const { data: perfiles, error: errorPerfiles } = await supabase
      .schema("cliente")
      .from("perfil")
      .select(`
        id_perfil,
        primer_nombre,
        segundo_nombre,
        primer_apellido,
        segundo_apellido
      `);

    if (errorPerfiles) {
      console.error("ERROR PERFILES:", errorPerfiles);
      return res.status(400).json(errorPerfiles);
    }

    // ==========================
    // Obtener correos desde auth.users
    // ==========================
    const usuarios = [];

    for (const perfil of perfiles) {
      const { data, error } = await supabase.auth.admin.getUserById(
        perfil.id_perfil
      );

      if (error) {
        console.error(error);
      }

      usuarios.push({
        id_perfil: perfil.id_perfil,
        email: data?.user?.email ?? null
      });
    }

    // ==========================
    // Unir negocio + perfil + productos
    // ==========================
    const resultado = negocios.map((negocio) => {
      const perfil = perfiles.find(
        (p) => p.id_perfil === negocio.id_perfil
      );

      const usuario = usuarios.find(
        (u) => u.id_perfil === negocio.id_perfil
      );

      const productosDelNegocio = productos.filter(
        (p) => p.id_negocio === negocio.id_negocio
      );

      return {
        ...negocio,
        productos: productosDelNegocio,
        perfil: {
          primer_nombre: perfil?.primer_nombre ?? null,
          segundo_nombre: perfil?.segundo_nombre ?? null,
          primer_apellido: perfil?.primer_apellido ?? null,
          segundo_apellido: perfil?.segundo_apellido ?? null,
          correo: usuario?.email ?? null
        }
      };
    });

    res.json(resultado);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Error interno del servidor"
    });
  }
};

export const obtenerNegocioPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: negocio, error } = await supabase
      .schema("negocio")
      .from("negocio")
      .select(`
        *,
        puesto(*)
      `)
      .eq("id_negocio", id)
      .single();

    if (error) {
      return res.status(404).json(error);
    }

    // ==========================
    // Obtener productos específicos de este negocio
    // ==========================
    const { data: productos, error: errorProds } = await supabase
      .schema("catalogo")
      .from("producto")
      .select("*")
      .eq("id_negocio", id);

    if (errorProds) {
      console.error("ERROR PRODUCTOS POR ID:", errorProds);
    }

    // ==========================
    // Obtener el perfil del propietario
    // ==========================
    let perfilData = null;
    let emailUser = null;

    if (negocio.id_perfil) {
      const { data: perfil, error: errorPerfil } = await supabase
        .schema("cliente")
        .from("perfil")
        .select(`
          id_perfil,
          primer_nombre,
          segundo_nombre,
          primer_apellido,
          segundo_apellido
        `)
        .eq("id_perfil", negocio.id_perfil)
        .single();

      if (errorPerfil) {
        console.error("ERROR PERFIL POR ID:", errorPerfil);
      } else {
        perfilData = perfil;

        // Obtener correo desde Supabase Auth
        const { data: authData, error: errorAuth } = await supabase.auth.admin.getUserById(
          negocio.id_perfil
        );

        if (errorAuth) {
          console.error("ERROR AUTH USER BY ID:", errorAuth);
        } else {
          emailUser = authData?.user?.email ?? null;
        }
      }
    }

    // ==========================
    // Estructurar respuesta final igual que en listarNegocios
    // ==========================
    const negocioCompleto = {
      ...negocio,
      productos: productos || [],
      perfil: {
        primer_nombre: perfilData?.primer_nombre ?? null,
        segundo_nombre: perfilData?.segundo_nombre ?? null,
        primer_apellido: perfilData?.primer_apellido ?? null,
        segundo_apellido: perfilData?.segundo_apellido ?? null,
        correo: emailUser
      }
    };

    res.json(negocioCompleto);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Error interno del servidor"
    });
  }
};

export const obtenerMiNegocio = async (req, res) => {
  try {

    const {
      data,
      error
    } = await supabase
      .schema("negocio")
      .from("negocio")
      .select(`
        *,
        puesto(*)
      `)
      .eq(
        "id_perfil",
        req.user.id
      )
      .single();

    if (error) {
      return res.status(404).json({
        mensaje: "No tienes un negocio registrado."
      });
    }

    res.json(data);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      mensaje: "Error interno del servidor."
    });

  }
};

export const crearNegocio = async (req, res) => {
  try {
    const {
      nombre_negocio,
      descripcion_negocio,
      telefono_negocio,
      logo,
      numero_puesto
    } = req.body;

    // Verificar si el usuario ya tiene un negocio
    const {
      data: negocioExistente,
      error: errorBusqueda
    } = await supabase
      .schema("negocio")
      .from("negocio")
      .select("id_negocio")
      .eq("id_perfil", req.user.id)
      .maybeSingle();

    if (errorBusqueda) {
      return res.status(400).json(errorBusqueda);
    }

    if (negocioExistente) {
      return res.status(409).json({
        mensaje: "Ya tienes un negocio registrado."
      });
    }

    // Crear el negocio con estado PENDIENTE
    const {
      data: negocio,
      error
    } = await supabase
      .schema("negocio")
      .from("negocio")
      .insert([
        {
          id_perfil: req.user.id,
          nombre_negocio,
          descripcion_negocio,
          telefono_negocio,
          logo,
          estado_negocio: "PENDIENTE"
        }
      ])
      .select()
      .single();

    if (error) {
      return res.status(400).json(error);
    }

    console.log("Usuario:", req.user.id);
    console.log("Negocio:", negocio);

    // Registrar el puesto asociado al negocio
    const {
      error: errorPuesto
    } = await supabase
      .schema("negocio")
      .from("puesto")
      .insert([
        {
          id_negocio: negocio.id_negocio,
          numero_puesto
        }
      ]);

    if (errorPuesto) {
      return res.status(400).json(errorPuesto);
    }

    // --- NOTIFICAR A LOS ADMINISTRADORES Y SUPER_ADMINS ---
    try {
      // 1. Buscar los IDs de los roles 'SUPER_ADMIN' y 'ADMINISTRADOR'
      const { data: rolesAdmins, error: errorRoles } = await supabase
        .schema("cliente")
        .from("rol")
        .select("id_rol")
        .in("nombre_rol", ["SUPER_ADMIN", "ADMINISTRADOR"]);

      if (!errorRoles && rolesAdmins && rolesAdmins.length > 0) {
        const idsRoles = rolesAdmins.map((r) => r.id_rol);

        // 2. Buscar directamente en cliente.perfil los usuarios que tengan esos id_rol
        const { data: perfilesAdmins, error: errorPerfiles } = await supabase
          .schema("cliente")
          .from("perfil")
          .select("id_perfil")
          .in("id_rol", idsRoles);

        if (!errorPerfiles && perfilesAdmins && perfilesAdmins.length > 0) {
          // 3. Crear el arreglo de notificaciones para cada administrador encontrado
          const notificacionesAdmins = perfilesAdmins.map((admin) => ({
            id_perfil: admin.id_perfil,
            mensaje: `Hay una nueva solicitud de negocio pendiente: "${nombre_negocio}".`,
            tipo: "SISTEMA"
          }));

          // 4. Insertar las notificaciones de forma masiva
          await supabase
            .schema("cliente")
            .from("notificacion")
            .insert(notificacionesAdmins);
        }
      }
    } catch (errorNotif) {
      // Capturamos cualquier error de notificación para que no afecte la respuesta principal
      console.error("Error al enviar notificaciones a los administradores:", errorNotif);
    }
    // -----------------------------------------------------

    res.status(201).json({
      mensaje: "Negocio creado correctamente",
      negocio
    });

  } catch (error) {
    res.status(500).json(error);
  }
};

export const actualizarNegocio = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      nombre_negocio,
      descripcion_negocio,
      telefono_negocio,
      logo,
      numero_puesto
    } = req.body;

    // Buscar negocio del usuario
    const {
      data: negocioActual,
      error: errorBusqueda
    } = await supabase
      .schema("negocio")
      .from("negocio")
      .select("*")
      .eq(
        "id_negocio",
        id
      )
      .eq(
        "id_perfil",
        req.user.id
      )
      .single();

    if (
      errorBusqueda ||
      !negocioActual
    ) {

      return res.status(404).json({
        mensaje: "Negocio no encontrado o no tienes permisos"
      });
    }

    // Actualizar negocio
    const {
      data,
      error
    } = await supabase
      .schema("negocio")
      .from("negocio")
      .update({
        nombre_negocio,
        descripcion_negocio,
        telefono_negocio,
        logo
      })
      .eq(
        "id_negocio",
        id
      )
      .select();

    if (error) {
      return res.status(400).json(error);
    }

    // Actualizar puesto
    if (numero_puesto) {
      if (
        negocioActual.estado_negocio === "APROBADO"
      ) {
        return res.status(403).json({
          mensaje: "No puedes modificar el número de puesto de un negocio aprobado"
        });
      }

      const {
        error: errorPuesto
      } = await supabase
        .schema("negocio")
        .from("puesto")
        .update({
          numero_puesto
        })
        .eq(
          "id_negocio",
          id
        );

      if (errorPuesto) {
        return res.status(400).json(errorPuesto);
      }
    }

    res.json({
      mensaje: "Negocio actualizado correctamente",
      negocio: data[0]
    });

  } catch (error) {
    res.status(500).json(error);
  }
};

export const eliminarNegocio = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("ID negocio:", id);
    console.log("Usuario:", req.user.id);

    const { data, error } = await supabase
      .schema("negocio")
      .from("negocio")
      .delete()
      .eq(
        "id_negocio",
        id
      )
      .eq(
        "id_perfil",
        req.user.id
      )
      .select();

    console.log("DATA:", data);
    console.log("ERROR:", error);

    if (error) {
      return res.status(400).json(error);
    }

    if (!data.length) {
      return res.status(403).json({
        mensaje: "No tienes permiso para eliminar este negocio"
      });
    }

    res.json({
      mensaje: "Negocio eliminado"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json(error);
  }
};

export const aprobarNegocio = async (req, res) => {
  try {

    const { id_negocio } = req.body;

    const {
      data: negocio,
      error: errorBusqueda
    } = await supabase
      .schema("negocio")
      .from("negocio")
      .select("*")
      .eq("id_negocio", id_negocio)
      .single();

    if (errorBusqueda || !negocio) {
      return res.status(404).json({
        mensaje: "Negocio no encontrado"
      });
    }

    const { error: errorNegocio } = await supabase
      .schema("negocio")
      .from("negocio")
      .update({
        estado_negocio: "APROBADO"
      })
      .eq("id_negocio", id_negocio);

    if (errorNegocio) {
      return res.status(400).json(errorNegocio);
    }

    await supabase
      .schema("cliente")
      .from("notificacion")
      .insert([
        {
          id_perfil: negocio.id_perfil,
          mensaje:
            "¡Felicitaciones! Tu negocio fue aprobado. Ya puedes comunicarte con el administrador para activar tu rol de vendedor.",
          tipo: "INFORMATIVA"
        }
      ]);

    res.json({
      mensaje: "Negocio aprobado correctamente."
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      mensaje: "Error interno del servidor."
    });

  }
};

export const rechazarNegocio = async (req, res) => {
  try {
    const {
      id_negocio,
      observacion_admin
    } = req.body;

    const {
      data: negocio,
      error: errorBusqueda
    } = await supabase
      .schema("negocio")
      .from("negocio")
      .select("*")
      .eq("id_negocio", id_negocio)
      .single();

    if (errorBusqueda || !negocio) {
      return res.status(404).json({
        mensaje: "Negocio no encontrado"
      });
    }

    const { error } = await supabase
      .schema("negocio")
      .from("negocio")
      .update({
        estado_negocio:
          "RECHAZADO",
        observacion_admin
      })
      .eq(
        "id_negocio",
        id_negocio
      );

    if (error) {
      return res.status(400).json(error);
    }

    const { error: errorNotificacion } = await supabase
      .schema("cliente")
      .from("notificacion")
      .insert([
        {
          id_perfil: negocio.id_perfil,
          mensaje:
            `Tu solicitud de negocio fue rechazada.\n\nObservación del administrador:\n${observacion_admin}`,
          tipo: "ALERTA"
        }
      ]);

    if (errorNotificacion) {
      console.error(errorNotificacion);
    }

    res.json({
      mensaje: "Negocio rechazado"
    });

  } catch (error) {
    res.status(500).json(error);
  }
};

export const obtenerNegociosPublicos = async (req, res) => {
  try {
    const { data, error } = await supabase
      .schema("negocio")
      .from("negocio")
      .select(`
        id_negocio,
        nombre_negocio,
        descripcion_negocio,
        logo
      `)
      .eq("estado_negocio", "APROBADO"); // 👈 CORRECTO

    if (error) {
      return res.status(400).json({
        mensaje: "Error al obtener negocios",
        error
      });
    }

    return res.json(data);

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      mensaje: "Error interno del servidor"
    });
  }
};
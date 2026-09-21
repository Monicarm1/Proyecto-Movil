import supabase from "../services/supabase.js";

export const listarPQRS = async (req, res) => {
  try {

    // ==========================
    // Obtener PQRS
    // ==========================

    const { data: pqrs, error } = await supabase
      .schema("cliente")
      .from("pqrs")
      .select("*");

    if (error) {
      console.error("ERROR PQRS:", error);
      return res.status(400).json(error);
    }

    // Obtener únicamente los id_perfil que aparecen en las PQRS
    const idsPerfil = [...new Set(pqrs.map(p => p.id_perfil))];

    // ==========================
    // Obtener perfiles
    // ==========================

    const {
      data: perfiles,
      error: errorPerfiles
    } = await supabase
      .schema("cliente")
      .from("perfil")
      .select(`
        id_perfil,
        primer_nombre,
        segundo_nombre,
        primer_apellido,
        segundo_apellido
      `)
      .in("id_perfil", idsPerfil);

    if (errorPerfiles) {
      console.error("ERROR PERFILES:", errorPerfiles);
      return res.status(400).json(errorPerfiles);
    }

    // ==========================
    // Obtener correos
    // ==========================

    const usuarios = [];

    for (const perfil of perfiles) {

      const { data, error } =
        await supabase.auth.admin.getUserById(
          perfil.id_perfil
        );

      if (error) {
        console.error(error);
      }

      usuarios.push({
        id_perfil: perfil.id_perfil,
        correo: data?.user?.email ?? null
      });

    }

    // ==========================
    // Unir PQRS + Perfil + Correo
    // ==========================

    const resultado = pqrs.map((item) => {

      const perfil = perfiles.find(
        (p) => p.id_perfil === item.id_perfil
      );

      const usuario = usuarios.find(
        (u) => u.id_perfil === item.id_perfil
      );

      return {
        ...item,
        perfil: {
          ...perfil,
          correo: usuario?.correo ?? null
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

export const crearPQRS = async (req, res) => {
  try {
    const { mensaje_pqrs } = req.body;

    // 1. Insertar el PQRS en la base de datos
    const { data, error } = await supabase
      .schema("cliente")
      .from("pqrs")
      .insert([
        {
          id_perfil: req.user.id,
          mensaje_pqrs
        }
      ])
      .select();

    if (error) {
      return res.status(400).json(error);
    }

    const nuevoPQRS = data[0];

    try {
      // 2. Obtener los id_rol correspondientes a SUPER_ADMIN y ADMINISTRADOR
      const { data: roles, error: errorRoles } = await supabase
        .schema("cliente")
        .from("rol")
        .select("id_rol")
        .in("nombre_rol", ["SUPER_ADMIN", "ADMINISTRADOR"]);

      if (!errorRoles && roles && roles.length > 0) {
        const idsRoles = roles.map((rol) => rol.id_rol);

        // 3. Obtener los perfiles (usuarios) que tienen esos roles
        const { data: perfilesAdmins, error: errorAdmins } = await supabase
          .schema("cliente")
          .from("perfil")
          .select("id_perfil")
          .in("id_rol", idsRoles);

        if (!errorAdmins && perfilesAdmins && perfilesAdmins.length > 0) {
          // 4. Preparar las notificaciones respetando las columnas de tu tabla
          const notificaciones = perfilesAdmins.map((admin) => ({
            id_perfil: admin.id_perfil,
            mensaje: "Se ha creado un nuevo PQRS que requiere atención.",
            tipo: "ALERTA", // Opciones permitidas: 'INFORMATIVA', 'ALERTA', 'PROMOCION', 'SISTEMA'
            estado_notificacion: false
          }));

          // 5. Insertar las notificaciones en bloque en la tabla cliente.notificacion
          await supabase
            .schema("cliente")
            .from("notificacion")
            .insert(notificaciones);
        }
      }
    } catch (notifError) {
      // Si ocurre un error enviando la notificación, no interrumpimos la respuesta del PQRS
      console.error("Error al enviar notificaciones a los administradores:", notifError);
    }

    // Responder exitosamente con el PQRS creado
    res.status(201).json(nuevoPQRS);

  } catch (error) {
    console.error("Error en crearPQRS:", error);
    res.status(500).json({ mensaje: "Error interno del servidor", error });
  }
};

export const obtenerPQRSporId = async (req, res) => {
  try {

    const { id } = req.params;

    // ==========================
    // Obtener PQRS
    // ==========================

    const { data: pqrs, error } = await supabase
      .schema("cliente")
      .from("pqrs")
      .select("*")
      .eq("id_pqrs", id)
      .single();

    if (error) {
      return res.status(404).json(error);
    }

    // ==========================
    // Obtener perfil
    // ==========================

    const {
      data: perfil,
      error: errorPerfil
    } = await supabase
      .schema("cliente")
      .from("perfil")
      .select(`
        id_perfil,
        primer_nombre,
        segundo_nombre,
        primer_apellido,
        segundo_apellido
      `)
      .eq("id_perfil", pqrs.id_perfil)
      .single();

    if (errorPerfil) {
      return res.status(400).json(errorPerfil);
    }

    // ==========================
    // Obtener correo
    // ==========================

    const {
      data: usuario,
      error: errorUsuario
    } = await supabase.auth.admin.getUserById(
      pqrs.id_perfil
    );

    if (errorUsuario) {
      console.error(errorUsuario);
    }

    res.json({
      ...pqrs,
      perfil: {
        ...perfil,
        correo: usuario?.user?.email ?? null
      }
    });

  } catch (error) {
    res.status(500).json(error);
  }
};

export const listarMisPQRS = async (req, res) => {
  try {

    const { data, error } = await supabase
      .schema("cliente")
      .from("pqrs")
      .select("*")
      .eq("id_perfil", req.user.id);

    if (error) {
      return res.status(400).json(error);
    }

    res.json(data);

  } catch (error) {
    res.status(500).json(error);
  }
};

export const responderPQRS = async (req, res) => {
  try {
    const { id } = req.params;
    const { respuesta_pqrs } = req.body;

    // 1. Actualizar el PQRS con la respuesta
    const { data, error } = await supabase
      .schema("cliente")
      .from("pqrs")
      .update({
        respuesta_pqrs
      })
      .eq("id_pqrs", id)
      .select();

    if (error) {
      return res.status(400).json(error);
    }

    const pqrsActualizado = data[0];

    // 2. Enviar la notificación al cliente o vendedor que creó el PQRS
    if (pqrsActualizado && pqrsActualizado.id_perfil) {
      try {
        await supabase
          .schema("cliente")
          .from("notificacion")
          .insert([
            {
              id_perfil: pqrsActualizado.id_perfil, // El dueño del PQRS
              mensaje: "Tu PQRS ha recibido una respuesta.",
              tipo: "INFORMATIVA", // Valores permitidos: 'INFORMATIVA', 'ALERTA', 'PROMOCION', 'SISTEMA'
              estado_notificacion: false
            }
          ]);
      } catch (notifError) {
        // Si falla la notificación, no interrumpimos la respuesta exitosa al administrador
        console.error("Error al enviar la notificación al usuario:", notifError);
      }
    }

    // Responder exitosamente con el PQRS actualizado
    res.json(pqrsActualizado);

  } catch (error) {
    console.error("Error en responderPQRS:", error);
    res.status(500).json({ mensaje: "Error interno del servidor", error });
  }
};
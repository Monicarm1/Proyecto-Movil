import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { me } from "../api/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [perfil, setPerfil] = useState(null);
  const [rol, setRol] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restaurar sesión al abrir la aplicación
  useEffect(() => {
    const restaurarSesion = async () => {
      try {

        const res = await me();

        setUser(res.data.user);
        setPerfil(res.data.perfil);

        setRol(
          res.data.perfil?.rol?.nombre_rol
        );

      } catch (error) {

        setUser(null);
        setPerfil(null);
        setRol(null);

      } finally {
        setLoading(false);
      }
    };

    restaurarSesion();
  }, []);

  const login = (userData, perfilData) => {
    const rolNombre = perfilData?.rol?.nombre_rol ?? null;

    setUser(userData);
    setPerfil(perfilData);
    setRol(rolNombre);

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("perfil", JSON.stringify(perfilData));
    localStorage.setItem("rol", rolNombre);
  };

  const logout = () => {
    setUser(null);
    setPerfil(null);
    setRol(null);

    localStorage.removeItem("user");
    localStorage.removeItem("perfil");
    localStorage.removeItem("rol");
  };

  const value = useMemo(
    () => ({
      user,
      perfil,
      rol,
      loading,
      isAuthenticated: !!user,
      login,
      logout,
    }),
    [user, perfil, rol, loading]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }

  return context;
}
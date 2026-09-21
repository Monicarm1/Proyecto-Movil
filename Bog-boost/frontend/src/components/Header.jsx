import "../styles/Header.css";
import { useEffect, useState } from "react";
import { obtenerNotificaciones } from "../api/notificacionApi";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { obtenerCategorias } from "../api/categoriaApi";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../api/auth";

function Header() {
  const navigate = useNavigate();

  const { user, rol, logout, isAuthenticated } = useAuth();

  const [catalogoOpen, setCatalogoOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pendientes, setPendientes] = useState(0);
  const [categorias, setCategorias] = useState([]);
  
  // 1. Estado para almacenar lo que el usuario escribe en el buscador
  const [searchTerm, setSearchTerm] = useState("");

  const go = (path) => {
    navigate(path);
    setCatalogoOpen(false);
    setMobileMenuOpen(false);
  };

  // 2. Función para manejar la búsqueda al presionar Enter o hacer clic en la lupa
  const handleSearch = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      if (searchTerm.trim() !== "") {
        navigate(`/buscar?q=${encodeURIComponent(searchTerm.trim())}`);
        setSearchTerm(""); // Limpia el input tras buscar
        setMobileMenuOpen(false);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      logout();
      navigate("/");
      setMobileMenuOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const avatarLetter =
    user?.primer_nombre?.charAt(0)?.toUpperCase() ||
    user?.email?.charAt(0)?.toUpperCase() ||
    "U";

  useEffect(() => {
    cargarCategorias();

    if (isAuthenticated) {
      cargarNotificaciones();
    }
  }, [isAuthenticated]);

  const cargarNotificaciones = async () => {
    try {
      const data = await obtenerNotificaciones();
      setPendientes(data.filter(n => !n.estado_notificacion).length);
    } catch (error) {
      console.error(error);
    }
  };

  const cargarCategorias = async () => {
    try {
      const data = await obtenerCategorias();
      setCategorias(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="navbar">

      {/* LOGO */}
      <div className="logo-container" onClick={() => go("/")} style={{ cursor: "pointer" }}>
        <img src={logo} alt="Logo" className="logo" />
      </div>

      {/* MENU DESKTOP */}
      <nav className="menu">

        {rol === "SUPER_ADMIN" ? (

          <a onClick={() => go("/admin")}>Panel Principal</a>

        ) : rol === "VENDEDOR" ? (

          <>
            <a onClick={() => go("/vendedor")}>Perfil Negocio</a>
            <a onClick={() => go("/ventas")}>Ventas</a>
            <a onClick={() => go("/stock")}>Inventario y Stock</a>
          </>

        ) : (

          <>
            <a onClick={() => go("/")}>Inicio</a>

            {/* CATEGORÍAS DINÁMICAS */}
            <div className="catalogo-container">

              <a
                className="catalogo-link"
                onClick={(e) => {
                  e.preventDefault();
                  setCatalogoOpen(!catalogoOpen);
                }}
              >
                Categorías <i className={`fas fa-chevron-down dropdown-arrow ${catalogoOpen ? "rotate" : ""}`}></i>
              </a>

              <div className={`catalogo-dropdown ${catalogoOpen ? "show" : ""}`}>

                {categorias.length > 0 ? (
                  categorias.map((cat) => (
                    <a
                      key={cat.id_categoria}
                      onClick={() => go(`/categoria/${cat.id_categoria}`)}
                    >
                      <i className="fas fa-tag"></i> {cat.nombre_categoria}
                    </a>
                  ))
                ) : (
                  <span className="dropdown-empty">
                    Cargando...
                  </span>
                )}

              </div>

            </div>

            <a onClick={() => go("/negocios")}>Negocios</a>
          </>

        )}

      </nav>

      {/* SEARCH CONECTADO */}
      {rol !== "SUPER_ADMIN" && rol !== "VENDEDOR" && (
        <div className="search-box">
          <input
            type="text"
            placeholder="Buscar productos o negocios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch}
          />
          <i className="fas fa-search" onClick={handleSearch} style={{ cursor: "pointer" }}></i>
        </div>
      )}

      {/* ICONOS */}
      <div className="user-icons">

        {isAuthenticated && (
          <div className="user-profile" onClick={() => go("/perfil")}>
            <div className="user-avatar">{avatarLetter}</div>
          </div>
        )}

        {rol !== "SUPER_ADMIN" && rol !== "VENDEDOR" && (
          <div className="cart-icon" onClick={() => go("/carrito")}>
            <i className="fas fa-shopping-cart"></i>
          </div>
        )}

        {isAuthenticated && (
          <div className="bell-container" onClick={() => go("/notificaciones")}>
            <i className="fas fa-bell"></i>
            {pendientes > 0 && <span className="badge">{pendientes}</span>}
          </div>
        )}

        {/* MENU MOBILE BOTÓN */}
        <div
          className="mobile-toggle"
          onClick={() => setMobileMenuOpen(true)}
        >
          <i className="fas fa-bars"></i>
        </div>

      </div>

      {/* OVERLAY */}
      <div
        className={`mobile-overlay ${mobileMenuOpen ? "show" : ""}`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* ========================= */}
      {/* MENÚ LATERAL */}
      {/* ========================= */}
      <div className={`mobile-menu ${mobileMenuOpen ? "show" : ""}`}>

        <div className="mobile-header">

          {isAuthenticated ? (
            <>
              <div className="mobile-avatar">
                {avatarLetter}
              </div>

              <h3>
                {user?.primer_nombre}
              </h3>
            </>
          ) : (
            <h3>Menú</h3>
          )}

        </div>

        {rol === "SUPER_ADMIN" ? (

          <a onClick={() => go("/admin")}>
            Panel Principal
          </a>

        ) : rol === "VENDEDOR" ? (

          <>
            <a onClick={() => go("/vendedor")}>
              Perfil Negocio
            </a>

            <a onClick={() => go("/ventas")}>
              Ventas
            </a>

            <a onClick={() => go("/stock")}>
              Inventario y Stock
            </a>
          </>

        ) : (

          <>
            <a onClick={() => go("/")}>
              Inicio
            </a>

            <div className="catalogo-container">

              <a
                className="catalogo-link"
                onClick={(e) => {
                  e.preventDefault();
                  setCatalogoOpen(!catalogoOpen);
                }}
              >
                Categorías <i className={`fas fa-chevron-down dropdown-arrow ${catalogoOpen ? "rotate" : ""}`}></i>
              </a>

              <div
                className={`catalogo-dropdown ${catalogoOpen ? "show" : ""}`}
              >

                {categorias.length > 0 ? (
                  categorias.map((cat) => (
                    <a
                      key={cat.id_categoria}
                      onClick={() =>
                        go(`/catalogo/${cat.id_categoria}`)
                      }
                    >
                      <i className="fas fa-tag"></i> {cat.nombre_categoria}
                    </a>
                  ))
                ) : (
                  <span className="dropdown-empty">
                    No hay categorías
                  </span>
                )}

              </div>

            </div>

            <a onClick={() => go("/negocios")}>
              Negocios
            </a>

          </>

        )}

        {!isAuthenticated ? (

          <>
            <a onClick={() => go("/login")}>
              Iniciar Sesión
            </a>

            <a onClick={() => go("/registro")}>
              Registro
            </a>
          </>

        ) : rol === "CLIENTE" ? (

          <>
            <a onClick={() => go("/perfil")}>
              Mi Perfil
            </a>

            <a onClick={() => go("/historial")}>
              Historial/Compras
            </a>

            <a onClick={() => go("/contacto")}>
              Contáctenos/PQRS
            </a>
          </>

        ) : rol === "SUPER_ADMIN" ? (

          <>
            <a onClick={() => go("/perfil")}>
              Perfil
            </a>

            <a onClick={() => go("/admin/negocios")}>
              Negocios
            </a>

            <a onClick={() => go("/admin/usuarios")}>
              Usuarios
            </a>

            <a onClick={() => go("/admin/solicitudes")}>
              Solicitudes
            </a>

            <a onClick={() => go("/admin/pqrs")}>
              PQRS
            </a>

            <a onClick={() => go("/ventas")}>
              Reportes
            </a>
          </>

        ) : rol === "VENDEDOR" ? (

          <>
            <a onClick={() => go("/perfil")}>
              Perfil
            </a>

            <a onClick={() => go("/contacto")}>
              Contáctenos/PQRS
            </a>
          </>

        ) : null}

        {isAuthenticated && (
          <a
            className="logout"
            onClick={handleLogout}
          >
            Cerrar Sesión
          </a>
        )}

      </div>

    </header>
  );
}

export default Header;
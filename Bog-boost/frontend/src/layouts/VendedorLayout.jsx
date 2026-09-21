import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./css/VendedorLayout.css";

function VendedorLayout() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const go = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="vendedor-layout">

      {/* ================= SIDEBAR ================= */}
      <aside className="sidebar">

        <div className="sidebar-header">
          <h2>Panel Vendedor</h2>

          {user && (
            <p className="user-info">
              {user.email}
            </p>
          )}
        </div>

        <nav className="sidebar-nav">

          <button onClick={() => go("/vendedor/dashboard")}>
            📊 Dashboard
          </button>

          <button onClick={() => go("/vendedor/negocios")}>
            🏪 Mis negocios
          </button>

          <button onClick={() => go("/vendedor/productos")}>
            📦 Productos
          </button>

          <button onClick={() => go("/vendedor/ventas")}>
            💰 Ventas
          </button>

        </nav>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">
            🚪 Cerrar sesión
          </button>
        </div>

      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="vendedor-content">
        <Outlet />
      </main>

    </div>
  );
}

export default VendedorLayout;
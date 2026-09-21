import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

// Layouts
import ClienteLayout from "./layouts/ClienteLayout";

// Mapa
import MapaMercadoPagina from './pages/MapaMercadoPagina.jsx';

// Cliente
import Home from "./pages/cliente/Home";
import Perfil from "./pages/cliente/Perfil";
import RegistrarNegocio from "./pages/cliente/RegistrarNegocio";
import Negocios from "./pages/cliente/Negocios";
import NegocioDetalle from "./pages/cliente/NegocioDetalle";
import PQRS from "./pages/cliente/PQRS";
import Historial from "./pages/cliente/Historial";
import ComentariosProducto from "./pages/cliente/ComentariosProducto";
import ResultadosBusqueda from "./components/home/ResultadosBusqueda";
import Notificaciones from "./pages/cliente/Notificaciones";
import Categoria from "./pages/cliente/Categoria";


// Auth
import Login from "./pages/auth/Login";
import Registro from "./pages/auth/Registro";
import RecuperarPassword from "./pages/auth/RecuperarPassword";
import ActualizarPassword from "./pages/auth/ActualizarPassword";

// Admin
import AdminHome from "./pages/admin/AdminHome";
import SolicitudesAdmin from "./pages/admin/SolicitudesAdmin";
import ListaNegociosAdmin from "./pages/admin/ListaNegociosAdmin";
import ListaUsuariosAdmin from "./pages/admin/ListaUsuariosAdmin";
import AdminPQRS from "./pages/admin/AdminPQRS";
import ReportesAdmin from "./pages/admin/ReportesAdmin";

// Vendedor
import PerfilNegocio from "./pages/vendedor/PerfilNegocio";
import DetalleProducto from "./components/home/DetalleProducto";
import Carrito from "./pages/cliente/Carrito";
import AdminMovimientoStock from "./pages/vendedor/MovimientoStock";
import AdminVentasYSeguimiento from "./pages/vendedor/AdminVentasYSeguimiento";

function App() {
  return (
    <Routes>
      {/* CLIENTE - Todo bajo ClienteLayout */}
      <Route path="/" element={<ClienteLayout />}>
        <Route index element={<Home />} />
        
        {/* Públicas */}
        <Route path="login" element={<Login />} />
        <Route path="registro" element={<Registro />} />
        <Route path="recuperar-password" element={<RecuperarPassword />} />
        <Route path="cambiar-password" element={<ActualizarPassword />} />
        <Route path="mapa-mercado" element={<MapaMercadoPagina />} />
        <Route path="negocios" element={<Negocios />} />
        <Route path="negocios/:id" element={<NegocioDetalle />} />
        <Route path="producto/:id" element={<DetalleProducto />} />
        <Route path="producto/:idProducto/comentarios" element={<ComentariosProducto />} />
        <Route path="carrito" element={<Carrito />} />
        <Route path="contacto" element={<PQRS />} />
        <Route path="historial" element={<Historial />} />
        <Route path="buscar" element={<ResultadosBusqueda />} />
        <Route path="categoria/:id" element={<Categoria />} />

        {/* Requieren inicio de sesión */}
        <Route path="perfil" element={<ProtectedRoute> <Perfil /> </ProtectedRoute>} />
        <Route path="registrar-negocio" element={<ProtectedRoute> <RegistrarNegocio /> </ProtectedRoute>} />
        <Route path="notificaciones" element={<ProtectedRoute> <Notificaciones /> </ProtectedRoute>} />

        {/* VENDEDOR */}
        <Route path="vendedor" element={<ProtectedRoute allowedRoles={["VENDEDOR"]}><PerfilNegocio /></ProtectedRoute>} />
        <Route path="stock" element={<ProtectedRoute allowedRoles={["VENDEDOR"]}><AdminMovimientoStock /> </ProtectedRoute>} />
        <Route path="ventas" element={<ProtectedRoute allowedRoles={["VENDEDOR"]}><AdminVentasYSeguimiento /></ProtectedRoute>}/>

        {/* ADMINISTRADOR */}
        <Route path="admin" element={<ProtectedRoute allowedRoles={["SUPER_ADMIN"]}> <AdminHome /></ProtectedRoute>}/>
        <Route path="admin/solicitudes" element={<ProtectedRoute allowedRoles={["SUPER_ADMIN"]}> <SolicitudesAdmin /> </ProtectedRoute>}/>
        <Route path="admin/negocios" element={<ProtectedRoute allowedRoles={["SUPER_ADMIN"]}><ListaNegociosAdmin /></ProtectedRoute>} />
        <Route path="admin/usuarios" element={<ProtectedRoute allowedRoles={["SUPER_ADMIN"]}> <ListaUsuariosAdmin /></ProtectedRoute>}/>
        <Route path="admin/pqrs" element={<ProtectedRoute allowedRoles={["SUPER_ADMIN"]}><AdminPQRS /></ProtectedRoute>} />
        <Route path="admin/reportes" element={<ProtectedRoute allowedRoles={["SUPER_ADMIN"]}><ReportesAdmin /></ProtectedRoute>} />
      </Route>
    </Routes>
  );
}

export default App;
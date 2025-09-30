import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Produtos from "./pages/Produtos";
import Estoque from "./pages/Estoque";
import Relatorios from "./pages/Relatorio";
import Perfil from "./pages/Perfil"; 
import { useAuth } from "./context/AuthContext";

type PrivateRouteProps = { children: React.ReactNode };

function PrivateRoute({ children }: PrivateRouteProps) {
  const { isAuthed } = useAuth();
  return isAuthed ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/produtos"
        element={
          <PrivateRoute>
            <Produtos />
          </PrivateRoute>
        }
      />

      <Route
        path="/estoque"
        element={
          <PrivateRoute>
            <Estoque />
          </PrivateRoute>
        }
      />

      <Route
        path="/relatorios"
        element={
          <PrivateRoute>
            <Relatorios />
          </PrivateRoute>
        }
      />

      {/* ROTA DO PERFIL */}
      <Route
        path="/perfil"
        element={
          <PrivateRoute>
            <Perfil />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

import { Link } from "react-router-dom";
import Button from "./Button";
import { useAuth } from "../context/AuthContext";

export default function Topbar() {
  const { user, logout } = useAuth();

  return (
    <div className="topbar">
      <strong>SGE • Gestão de Insumos</strong>

      <nav className="gap">
        <Link to="/">Inicio</Link>
        <Link to="/produtos">Produtos</Link>
        <Link to="/estoque">Estoque</Link>
        <Link to="/relatorios">Relatórios</Link>
      </nav>

      <div className="gap">
        <span className="muted">Olá, {user?.nome ?? "usuário"}</span>
        <Link to="/perfil">
          <Button variant="ghost">Perfil</Button>
        </Link>
        <Link to="/login">
          <Button variant="ghost" onClick={logout}>
            Sair
          </Button>
        </Link>
      </div>
    </div>
  );
}

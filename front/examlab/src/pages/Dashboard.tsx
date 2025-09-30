
import Topbar from "../components/Topbar";
import Header from "../components/Header";
import Card from "../components/Card";
import Button from "../components/Button";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <>
      <Topbar />
      <main className="container">
        <Header title="Dashboard" subtitle="Atalhos para os módulos" />
        <div className="grid">
          <Card title="Cadastro de Produtos (Insumos)">
            <p>Registre código, descrição, categoria, unidade e estoque mínimo.</p>
            <Link to="/produtos"><Button>Abrir</Button></Link>
          </Card>
          <Card title="Gestão de Estoque">
            <p>Controle entradas e saídas por lote, com justificativa e alertas.</p>
            <Link to="/estoque"><Button>Abrir</Button></Link>
          </Card>
          <Card title="Relatórios (placeholder)">
            <p>Área reservada para relatórios.</p>
            <Button disabled>Em breve</Button>
          </Card>
        </div>
      </main>
    </>
  );
}

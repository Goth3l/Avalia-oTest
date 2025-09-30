import React, { useState } from "react";
import Topbar from "../components/Topbar";
import Header from "../components/Header";
import Card from "../components/Card";
import Table from "../components/Table";
import Select from "../components/Select";
import Input from "../components/Input";
import Button from "../components/Button";
import Alert from "../components/Alert";
import { Link } from "react-router-dom";

const produtosFake = [
  { id: 1, nome: "Seringa 5ml", categoria: "seringa", estoqueMinimo: 100 },
  { id: 2, nome: "Reagente A", categoria: "reagente", estoqueMinimo: 50 },
];

export default function Estoque() {
  const [produto, setProduto] = useState<string>("");
  const [qtd, setQtd] = useState<string>("");
  const [alert, setAlert] = useState<string>(" ");

  const entrada = () =>
    setAlert(`Entrada registrada (simulada) para "${produto}" em ${qtd} un.`);
  const saida = () =>
    setAlert(`Saída registrada (simulada) para "${produto}" em ${qtd} un.`);

  return (
    <>
      <Topbar />
      <main className="container">
        <Header title="Gestão de Estoque" subtitle="Operações simuladas" />

        <Card title="Selecionar Produto">
          <div className="row">
            <Select
              label="Produto"
              value={produto}
              onChange={(e) => setProduto(e.target.value)}
              options={produtosFake.map((p) => ({ label: `${p.nome} (${p.categoria})`, value: p.nome }))}
            />
            <Input label="Quantidade" type="number" value={qtd} onChange={(e) => setQtd(e.target.value)} />
            <Button onClick={entrada}>Entrada</Button>
            <Button variant="secondary" onClick={saida}>Saída</Button>
            <Link to="/"><Button variant="ghost">Tela Principal</Button></Link>
          </div>
          <Alert text={alert} />
        </Card>

        <Card title="Tabela de Produtos">
          <Table columns={["ID", "Nome", "Categoria", "Estoque Atual", "Estoque Mínimo"]} />
        </Card>

        <Card title="Alertas de Estoque Mínimo">
          <p className="muted">Área reservada para alertas automáticos.</p>
        </Card>
      </main>
    </>
  );
}

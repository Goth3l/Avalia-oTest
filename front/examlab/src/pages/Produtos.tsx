import React, { useState } from "react";
import Topbar from "../components/Topbar";
import Header from "../components/Header";
import Card from "../components/Card";
import Input from "../components/Input";
import Select from "../components/Select";
import Button from "../components/Button";
import Table from "../components/Table";
import { Link } from "react-router-dom";

export default function Produtos() {
  const [q, setQ] = useState("");
  const categorias = ["seringa", "reagente", "equipamento"];

  return (
    <>
      <Topbar />
      <main className="container">
        <Header title="Cadastro de Produtos (Insumos)" subtitle="Layout e navegação simulados" />

        <Card title="Buscar">
          <div className="row">
            <Input label="Termo" placeholder="Nome, código..." value={q} onChange={(e) => setQ(e.target.value)} />
            <Button>Buscar</Button>
            <Link to="/"><Button variant="ghost">Tela Principal</Button></Link>
          </div>
        </Card>

        <Card title="Resultados">
          <Table columns={["ID", "Nome", "Categoria", "Preço", "Quantidade"]} />
        </Card>

        <Card title="Formulário de Cadastro" actions={<Button>Salvar</Button>}>
          <div className="grid-2">
            <Input label="Código" placeholder="ex: S001" />
            <Input label="Nome" placeholder="Seringa 5ml" />
            <Select label="Categoria" options={categorias} />
            <Input label="Unidade de Medida" placeholder="unidade, ml..." />
            <Input label="Preço" type="number" placeholder="0,00" />
            <Input label="Quantidade" type="number" placeholder="0" />
            <Input label="Estoque Mínimo" type="number" placeholder="0" />
          </div>
          <div className="row mt">
            <Button variant="secondary" type="button">Limpar</Button>
            <Button variant="danger" type="button">Excluir</Button>
          </div>
        </Card>
      </main>
    </>
  );
}

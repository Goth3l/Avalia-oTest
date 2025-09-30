import Topbar from "../components/Topbar";
import Header from "../components/Header";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";

export default function Perfil(){
  const { user, updateUser } = useAuth();
  const [nome,setNome]=useState(""); const [email,setEmail]=useState("");
  const [telefone,setTelefone]=useState(""); const [cnpj,setCnpj]=useState("");

  useEffect(()=>{ if(user){ setNome(user.nome); setEmail(user.email); setTelefone(user.telefone||""); setCnpj(user.cnpj||""); }},[user]);

  function salvar(){
    updateUser({ nome, email, telefone, cnpj });
    alert("Perfil atualizado!");
  }

  return (
    <>
      <Topbar/>
      <main className="container">
        <Header title="Meu Perfil" subtitle="Edite seus dados"/>
        <Card title="Dados do usuário" actions={<Button onClick={salvar}>Salvar</Button>}>
          <div className="grid-2">
            <Input label="Nome" value={nome} onChange={e=>setNome(e.target.value)} />
            <Input label="Email" value={email} onChange={e=>setEmail(e.target.value)} />
            <Input label="Telefone" value={telefone} onChange={e=>setTelefone(e.target.value)} />
            <Input label="CNPJ" value={cnpj} onChange={e=>setCnpj(e.target.value)} />
          </div>
        </Card>
      </main>
    </>
  );
}

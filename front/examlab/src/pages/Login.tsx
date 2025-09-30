import Input from "../components/Input";
import Button from "../components/Button";
import Alert from "../components/Alert";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPwd] = useState("");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const nav = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = login({ email, password, nome, telefone, cnpj });
    if (res.ok) nav("/");
    else setError(res.error || "Falha no login");
  }

  return (
    <div className="auth-wrap">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Entrar</h2>
        <Input label="Nome" value={nome} onChange={(e)=>setNome(e.target.value)} placeholder="Seu nome"/>
        <Input label="Telefone" value={telefone} onChange={(e)=>setTelefone(e.target.value)} placeholder="(11) 99999-9999"/>
        <Input label="CNPJ" value={cnpj} onChange={(e)=>setCnpj(e.target.value)} placeholder="00.000.000/0000-00"/>
        <Input label="Email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <Input label="Senha" type="password" value={password} onChange={(e)=>setPwd(e.target.value)} />
        <Alert text={error} />
        <Button type="submit" className="mt">Login</Button>
      </form>
    </div>
  );
}

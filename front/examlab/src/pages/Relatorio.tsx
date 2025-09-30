import Header from "../components/Header";
import Topbar from "../components/Topbar";
import Card from "../components/Card";
import Table from "../components/Table";
import Input from "../components/Input";
import Select from "../components/Select";
import Button from "../components/Button";
import { useMemo, useState } from "react";

/** MOCKS de movimentações */
type Mov = { id:number; data:string; tipo:"entrada"|"saida"; item:string; lote:string; qtd:number };
const MOVS:Mov[] = [
  { id:1, data:"2025-09-25", tipo:"entrada", item:"Seringa 5ml", lote:"L001", qtd:500 },
  { id:2, data:"2025-09-26", tipo:"saida",   item:"Seringa 5ml", lote:"L001", qtd:120 },
  { id:3, data:"2025-09-27", tipo:"entrada", item:"Reagente A",  lote:"A-09", qtd:80  },
  { id:4, data:"2025-09-28", tipo:"saida",   item:"Reagente A",  lote:"A-09", qtd:30  },
  { id:5, data:"2025-09-29", tipo:"saida",   item:"Seringa 5ml", lote:"L001", qtd:200 },
];

const ITEMS_MINIMO = [
  { item:"Seringa 5ml", estoque:180, minimo:200 },
  { item:"Reagente A", estoque:50,  minimo:40  },
];

export default function Relatorios(){
  const [ini,setIni]=useState("2025-09-25");
  const [fim,setFim]=useState("2025-09-30");
  const [tipo,setTipo]=useState<string>("");

  const movs = useMemo(()=> {
    const s = new Date(ini); const e = new Date(fim);
    return MOVS.filter(m=>{
      const d=new Date(m.data);
      const byDate = d>=s && d<=e;
      const byTipo = !tipo || m.tipo===tipo;
      return byDate && byTipo;
    });
  },[ini,fim,tipo]);

  const totalEntradas = movs.filter(m=>m.tipo==="entrada").reduce((a,b)=>a+b.qtd,0);
  const totalSaidas   = movs.filter(m=>m.tipo==="saida").reduce((a,b)=>a+b.qtd,0);
  const saldoPeriodo  = totalEntradas-totalSaidas;
  const abaixoMin = ITEMS_MINIMO.filter(i=>i.estoque<i.minimo).length;

  const perc = (num:number,den:number)=> Math.max(0, Math.min(100, den? Math.round((num/den)*100):0));

  return (
    <>
      <Topbar/>
      <main className="container">
        <Header title="Relatórios" subtitle="Entradas, saídas, saldo e alertas"/>

        <Card title="Filtros">
          <div className="row">
            <Input label="Início" type="date" value={ini} onChange={e=>setIni(e.target.value)} />
            <Input label="Fim"    type="date" value={fim} onChange={e=>setFim(e.target.value)} />
            <Select label="Tipo" value={tipo} onChange={e=>setTipo(e.target.value)}
              options={[{label:"Todos", value:""},{label:"Entrada", value:"entrada"},{label:"Saída", value:"saida"}]} />
            <Button onClick={()=>{ /* placeholder */ }}>Aplicar</Button>
          </div>
        </Card>

        <div className="grid">
          <Card title="Entradas no período">
            <div className="kpi">
              <strong>{totalEntradas} un.</strong>
              <div className="bar" style={{width:"60%"}}><i style={{width:`${perc(totalEntradas, totalEntradas+totalSaidas)}%`}}/></div>
            </div>
          </Card>

          <Card title="Saídas no período">
            <div className="kpi">
              <strong>{totalSaidas} un.</strong>
              <div className="bar" style={{width:"60%"}}><i style={{width:`${perc(totalSaidas, totalEntradas+totalSaidas)}%`}}/></div>
            </div>
          </Card>

          <Card title="Saldo do período">
            <div className="kpi">
              <strong>{saldoPeriodo} un.</strong>
              <div className="bar" style={{width:"60%"}}><i style={{width:`${perc(Math.abs(saldoPeriodo), totalEntradas+totalSaidas)}%`}}/></div>
            </div>
          </Card>

          <Card title="Itens abaixo do mínimo">
            <div className="kpi">
              <strong>{abaixoMin}</strong>
              <div className="bar" style={{width:"60%"}}><i style={{width:`${perc(abaixoMin, ITEMS_MINIMO.length)}%`}}/></div>
            </div>
          </Card>
        </div>

        <Card title="Movimentações">
          <Table columns={["ID","Data","Tipo","Item","Lote","Qtd"]}>
            {movs.map(m=>(
              <tr key={m.id}>
                <td>{m.id}</td><td>{m.data}</td><td>{m.tipo}</td>
                <td>{m.item}</td><td>{m.lote}</td><td>{m.qtd}</td>
              </tr>
            ))}
          </Table>
        </Card>

        <Card title="Estoque x Mínimo">
          <Table columns={["Item","Estoque","Mínimo","Status"]}>
            {ITEMS_MINIMO.map(i=>{
              const ok = i.estoque>=i.minimo;
              return (
                <tr key={i.item}>
                  <td>{i.item}</td>
                  <td>{i.estoque}</td>
                  <td>{i.minimo}</td>
                  <td style={{color: ok? "green": "var(--danger)"}}>
                    {ok? "OK":"Abaixo do mínimo"}
                  </td>
                </tr>
              );
            })}
          </Table>
        </Card>
      </main>
    </>
  );
}

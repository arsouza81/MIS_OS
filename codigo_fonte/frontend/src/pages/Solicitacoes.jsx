import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import HeaderGerente from "../components/HeaderGerente";
import { useSearchParams } from "react-router-dom";

export default function Solicitacoes() {
  const [NomesEIds, setNomesEIds] = useState([]);
  const [DiaSelecionado, setDiaSelecionado] = useState("");
  const [searchParams] = useSearchParams();

useEffect(() => {
  const data_solicitacao = searchParams.get("data_solicitacao");
  if (!data_solicitacao) return;

  fetch(`http://localhost:5053/user/api/selecionar_data?data_solicitacao=${data_solicitacao}`)
    .then(res => {
      if (!res.ok) throw new Error("Erro ao buscar solicitações");
      return res.json();
    })
    .then(data => {
      setDiaSelecionado(data.diaSelecionado || "");
      setNomesEIds(data.nomesEIds || []);
    })
    .catch(err => console.error(err));
}, [searchParams]);



  return (
    <>
      <HeaderGerente />
      <section className="menu">
        <h2>Solicitações do dia: {DiaSelecionado}</h2>
        <div className="info-box">
{NomesEIds.length > 0 ? (
  <>
    <p>Quantidade de solicitações: {NomesEIds.length}</p>
    <ul className="custom-list">
      {NomesEIds.map(item => (
        <li key={item.id}>
          <a href={`/user/detalhes_solicitacao/${item.id}`}>
            Servidor: {item.nome}, Data: {item.dataSolicitacao}
          </a>
        </li>
      ))}
    </ul>
  </>
) : (
  <p>Nenhuma solicitação encontrada para esta data.</p>
)}

        </div>
        <div className="form-solicitacao">
          <a href="/gerente">voltar</a>
        </div>
      </section>
      <Footer />
    </>
  );
}
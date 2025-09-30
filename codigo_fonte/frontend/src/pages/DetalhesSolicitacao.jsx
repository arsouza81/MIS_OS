import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import HeaderGerente from "../components/HeaderGerente";

export default function DetalhesSolicitacao() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [protocoloEncontrado, setProtocoloEncontrado] = useState(null);
  const [editStatus, setEditStatus] = useState(false);
  const [novoStatus, setNovoStatus] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5053/user/api/detalhes_solicitacao/${id}`)
      .then(res => res.json())
      .then(data => {
        setProtocoloEncontrado(data);
        setNovoStatus(data.status); // inicializa o select com o status atual
      })
      .catch(err => console.error(err));
  }, [id]);

  if (!protocoloEncontrado) return <p>Carregando...</p>;

  const atualizarStatus = () => {
    fetch("http://localhost:5053/atualizar_status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        protocolo: protocoloEncontrado.protocolo,
        novoStatus 
      })
    })
    .then(res => {
      if (!res.ok) throw new Error("Erro ao atualizar status");
      // Atualiza o estado local para refletir o novo status
      setProtocoloEncontrado({ ...protocoloEncontrado, status: novoStatus });
      setEditStatus(false);
    })
    .catch(err => console.error(err));
  };

  return (
    <>
      <HeaderGerente />

      <section className="menu">
        <h2>Detalhes da Solicitação</h2>
        <div className="info-box">
          <p><strong>Nome:</strong> {protocoloEncontrado.nome}</p>
          <p><strong>Email:</strong> {protocoloEncontrado.email}</p>
          <p><strong>Siape:</strong> {protocoloEncontrado.siape}</p>
          <p><strong>Bloco:</strong> {protocoloEncontrado.bloco}</p>
          <p><strong>Sala:</strong> {protocoloEncontrado.sala}</p>
          <p><strong>Descrição do Problema:</strong> {protocoloEncontrado.descricaoProblema}</p>
          <p>
            <strong>Status:</strong>{" "}
            {!editStatus ? (
              <span 
                className={`status-${protocoloEncontrado.status}`}
                style={{ cursor: "pointer" }}
                title="Clique para alterar o status"
                onClick={() => setEditStatus(true)}
              >
                {protocoloEncontrado.status}
              </span>
            ) : (
              <>
                <select 
                  value={novoStatus} 
                  onChange={(e) => setNovoStatus(e.target.value)}
                >
                  <option value="pendente">Pendente</option>
                  <option value="em_andamento">Em Andamento</option>
                  <option value="concluída">Concluída</option>
                  <option value="descartada">Descartada</option>
                </select>
                <button 
                  onClick={atualizarStatus} 
                  style={{ marginLeft: "10px", padding: "5px 10px" }}
                >
                  Atualizar
                </button>
              </>
            )}
          </p>
        </div>

        <div className="form-solicitacao">
          <a onClick={() => navigate(-1)} href="#">Voltar</a>
        </div>
      </section>

      <Footer />
    </>
  );
}

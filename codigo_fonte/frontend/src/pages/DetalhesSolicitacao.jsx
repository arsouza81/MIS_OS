import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import HeaderGerente from "../components/HeaderGerente";
import { Api } from "../services/Api";

export default function DetalhesSolicitacao() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [protocoloEncontrado, setProtocoloEncontrado] = useState(null);
  const [editStatus, setEditStatus] = useState(false);
  const [novoStatus, setNovoStatus] = useState("");
  const [erro, setErro] = useState("");

  useEffect(() => {
    const carregarDetalhes = async () => {
      try {
        setErro("");
        const data = await Api.buscarDetalhesSolicitacao(id);
        
        setProtocoloEncontrado(data);
        setNovoStatus(data.status);
      
      }catch(error) {
        console.error(error);
        setErro(error.message); 
      }
    };
    carregarDetalhes();
  }, [id]);

  const atualizarStatus = async () => {
    try {
      setErro("");
      await Api.atualizarStatus(
        protocoloEncontrado.protocolo,
        novoStatus
      );

      setProtocoloEncontrado({ ...protocoloEncontrado, status: novoStatus });
      setEditStatus(false);

    }catch(error) {
      console.error(error);
      setErro(error.message);
    }
  };

  if(!protocoloEncontrado) return <p>Carregando...</p>;

  return (
    <>
      <HeaderGerente />

      <section className="menu">
        <h2>Detalhes da Solicitação</h2>
        <div className="info-box">
          <p><strong>Nome:</strong> {protocoloEncontrado.nome}</p>
          <p><strong>Email:</strong> {protocoloEncontrado.email}</p>
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
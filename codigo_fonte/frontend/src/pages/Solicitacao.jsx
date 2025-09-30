import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Solicitacao() {
  const { protocolo } = useParams();
  const navigate = useNavigate();

  const [solicitacao, setSolicitacao] = useState(null);
  const [erro, setErro] = useState("");

  const buscarSolicitacao = async () => {
    try {
      const res = await fetch(
        `http://localhost:5053/FormServidor/buscar_protocolo?protocolo=${protocolo}`
      );

      if (!res.ok) throw new Error("Protocolo não encontrado");

      const data = await res.json();
      setSolicitacao(data);
      setErro("");
    } catch (err) {
      console.error(err);
      setErro(err.message);
    }
  };

  useEffect(() => {
    if (protocolo) buscarSolicitacao();
  }, [protocolo]);

  return (
    <div>
      <Header />
      <section className="menu">
        <h2>Consultar Solicitação</h2>

        {erro && <p style={{ color: "red" }}>{erro}</p>}

        {solicitacao && (
          <div className="info-box">
            <ul>
              <li>
                <strong>Protocolo:</strong> {solicitacao.protocolo}
              </li>
              <li>
                <strong>Nome:</strong> {solicitacao.nome}
              </li>
              <li>
                <strong>Email:</strong> {solicitacao.email}
              </li>
              {/* Siape removido */}
              <li>
                <strong>Bloco:</strong> {solicitacao.bloco}
              </li>
              <li>
                <strong>Sala:</strong> {solicitacao.sala}
              </li>
              <li>
                <strong>Descrição do Problema:</strong>{" "}
                {solicitacao.descricaoProblema}
              </li>
              <li>
                <strong>Data da Solicitação:</strong>{" "}
                {new Date(solicitacao.data_solicitacao).toLocaleString()}
              </li>
              <li>
                <strong>Status:</strong>{" "}
                <span className={`status-${solicitacao.status}`}>
                  {solicitacao.status}
                </span>
              </li>
            </ul>
          </div>
        )}

        <div className="form-solicitacao">
          <a
            onClick={() => navigate(-1)}
            href="#"
            style={{ cursor: "pointer" }}
          >
            Voltar
          </a>
        </div>
      </section>
      <Footer />
    </div>
  );
}

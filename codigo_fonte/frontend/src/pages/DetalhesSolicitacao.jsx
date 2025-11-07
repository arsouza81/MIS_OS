import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Api } from "../services/Api";

export default function DetalhesSolicitacao() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [protocoloEncontrado, setProtocoloEncontrado] = useState(null);
  const [editStatus, setEditStatus] = useState(false);
  const [novoStatus, setNovoStatus] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(true);
  const [atualizando, setAtualizando] = useState(false);

  useEffect(() => {
    const carregarDetalhes = async () => {
      try {
        setErro("");
        const data = await Api.buscarDetalhesSolicitacao(id);
        setProtocoloEncontrado(data);
        setNovoStatus(data.status);
      } catch (error) {
        console.error(error);
        setErro(error.message || "Erro ao carregar os detalhes.");
      } finally {
        setLoading(false);
      }
    };
    carregarDetalhes();
  }, [id]);

  const atualizarStatus = async () => {
    try {
      setErro("");
      setAtualizando(true);

      await Api.atualizarStatus(protocoloEncontrado.protocolo, novoStatus);

      setProtocoloEncontrado({
        ...protocoloEncontrado,
        status: novoStatus,
      });
      setEditStatus(false);
    } catch (error) {
      console.error(error);
      setErro(error.message || "Erro ao atualizar o status.");
    } finally {
      setAtualizando(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 animate-pulse">
        Carregando detalhes da solicitação...
      </div>
    );

  return (
    <div className="bg-[#F4F4F4] min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl p-8 border border-[#D9D9D9] shadow-sm w-full max-w-2xl"
        >
          <h2 className="text-3xl font-bold text-[#222222] mb-6 text-center">
            Detalhes da Solicitação
          </h2>

          {erro && (
            <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-md mb-6 text-center">
              {erro}
            </div>
          )}

          {protocoloEncontrado && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-6"
            >
              <ul className="space-y-3 text-gray-800">
                <li>
                  <strong>Nome:</strong> {protocoloEncontrado.nome}
                </li>
                <li>
                  <strong>Email:</strong> {protocoloEncontrado.email}
                </li>
                <li>
                  <strong>Bloco:</strong> {protocoloEncontrado.bloco}
                </li>
                <li>
                  <strong>Sala:</strong> {protocoloEncontrado.sala}
                </li>
                <li>
                  <strong>Descrição do Problema:</strong>{" "}
                  {protocoloEncontrado.descricaoProblema}
                </li>
                <li>
                  <strong>Status:</strong>{" "}
                  {!editStatus ? (
                    <span
                      onClick={() => setEditStatus(true)}
                      title="Clique para alterar o status"
                      className={`px-3 py-1 rounded-full text-white text-sm cursor-pointer hover:opacity-80 ${
                        protocoloEncontrado.status === "concluída"
                          ? "bg-green-600"
                          : protocoloEncontrado.status === "em_andamento"
                          ? "bg-yellow-500"
                          : protocoloEncontrado.status === "descartada"
                          ? "bg-gray-600"
                          : "bg-blue-600"
                      }`}
                    >
                      {protocoloEncontrado.status}
                    </span>
                  ) : (
                    <div className="flex items-center gap-2 mt-2">
                      <select
                        value={novoStatus}
                        onChange={(e) => setNovoStatus(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-[#176073] outline-none"
                      >
                        <option value="pendente">Pendente</option>
                        <option value="em_andamento">Em Andamento</option>
                        <option value="concluída">Concluída</option>
                        <option value="descartada">Descartada</option>
                      </select>

                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        disabled={atualizando}
                        onClick={atualizarStatus}
                        className="bg-[#176073] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#1b7086] transition-colors disabled:opacity-60"
                      >
                        {atualizando ? "Atualizando..." : "Salvar"}
                      </motion.button>
                    </div>
                  )}
                </li>
              </ul>
            </motion.div>
          )}

          <div className="mt-8 text-center">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate(-1)}
              className="bg-gray-300 text-gray-800 px-6 py-2 rounded-xl font-semibold hover:bg-gray-400 transition-colors"
            >
              Voltar
            </motion.button>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  User,
  Mail,
  Building,
  MapPin,
  FileText,
  Calendar,
  Clock,
} from "lucide-react";
import Footer from "../components/Footer";
import { Api } from "../services/Api";
import HeaderGerente from "../components/HeaderGerente";

export default function DetalhesSolicitacao() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [protocoloEncontrado, setProtocoloEncontrado] = useState(null);
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
        setErro(error.message || "Erro ao carregar os detalhes.");
      } finally {
        setLoading(false);
      }
    };
    carregarDetalhes();
  }, [id]);

  const atualizarStatus = async (status) => {
    try {
      setErro("");
      setAtualizando(true);
      await Api.atualizarStatus(protocoloEncontrado.protocolo, status);
      setProtocoloEncontrado({ ...protocoloEncontrado, status });
      setNovoStatus(status);
    } catch (error) {
      setErro(error.message || "Erro ao atualizar o status.");
    } finally {
      setAtualizando(false);
    }
  };

  const formatStatus = (status) => {
    switch (status) {
      case "pendente":
        return "Pendente";
      case "em_andamento":
        return "Em Andamento";
      case "concluída":
        return "Concluída";
      case "descartada":
        return "Descartada";
      default:
        return status;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "concluída":
        return "bg-green-600";
      case "em_andamento":
        return "bg-yellow-500";
      case "descartada":
        return "bg-gray-600";
      default:
        return "bg-blue-600";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("pt-BR");
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F4F4F4]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#176073] mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando detalhes...</p>
        </div>
      </div>
    );

  if (erro)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F4F4F4]">
        <FileText className="h-16 w-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-[#222] mb-2">Erro ao carregar</h2>
        <p className="text-gray-600 mb-6">{erro}</p>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center bg-[#176073] text-white px-5 py-2 rounded-lg hover:bg-[#1b7086] transition"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
        </button>
      </div>
    );

  return (
    <div className="bg-[#F4F4F4] min-h-screen flex flex-col">
      <HeaderGerente />

      <main className="flex-1 px-6 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Título */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center text-gray-600 hover:text-[#176073] mb-4 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
            </button>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-[#222222] mb-2">
                  Detalhes da Solicitação
                </h1>
                <p className="text-gray-600">
                  Protocolo: {protocoloEncontrado.protocolo}
                </p>
              </div>
              <span
                className={`px-4 py-2 rounded-full text-white text-sm font-medium mt-4 md:mt-0 ${getStatusColor(
                  protocoloEncontrado.status
                )}`}
              >
                {formatStatus(protocoloEncontrado.status)}
              </span>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Coluna 1 - Informações e Descrição */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="md:col-span-2 space-y-6"
            >
              {/* Informações do solicitante */}
              <div className="bg-white rounded-2xl p-6 border border-[#D9D9D9] shadow-sm">
                <h2 className="text-xl font-bold text-[#222222] mb-6">
                  Informações do Solicitante
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-[#176073]" />
                    <div>
                      <p className="text-gray-600 text-sm">Nome Completo</p>
                      <p className="text-[#222222] font-medium">
                        {protocoloEncontrado.nome}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-[#176073]" />
                    <div>
                      <p className="text-gray-600 text-sm">E-mail</p>
                      <p className="text-[#222222] font-medium">
                        {protocoloEncontrado.email}
                      </p>
                    </div>
                  </div>

                  {protocoloEncontrado.bloco && (
                    <div className="flex items-center space-x-3">
                      <Building className="h-5 w-5 text-[#176073]" />
                      <div>
                        <p className="text-gray-600 text-sm">Bloco</p>
                        <p className="text-[#222222] font-medium">
                          {protocoloEncontrado.bloco}
                        </p>
                      </div>
                    </div>
                  )}

                  {protocoloEncontrado.sala && (
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-[#176073]" />
                      <div>
                        <p className="text-gray-600 text-sm">Sala</p>
                        <p className="text-[#222222] font-medium">
                          {protocoloEncontrado.sala}
                        </p>
                      </div>
                    </div>
                  )}

                  {protocoloEncontrado.data_Solicitacao && (
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-[#176073]" />
                      <div>
                        <p className="text-gray-600 text-sm">Data/Hora</p>
                        <p className="text-[#222222] font-medium">
                          {formatDate(protocoloEncontrado.data_Solicitacao)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Descrição */}
              <div className="bg-white rounded-2xl p-6 border border-[#D9D9D9] shadow-sm">
                <h2 className="text-xl font-bold text-[#222222] mb-6">
                  Descrição do Problema
                </h2>
                <div className="flex items-start space-x-3">
                  <FileText className="h-5 w-5 text-[#176073] mt-1 flex-shrink-0" />
                  <p className="text-[#222222] leading-relaxed">
                    {protocoloEncontrado.descricaoProblema}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Coluna 2 - Ações */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-2xl p-6 border border-[#D9D9D9] shadow-sm">
                <h2 className="text-xl font-bold text-[#222222] mb-6">
                  Atualizar Status
                </h2>
                <div className="space-y-3">
                  {["pendente", "em_andamento", "concluída", "descartada"].map(
                    (status) => (
                      <button
                        key={status}
                        onClick={() => atualizarStatus(status)}
                        disabled={atualizando}
                        className={`w-full text-left px-4 py-2 rounded-lg font-medium border transition-all ${
                          novoStatus === status
                            ? `${getStatusColor(status)} text-white`
                            : "border-gray-300 hover:bg-gray-100"
                        }`}
                      >
                        {formatStatus(status)}
                      </button>
                    )
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
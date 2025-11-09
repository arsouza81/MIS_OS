import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft, FileText, Eye, MoreHorizontal } from "lucide-react"; 
import { Link, useSearchParams } from "react-router-dom";
import { Api } from "../services/Api";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Footer from "../components/Footer";
import HeaderGerente from "../components/HeaderGerente";

const formatStatus = (status) => {
  if (!status) return "";
  const map = {
    pendente: "Pendente",
    em_andamento: "Em Andamento",
    concluída: "Concluída",
    descartada: "Descartada",
  };
  return map[status.toLowerCase()] || status;
};

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case "concluída":
      return "bg-green-600";
    case "em andamento":
      return "bg-yellow-500";
    case "descartada":
      return "bg-gray-600";
    default:
      return "bg-blue-600";
  }
};



const formatDate = (dateString) => {
  if (!dateString) return "--/--/----";
  return new Date(dateString).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
};

function MenuStatus({ item, handleUpdateStatus }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Fecha o menu ao clicar fora
  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <Button
        size="sm"
        variant="outline"
        onClick={() => setOpen((prev) => !prev)}
      >
        <MoreHorizontal className="h-4 w-4" />
      </Button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg border border-[#D9D9D9] shadow-lg z-50">
          <div className="p-2 space-y-1">
            {["Pendente", "Em Andamento", "Concluída", "Descartada"].map(
              (status) => (
                <button
                  key={status}
                  onClick={() => {
                    handleUpdateStatus(item.id, status);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                    item.status === status
                      ? "bg-[#F4F4F4] text-[#222222]"
                      : "text-gray-600 hover:bg-[#F4F4F4] hover:text-[#222222]"
                  }`}
                >
                  {status}
                </button>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ----------------------------------------

export default function Solicitacoes() {
  const [solicitacoes, setSolicitacoes] = useState([]); 
  const [DiaSelecionado, setDiaSelecionado] = useState("");
  const [erro, setErro] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    const data_solicitacao = searchParams.get("data_solicitacao");
    if (!data_solicitacao) return;

    const carregarSolicitacoes = async () => {
      try {
        setErro("");
        setIsLoading(true);

        const data = await Api.buscarSolicitacoesPorData(data_solicitacao);
        
        setDiaSelecionado(data.diaSelecionado || "");
        setSolicitacoes(data.nomesEIds || []); 
      } catch (err) {
        console.error(err);
        setErro(err.message);
        toast({
          title: "Erro",
          description: err.message || "Erro ao buscar solicitações.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    carregarSolicitacoes();
  }, [searchParams, toast]);

  const handleUpdateStatus = async (solicitacaoId, novoStatus) => {
    try {
      const solicitacao = solicitacoes.find(s => s.id === solicitacaoId);
      if (!solicitacao || !solicitacao.protocolo) {
        throw new Error("Protocolo não encontrado para esta solicitação.");
      }

      await Api.atualizarStatus(solicitacao.protocolo, novoStatus.toLowerCase().replace(" ", "_"));

      const solicitacoesAtualizadas = solicitacoes.map(s =>
        s.id === solicitacaoId
          ? { ...s, status: novoStatus }
          : s
      );
      setSolicitacoes(solicitacoesAtualizadas);

      toast({
        title: "Sucesso!",
        description: `Status atualizado para ${novoStatus}`,
      });

    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      toast({
        title: "Erro",
        description: error.message || "Não foi possível atualizar o status.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <HeaderGerente />
      <div className="py-10 px-6 min-h-[calc(100vh-150px)] bg-[#F4F4F4]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h2 className="text-3xl font-bold text-[#222222] mb-2 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-[#176073]" />
              Solicitações do dia:{" "}
              <span className="text-[#176073]">{DiaSelecionado || "--/--/----"}</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Visualize todas as solicitações registradas nesta data.
            </p>
          </motion.div>

          {isLoading ? (
            <div className="flex items-center justify-center h-[300px]">
              <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#176073] mx-auto mb-4"></div>
        <p className="text-gray-600">Carregando solicitações...</p>
       </div>
            </div>
          ) : erro ? (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
              {erro}
            </div>
          ) : solicitacoes.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-xl border border-[#D9D9D9] shadow-sm overflow-visible"
            >
              <div className="p-6 border-b border-[#F4F4F4] flex justify-between items-center">
                <p className="text-gray-700">
                  Quantidade de solicitações:{" "}
                  <span className="font-semibold text-[#176073]">
                    {solicitacoes.length}
                  </span>
                </p>
              </div>

              <div className="overflow-visible">
                <table className="w-full relative">
                  <thead className="bg-[#F4F4F4] border-b border-[#D9D9D9]">
                    <tr>
                      <th className="px-6 py-4 text-left text-gray-600 font-medium text-sm">Protocolo</th>
                      <th className="px-6 py-4 text-left text-gray-600 font-medium text-sm">Solicitante</th>
                      <th className="px-6 py-4 text-left text-gray-600 font-medium text-sm">Status</th>
                      <th className="px-6 py-4 text-left text-gray-600 font-medium text-sm">Data</th>
                      <th className="px-6 py-4 text-left text-gray-600 font-medium text-sm">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {solicitacoes.map((item, index) => (
                      <motion.tr 
                        key={item.id}
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        transition={{ duration: 0.5, delay: 0.05 * index }} 
                        className="border-b border-[#F4F4F4] hover:bg-[#F4F4F4]/50 transition-colors"
                      >
                        <td className="px-6 py-4"><span className="text-[#222222] font-medium">{item.protocolo}</span></td>
                        <td className="px-6 py-4">
                          <p className="text-[#222222] font-medium">{item.nome}</p>
                          <p className="text-gray-500 text-sm">{item.email}</p>
                        </td>
                        <td className="px-6 py-4 text-left">
                          <span
                            className={`px-3 py-1 rounded-full text-white text-xs font-medium ${getStatusColor(
                              formatStatus(item.status)
                            )}`}
                          >
                            {formatStatus(item.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4"><span className="text-gray-600">{formatDate(item.dataSolicitacao)}</span></td>
                        <td className="px-6 py-4 overflow-visible">
                          <div className="flex items-center space-x-2 relative">
                            <Link to={`/user/detalhes_solicitacao/${item.id}`}>

                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4 mr-1" /> Ver
                              </Button>
                            </Link>

                            <MenuStatus item={item} handleUpdateStatus={handleUpdateStatus} />
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          ) : (
            <div className="bg-white rounded-xl border border-[#D9D9D9] p-10 text-center shadow-sm">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
     _   <p className="text-gray-600 text-lg">
        Nenhuma solicitação encontrada para esta data.
       </p>
            </div>
          )}

          <div className="mt-8 flex justify-center">
            <Link to="/gerente">
              <Button
                variant="outline"
                className="flex items-center gap-2 px-5 py-2 rounded-xl border-[#176073] text-[#176073] hover:bg-[#176073] hover:text-white transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
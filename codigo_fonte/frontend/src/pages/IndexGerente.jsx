import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Calendar, Eye, MoreHorizontal, FileText } from "lucide-react";
import { Link } from "react-router-dom";
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
  return new Date(dateString).toLocaleDateString("pt-BR", { timeZone: "UTC" });
};

function MenuStatus({ item, handleUpdateStatus }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

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
      <Button size="sm" variant="outline" onClick={() => setOpen((prev) => !prev)}>
        <MoreHorizontal className="h-4 w-4" />
      </Button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg border shadow-lg z-50 p-2 space-y-1">
          {["Pendente", "Em Andamento", "Concluída", "Descartada"].map((status) => (
            <button
              key={status}
              onClick={() => {
                handleUpdateStatus(item.id, status);
                setOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded text-sm ${
                formatStatus(item.status) === status
                  ? "bg-[#F4F4F4] text-[#222222]"
                  : "text-gray-600 hover:bg-[#F4F4F4] hover:text-[#222222]"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function IndexGerente() {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [contagem, setContagem] = useState({
    total: 0,
    pendente: 0,
    emAndamento: 0,
    concluida: 0,
    descartada: 0,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  const carregarContagem = async () => {
    try {
      const res = await Api.contagemSolicitacoes();
      setContagem(res);
    } catch (e) {
      console.error("Erro ao carregar contagem:", e);
    }
  };

  const carregarSolicitacoes = async () => {
    setIsLoading(true);
    try {
      const res = await Api.buscarSolicitacoes(1, 9999);
      setSolicitacoes(res.data ?? res);
    } catch (e) {
      console.error("Erro ao carregar solicitações:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    carregarSolicitacoes();
    carregarContagem();
  }, []);

  useEffect(() => {
    aplicarFiltros();
  }, [solicitacoes, searchTerm, statusFilter]);

  const aplicarFiltros = () => {
    let lista = [...solicitacoes];

    if (statusFilter !== "all") {
      lista = lista.filter((item) => formatStatus(item.status) === statusFilter);
    }

    if (searchTerm.trim() !== "") {
      const search = searchTerm.toLowerCase();
      lista = lista.filter(
        (item) =>
          item.protocolo.toLowerCase().includes(search) ||
          item.nome.toLowerCase().includes(search) ||
          item.email.toLowerCase().includes(search)
      );
    }

    setFilteredData(lista);
  };

  const handleUpdateStatus = async (solicitacaoId, novoStatus) => {
    try {
      const solicitacao = solicitacoes.find((s) => s.id === solicitacaoId);

      await Api.atualizarStatus(
        solicitacao.protocolo,
        novoStatus.toLowerCase().replace(" ", "_")
      );

      toast({ title: "Sucesso!", description: `Status atualizado para ${novoStatus}` });

      await carregarSolicitacoes();
      await carregarContagem();
    } catch (error) {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const { total, pendente, emAndamento, concluida, descartada } = contagem;

  return (
    <>
      <HeaderGerente />

      <div className="py-10 px-6 min-h-[calc(100vh-150px)] bg-[#F4F4F4]">
        <div className="max-w-5xl mx-auto">
          {/** topo */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h2 className="text-3xl font-bold text-[#222222] mb-2 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-[#176073]" />
              Todas as Solicitações
            </h2>
            <p className="text-gray-600 text-lg">
              Visualize todas as solicitações registradas.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6 text-center">
            <div className="p-4 rounded-xl shadow bg-white">
              <p className="text-3xl font-bold">{total}</p>
              <p className="text-gray-500">Total</p>
            </div>
            <div className="p-4 rounded-xl shadow bg-white">
              <p className="text-3xl font-bold text-blue-500">{pendente}</p>
              <p className="text-gray-500">Pendente</p>
            </div>
            <div className="p-4 rounded-xl shadow bg-white">
              <p className="text-3xl font-bold text-yellow-500">{emAndamento}</p>
              <p className="text-gray-500">Em Andamento</p>
            </div>
            <div className="p-4 rounded-xl shadow bg-white">
              <p className="text-3xl font-bold text-green-600">{concluida}</p>
              <p className="text-gray-500">Concluída</p>
            </div>
            <div className="p-4 rounded-xl shadow bg-white">
              <p className="text-3xl font-bold text-gray-600">{descartada}</p>
              <p className="text-gray-500">Descartada</p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="bg-white rounded-xl p-6 mb-8 border shadow-sm"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-4 pr-4 py-3 bg-white border rounded-xl"
                  placeholder="Buscar por protocolo, nome ou e-mail..."
                />
              </div>

              <div className="md:w-48">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full pl-4 pr-4 py-3 bg-white border rounded-xl"
                >
                  <option value="all">Todos os Status</option>
                  <option value="Pendente">Pendente</option>
                  <option value="Em Andamento">Em Andamento</option>
                  <option value="Concluída">Concluída</option>
                  <option value="Descartada">Descartada</option>
                </select>
              </div>
            </div>
          </motion.div>

          {isLoading ? (
            <div className="text-center py-20 text-gray-600">Carregando...</div>
          ) : filteredData.length === 0 ? (
            <div className="bg-white p-10 rounded-xl text-center shadow">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">Nenhuma solicitação encontrada.</p>
            </div>
          ) : (
            <motion.div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <table className="w-full">
                <thead className="bg-[#F4F4F4] border-b">
                  <tr>
                    <th className="px-6 py-4 text-left text-gray-600">Protocolo</th>
                    <th className="px-6 py-4 text-left text-gray-600">Solicitante</th>
                    <th className="px-6 py-4 text-left text-gray-600">Status</th>
                    <th className="px-6 py-4 text-left text-gray-600">Data</th>
                    <th className="px-6 py-4 text-left text-gray-600">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item, idx) => (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: idx * 0.03 }}
                      className="border-b hover:bg-[#F4F4F4]/60 transition"
                    >
                      <td className="px-6 py-4 font-medium">{item.protocolo}</td>
                      <td className="px-6 py-4">
                        <p className="font-medium">{item.nome}</p>
                        <p className="text-sm text-gray-500">{item.email}</p>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-white text-xs font-medium ${getStatusColor(
                            formatStatus(item.status)
                          )}`}
                        >
                          {formatStatus(item.status)}
                        </span>
                      </td>

                      <td classname="px-6 py-4 text-gray-600">
                        {formatDate(item.dataSolicitacao)}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Link to={`/user/detalhes_solicitacao/${item.id}`}>
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4 mr-1" /> Ver
                            </Button>
                          </Link>
                          <MenuStatus
                            item={item}
                            handleUpdateStatus={handleUpdateStatus}
                          />
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
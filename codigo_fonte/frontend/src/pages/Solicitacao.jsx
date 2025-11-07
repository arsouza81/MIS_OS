import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Api } from "../services/Api";
import { useToast } from "../components/ui/use-toast";
import { Toaster } from "../components/ui/toaster";

export default function Solicitacao() {
  const [protocolo, setProtocolo] = useState("");
  const [solicitacao, setSolicitacao] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!protocolo.trim()) {
      toast({
        title: "Campo obrigatório",
        description: "Por favor, digite um protocolo para buscar.",
        variant: "destructive",
      });
      setSolicitacao(null);
      return;
    }

    setSolicitacao(null);
    setIsSearching(true);

    try {
      const data = await Api.buscarSolicitacao(protocolo);
      setSolicitacao(data);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Erro na busca",
        description: "Nenhuma ordem de serviço encontrada.",
        className: "bg-red-600/90 text-white border-none",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pendente":
        return "bg-blue-500";
      case "em_andamento":
        return "bg-yellow-500";
      case "concluída":
        return "bg-green-600";
      case "descartada":
        return "bg-gray-600";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="bg-[#F4F4F4] min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 px-4 py-12 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-[#222222] mb-2">
            Consultar Solicitação
          </h1>
          <p className="text-gray-600 text-lg">
            Digite o protocolo da sua solicitação para verificar o status.
          </p>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-2xl p-8 border border-[#D9D9D9] shadow-sm w-full max-w-2xl"
        >
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                value={protocolo}
                onChange={(e) => setProtocolo(e.target.value)}
                placeholder="Digite o protocolo..."
                className="w-full pl-10 pr-4 py-3 border border-[#D9D9D9] rounded-xl text-[#222222] focus:ring-2 focus:ring-[#176073] focus:border-transparent outline-none transition-all duration-200"
              />
            </div>

            <button
              type="submit"
              disabled={isSearching}
              className="w-full bg-[#176073] text-white py-3 rounded-xl font-semibold hover:bg-[#1b7086] transition-all disabled:opacity-50"
            >
              {isSearching ? "Buscando..." : "Buscar"}
            </button>
          </form>

        </motion.section>

        {solicitacao && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-8 bg-white rounded-2xl p-8 border border-[#D9D9D9] shadow-sm w-full max-w-2xl"
          >
            {/* ... (conteúdo dos detalhes da solicitação) ... */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-[#222222]">
                Detalhes da Solicitação
              </h2>
              <span
                className={`px-4 py-2 rounded-full text-white text-sm font-medium ${getStatusColor(
                  solicitacao.status
                )}`}
              >
                {solicitacao.status}
              </span>
            </div>

            <ul className="space-y-3 text-gray-800">
              <li>
                <strong>Protocolo:</strong> {solicitacao.protocolo}
              </li>
              <li>
                <strong>Nome:</strong> {solicitacao.nome}
              </li>
              <li>
                <strong>Email:</strong> {solicitacao.email}
              </li>
              <li>
                <strong>Bloco:</strong> {solicitacao.bloco}
              </li>
              <li>
                <strong>Sala:</strong> {solicitacao.sala}
              </li>
              <li>
                <strong>Descrição:</strong> {solicitacao.descricaoProblema}
              </li>
              <li>
                <strong>Data da Solicitação:</strong>{" "}
                {new Date(solicitacao.data_Solicitacao).toLocaleString("pt-BR")}
              </li>
            </ul>
          </motion.div>
        )}
      </main>

      <Footer />
      <Toaster />
    </div>
  );
}
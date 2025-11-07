import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft, FileText } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { Api } from "../services/Api";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Solicitacoes() {
  const [NomesEIds, setNomesEIds] = useState([]);
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
        setNomesEIds(data.nomesEIds || []);
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

  return (
    <>
      <Header />
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
          ) : NomesEIds.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-xl border border-[#D9D9D9] shadow-sm overflow-hidden"
            >
              <div className="p-6 border-b border-[#F4F4F4] flex justify-between items-center">
                <p className="text-gray-700">
                  Quantidade de solicitações:{" "}
                  <span className="font-semibold text-[#176073]">
                    {NomesEIds.length}
                  </span>
                </p>
              </div>

              <ul className="divide-y divide-[#F4F4F4]">
                {NomesEIds.map((item, index) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.05 * index }}
                    className="p-6 hover:bg-[#F4F4F4]/40 transition-colors"
                  >
                    <Link
                      to={`/user/detalhes_solicitacao/${item.id}`}
                      className="block"
                    >
                      <p className="text-[#222222] font-medium text-lg">
                        Servidor: {item.nome}
                      </p>
                      <p className="text-gray-600 text-sm">
                        Data: {item.dataSolicitacao}
                      </p>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ) : (
            <div className="bg-white rounded-xl border border-[#D9D9D9] p-10 text-center shadow-sm">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">
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
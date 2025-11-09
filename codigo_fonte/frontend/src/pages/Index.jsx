import { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  User,
  Mail,
  Hash,
  Building,
  MapPin,
  FileText,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../assets/style.css";
import { Api } from "../services/Api";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

function Index() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    siape: "",
    bloco: "",
    sala: "",
    descricaoProblema: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const { toast } = useToast();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePreview = (e) => {
    e.preventDefault();
    let errors = [];

    if (!formData.nome.trim())
      errors.push("O formulário precisa de um nome de usuário.");
    if (!formData.email.trim())
      errors.push("O formulário precisa de um e-mail.");
    if (!formData.siape.trim())
      errors.push("O formulário precisa de um SIAPE.");
    if (!formData.bloco.trim())
      errors.push("O formulário precisa de um bloco.");
    if (!formData.sala.trim())
      errors.push("O formulário precisa de uma sala.");
    if (!formData.descricaoProblema.trim())
      errors.push("O formulário precisa de uma descrição para o problema.");

    if (errors.length > 0) {
      toast({
        title: "Formulário Incompleto",
        description: errors[0],
        variant: "destructive",
        className: "bg-red-600/90 text-white border-green-700",
      });
      return;
    }

    setShowPreview(true);
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await Api.enviarFormulario(formData);

      toast({
        title: "Sucesso!",
        description: "Formulário enviado com sucesso!",
        className: "bg-green-600/90 text-white border-green-700",
      });

      setFormData({
        nome: "",
        email: "",
        siape: "",
        bloco: "",
        sala: "",
        descricaoProblema: "",
      });
      setShowPreview(false);
    } catch (error) {
      toast({
        title: "Erro no Envio",
        description: error.message || "Erro de conexão com o servidor.",
        variant: "destructive",
        className: "bg-red-600/90 text-white border-green-700",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const inputFields = [
    {
      name: "nome",
      label: "Nome Completo",
      type: "text",
      icon: User,
      required: true,
      placeholder: "Digite seu nome completo",
    },
    {
      name: "email",
      label: "E-mail",
      type: "email",
      icon: Mail,
      required: true,
      placeholder: "Digite seu e-mail",
    },
    {
      name: "siape",
      label: "SIAPE",
      type: "number",
      icon: Hash,
      required: true,
      placeholder: "Digite seu SIAPE",
    },
    {
      name: "bloco",
      label: "Bloco",
      type: "text",
      icon: Building,
      required: true,
      placeholder: "Digite o bloco",
    },
    {
      name: "sala",
      label: "Sala",
      type: "number",
      icon: MapPin,
      required: true,
      placeholder: "Digite a sala",
    },
  ];

  return (
    <div className="bg-[#F4F4F4] min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-10 px-6 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-lg"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#222222] mb-2">
              Nova Ordem de Serviço
            </h1>
            <p className="text-gray-600">
              Preencha os dados abaixo para criar sua solicitação
            </p>
          </div>

          <form
            onSubmit={handlePreview}
            className="bg-white rounded-2xl p-8 border border-[#D9D9D9] shadow-sm space-y-5"
          >
            {inputFields.map((field, index) => {
              const Icon = field.icon;
              return (
                <motion.div
                  key={field.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label}{" "}
                    {field.required && <span className="text-red-500">*</span>}
                  </label>
                  <div className="relative">
                    <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      className="w-full pl-12 pr-4 py-3 bg-white border border-[#D9D9D9] rounded-xl text-[#222222] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#176073] focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </motion.div>
              );
            })}

            {/* Descrição */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descrição do Problema <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <textarea
                  name="descricaoProblema"
                  rows="4"
                  value={formData.descricaoProblema}
                  onChange={handleChange}
                  placeholder="Descreva o problema ou serviço solicitado"
                  className="w-full pl-12 pr-4 py-3 bg-white border border-[#D9D9D9] rounded-xl text-[#222222] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#176073] focus:border-transparent transition-all duration-200 resize-none"
                />
              </div>
            </motion.div>

            {/* Botão */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="pt-2"
            >
              <button
                type="submit"
                className="bg-[#176073] text-white w-full py-3 rounded-xl font-semibold shadow-md hover:bg-[#1b7086] transition-colors flex items-center justify-center"
              >
                <Send className="mr-2 h-5 w-5" />
                Enviar Solicitação
              </button>
            </motion.div>
          </form>
        </motion.div>
      </main>

      <Footer />

      {/* Modal de Confirmação */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Confirmar Envio da Ordem de Serviço
            </h2>

            <div className="text-gray-700 space-y-2 mb-4">
              <p>
                <strong>Nome:</strong> {formData.nome}
              </p>
              <p>
                <strong>E-mail:</strong> {formData.email}
              </p>
              <p>
                <strong>SIAPE:</strong> {formData.siape}
              </p>
              <p>
                <strong>Bloco:</strong> {formData.bloco}
              </p>
              <p>
                <strong>Sala:</strong> {formData.sala}
              </p>
              <p>
                <strong>Descrição:</strong> {formData.descricaoProblema}
              </p>
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => !isLoading && setShowPreview(false)}
                disabled={isLoading}
                className={`px-4 py-2 rounded-xl transition ${
                  isLoading
                    ? "bg-gray-300 text-gray-400 cursor-not-allowed"
                    : "bg-gray-300 text-gray-800 hover:bg-gray-400"
                }`}
              >
                Cancelar
              </button>

              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className={`px-4 py-2 rounded-xl font-medium transition flex items-center justify-center ${
                  isLoading
                    ? "bg-[#176073]/60 text-white cursor-not-allowed"
                    : "bg-[#176073] text-white hover:bg-[#1b7086]"
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Enviando...
                  </>
                ) : (
                  "Confirmar Envio"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <Toaster />
    </div>
  );
}

export default Index;
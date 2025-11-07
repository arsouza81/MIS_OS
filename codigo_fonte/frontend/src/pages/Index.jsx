import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Toast from "../components/Toast";
import "../assets/style.css";
import { Api } from "../services/Api";

function Index() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    siape: "",
    bloco: "",
    sala: "",
    descricaoProblema: "",
  });

  const [erro, setErro] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setSuccessMessage("");

    let errors = [];

    if (!formData.nome.trim()) errors.push("O formulário precisa de um nome de usuário.");
    if (!formData.email.trim()) errors.push("O formulário precisa de um e-mail.");
    if (!formData.siape.trim()) errors.push("O formulário precisa de um siape.");
    if (!formData.bloco.trim()) errors.push("O formulário precisa de um bloco.");
    if (!formData.sala.trim()) errors.push("O formulário precisa de uma sala.");
    if (!formData.descricaoProblema.trim()) errors.push("O formulário precisa de uma descrição para o problema.");

    if (errors.length > 0) {
      setErro(errors.join("\n"));
      return;
    }

    try {
      setIsLoading(true);
      await Api.enviarFormulario(formData);
      setSuccessMessage("Formulário enviado com sucesso!");
      setFormData({
        nome: "",
        email: "",
        siape: "",
        bloco: "",
        sala: "",
        descricaoProblema: "",
      });
    } catch (error) {
      setErro(error.message || "Erro de conexão com o servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#F4F4F4] min-h-screen flex flex-col">
      <Header />

      {erro && (
        <Toast type="error" message={erro} context="form" onClose={() => setErro("")} />
      )}
      {successMessage && (
        <Toast
          type="success"
          message={successMessage}
          context="form"
          onClose={() => setSuccessMessage("")}
        />
      )}

      <main className="flex-1 py-10 px-6 flex items-center justify-center">
        <div className="w-full max-w-lg">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#222222] mb-2">
              Nova Ordem de Serviço
            </h1>
            <p className="text-gray-600">
              Preencha os dados abaixo para criar sua solicitação
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl p-8 border border-[#D9D9D9] shadow-sm space-y-5"
          >
            {/* Nome */}
            <div>
              <label
                htmlFor="nome"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nome Completo
              </label>
              <input
                id="nome"
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Digite seu nome completo"
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-[#176073] outline-none placeholder-gray-400"
              />
            </div>

            {/* E-mail */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                E-mail
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Digite seu e-mail"
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-[#176073] outline-none placeholder-gray-400"
              />
            </div>

            {/* SIAPE */}
            <div>
              <label
                htmlFor="siape"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                SIAPE
              </label>
              <input
                id="siape"
                type="number"
                name="siape"
                value={formData.siape}
                onChange={handleChange}
                placeholder="Digite seu SIAPE"
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-[#176073] outline-none placeholder-gray-400"
              />
            </div>

            {/* Bloco */}
            <div>
              <label
                htmlFor="bloco"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Bloco
              </label>
              <input
                id="bloco"
                type="text"
                name="bloco"
                value={formData.bloco}
                onChange={handleChange}
                placeholder="Digite o bloco"
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-[#176073] outline-none placeholder-gray-400"
              />
            </div>

            {/* Sala */}
            <div>
              <label
                htmlFor="sala"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Sala
              </label>
              <input
                id="sala"
                type="number"
                name="sala"
                value={formData.sala}
                onChange={handleChange}
                placeholder="Digite a sala"
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-[#176073] outline-none placeholder-gray-400"
              />
            </div>

            {/* Descrição */}
            <div>
              <label
                htmlFor="descricaoProblema"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Descrição do Problema
              </label>
              <textarea
                id="descricaoProblema"
                name="descricaoProblema"
                rows="4"
                value={formData.descricaoProblema}
                onChange={handleChange}
                placeholder="Descreva detalhadamente o problema ou serviço solicitado"
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-[#176073] outline-none resize-none placeholder-gray-400"
              ></textarea>
            </div>

            {/* Botão */}
            <div className="pt-2">
              <button
                type="submit"
                className="bg-[#176073] text-white w-full py-2 rounded-xl font-semibold shadow-md hover:bg-[#1b7086] transition-colors"
              >
                Enviar Solicitação
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Index;

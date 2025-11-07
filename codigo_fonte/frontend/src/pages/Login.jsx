import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Toast from "../components/Toast";
import { Api } from "../services/Api";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [erro, setErro] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setSuccessMessage("");

    if (!formData.email.trim() || !formData.password.trim()) {
      setErro("Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      setIsLoading(true);
      const data = await Api.login(formData.email, formData.password);
      localStorage.setItem("token", data.token || true);
      setSuccessMessage("Login realizado com sucesso!");
      setTimeout(() => navigate("/gerente"), 1000);
    } catch (error) {
      setErro(error.message || "Erro de conexão com o servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#F4F4F4] min-h-screen flex flex-col">
      <Header showSearch={false} showRestricted={false} />

      {erro && <Toast type="error" message={erro} context="login" onClose={() => setErro("")} />}
      {successMessage && (
        <Toast
          type="success"
          message={successMessage}
          context="login"
          onClose={() => setSuccessMessage("")}
        />
      )}

      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold text-[#222222] mb-2">
              Área da Gerência
            </h1>
            <p className="text-gray-600">
              Faça login para acessar o painel administrativo
            </p>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-white rounded-2xl p-8 border border-[#D9D9D9] shadow-sm space-y-6"
          >
            {/* E-mail */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                E-mail <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Digite seu e-mail"
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-[#176073] outline-none placeholder-gray-400"
                required
              />
            </div>

            {/* Senha */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Senha <span className="text-red-500">*</span>
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Digite sua senha"
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-[#176073] outline-none placeholder-gray-400"
                required
              />
            </div>

            {/* Botões */}
            <div className="flex justify-between items-center pt-2">
              <a
                href="/"
                className="text-sm text-[#176073] hover:underline transition-colors"
              >
                Voltar
              </a>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={isLoading}
                className="bg-[#176073] text-white px-6 py-2 rounded-xl font-semibold shadow-md hover:bg-[#1b7086] transition-colors disabled:opacity-70"
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </motion.button>
            </div>
          </motion.form>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Login;
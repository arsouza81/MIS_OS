import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Api } from "../services/Api";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const toastDismissRef = useRef(null);

  useEffect(() => {
    return () => {
      if (toastDismissRef.current) {
        toastDismissRef.current();
      }
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.password.trim()) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos antes de continuar.",
        variant: "destructive",
        className: "bg-red-600/90 text-white border-green-700",
      });
      return;
    }

    try {
      setIsLoading(true);
      const data = await Api.login(formData.email, formData.password);

      localStorage.setItem("token", data.token || true);

      const { dismiss } = toast({
        title: "Login realizado!",
        description: "Redirecionando para o painel do gerente...",
        className: "bg-green-600/90 text-white border-green-700",
      });
      toastDismissRef.current = dismiss; 

      setTimeout(() => navigate("/gerente"), 1000);
    } catch (error) {
      toast({
        title: "Falha no login",
        description: error.message || "Erro de conexão com o servidor.",
        variant: "destructive",
        className: "bg-red-600/90 text-white border-green-700",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#F4F4F4] min-h-screen flex flex-col">
      <Header showSearch={false} showRestricted={false} />

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
            {/* Campo de E-mail */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                E-mail <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Digite seu e-mail"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-[#176073] focus:outline-none transition-all"
                  required
                />
              </div>
            </div>

            {/* Campo de Senha */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Senha <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Digite sua senha"
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-[#176073] focus:outline-none transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
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
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Entrando...
                  </div>
                ) : (
                  "Entrar"
                )}
              </motion.button>
            </div>
          </motion.form>
        </div>
      </main>

      <Footer />
      <Toaster />
    </div>
  );
}

export default Login;
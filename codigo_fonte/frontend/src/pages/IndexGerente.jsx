
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function IndexGerente({ erro }) {
  const [data, setData] = useState("");
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!data) {
      setMensagem("O formulário precisa de uma data.");
      return;
    }

    setMensagem("");

    navigate(`/user/selecionar_data?data_solicitacao=${data}`);
  };

  return (
    <div className="bg-[#F4F4F4] min-h-screen flex flex-col">
      <Header />

      {erro && (
        <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-md mx-auto mt-6 w-11/12 md:w-2/3 text-center">
          {erro}
        </div>
      )}

      {mensagem && (
        <div className="bg-yellow-100 border border-yellow-300 text-yellow-700 px-4 py-3 rounded-md mx-auto mt-6 w-11/12 md:w-2/3 text-center">
          {mensagem}
        </div>
      )}

      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl p-8 border border-[#D9D9D9] shadow-sm w-full max-w-lg text-center"
        >
          <h2 className="text-3xl font-bold text-[#222222] mb-2">
            Solicitações Registradas
          </h2>
          <p className="text-gray-600 mb-8">
            Selecione uma data para visualizar as solicitações cadastradas
          </p>

          <form onSubmit={handleSubmit} autoComplete="off" className="space-y-6">
            <div className="text-left">
              <label
                htmlFor="datepicker"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Selecione uma data <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="datepicker"
                name="data_solicitacao"
                required
                value={data}
                onChange={(e) => setData(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-2 text-gray-800 focus:ring-2 focus:ring-[#176073] focus:border-transparent outline-none transition-all"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full bg-[#176073] text-white py-3 rounded-xl font-semibold shadow-md hover:bg-[#1b7086] transition-colors"
            >
              Pesquisar
            </motion.button>
          </form>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}
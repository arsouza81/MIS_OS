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

    }catch(error) {
      setErro(error.message || "Erro de conexão com o servidor.");
    }
  };

  return (
    <div>
      <Header />
      {erro && (
        <Toast
          type="error"
          message={erro}
          context="form"
          onClose={() => setErro("")}
        />
      )}
      {successMessage && (
        <Toast
          type="success"
          message={successMessage}
          context="form" 
          onClose={() => setSuccessMessage("")}
        />
      )}

      <section className="menu">
        <h1>Ordem de Serviço</h1>
        <form className="form-servidor" onSubmit={handleSubmit}>
          <div className="div-form">
            <div className="left-column">
              <label htmlFor="nome">Nome:</label>
              <input id="nome" type="text" name="nome" value={formData.nome} onChange={handleChange} />

              <label htmlFor="email">Email:</label>
              <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} />

              <label htmlFor="siape">Siape:</label>
              <input id="siape" type="number" name="siape" value={formData.siape} onChange={handleChange} />

              <label htmlFor="bloco">Bloco:</label>
              <input id="bloco" type="text" name="bloco" value={formData.bloco} onChange={handleChange} />

              <label htmlFor="sala">Sala:</label>
              <input id="sala" type="number" name="sala" value={formData.sala} onChange={handleChange} />
            </div>

            <div className="right-column">
              <label htmlFor="descricao-problema">Descrição do Problema:</label>
              <textarea
                id="descricao-problema"
                name="descricaoProblema"
                value={formData.descricaoProblema}
                onChange={handleChange}
              />
              <button type="submit">Enviar</button>
            </div>
          </div>
        </form>
      </section>

      <Footer />
    </div>
  );
}

export default Index;
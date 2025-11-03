import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Toast from "../components/Toast";
import { Api } from "../services/Api";

function Login() {
  const navigate = useNavigate(); // React Router para navegação SPA
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [erro, setErro] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    try {
      const { email, password } = formData;
      const data = await Api.login(email,password);

      localStorage.setItem("token", data.token || true);
      navigate("/gerente");
    } catch (error){
      setErro(error.message || "Erro de conexão com o servidor.");
    }
  };

  return (
    <div>
      <Header showSearch={false} showRestricted={false} />
      {erro && <Toast message={erro} type="error" context="login" />}

      <section className="menu">
        <h1>Ordem de Serviço</h1>
        <form className="form-login" onSubmit={handleSubmit}>
          <h2>Gerência</h2>

          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Senha:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <div className="form-end">
            <br />
            <a href="/">voltar</a>
            <button type="submit">Entrar</button>
          </div>
        </form>
      </section>

      <Footer />
    </div>
  );
}

export default Login;
import { useState } from "react";
import Footer from "../components/Footer";
import HeaderGerente from "../components/HeaderGerente";

export default function IndexGerente({ erro }) {
  const [data, setData] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data) {
      alert("O formulário precisa de uma data.");
      return;
    }

    window.location.href = `/api/user/solicitacoes-por-data?data_solicitacao=${data}`;
  };

  return (
    <>
      <HeaderGerente />

      {erro && (
        <div className="alert alert-danger" style={{ marginTop: "15px" }}>
          {erro}
        </div>
      )}

      <section className="menu">
        <h2>Solicitações Registradas</h2>
        <br />
        <br />
        <form
          className="dateForm"
          id="dateForm"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <label htmlFor="datepicker">Selecione uma data:</label>
          <input
            type="date"
            id="datepicker"
            name="data_solicitacao"
            required
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
          <button type="submit" id="button-selecionar-data">
            Pesquisar
          </button>
        </form>
      </section>

      <Footer />
    </>
  );
}

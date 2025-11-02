const API_BASE = "http://localhost:5053";

//funções auxiliares
async function handleResponseWithJson(response) {
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Erro na requisição à API");
  return data;
}

async function handleResponseNoContent(response) {
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage || "Erro na requisição à API");
  }
}

//API principal
export const Api = {
  async login(email, password) {
    const res = await fetch(`${API_BASE}/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });
    return handleResponseWithJson(res);
  },

  async logout() {
    const res = await fetch(`${API_BASE}/user/logout`, {
      method: "POST",
      credentials: "include",
    });
    return handleResponseWithJson(res);
  },

  async enviarFormulario(dados) {
    const res = await fetch(`${API_BASE}/formServidor/formulario`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });
    return handleResponseWithJson(res);
  },

  async buscarSolicitacao(protocolo) {
    const res = await fetch(
      `${API_BASE}/FormServidor/buscar_protocolo?protocolo=${protocolo}`
    );
    return handleResponseWithJson(res);
  },

  async buscarDetalhesSolicitacao(id) {
    const res = await fetch(`${API_BASE}/user/api/detalhes_solicitacao/${id}`);
    return handleResponseWithJson(res);
  },

  async atualizarStatus(protocolo, novoStatus) {
    const res = await fetch(`${API_BASE}/atualizar_status`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ protocolo, novoStatus }),
    });
    return handleResponseNoContent(res);
  },

  async buscarSolicitacoesPorData(data_solicitacao) {
    const res = await fetch(
      `${API_BASE}/user/api/selecionar_data?data_solicitacao=${data_solicitacao}`
    );
    return handleResponseWithJson(res);
  },
};
const API_BASE = "http://localhost:5053/api";

//função auxiliar para respostas QUE RETORNAM JSON
async function handleResponseWithJson(response) {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Erro na requisição à API");
  }
  return data;
}

//função auxiliar para respostas QUE NÃO RETORNAM JSON (ex: 204 No Content)
async function handleResponseNoContent(response) {
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage || "Erro na requisição à API");
  }
  return;
}

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
      `${API_BASE}/FormServidor/buscar-protocolo?protocolo=${protocolo}`
    );
    return handleResponseWithJson(res);
  },

  async buscarDetalhesSolicitacao(id) {
    const res = await fetch(
      `${API_BASE}/user/solicitacao-detalhes/${id}`
    );
    return handleResponseWithJson(res);
  },

  async atualizarStatus(protocolo, novoStatus) {
    const res = await fetch(`${API_BASE}/user/atualizar-status`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ protocolo, novoStatus }),
    });
    return handleResponseWithJson(res);
  },

  async buscarSolicitacoesPorData(data_solicitacao) {
    const res = await fetch(
      `${API_BASE}/user/solicitacoes-por-data?data_solicitacao=${data_solicitacao}`
    );
    return handleResponseWithJson(res);
  },

  async buscarSolicitacoes(page = 1, pageSize = 20) {
    const res = await fetch(
      `${API_BASE}/user/solicitacoes?page=${page}&pageSize=${pageSize}`
    );
    return handleResponseWithJson(res);
  }
};
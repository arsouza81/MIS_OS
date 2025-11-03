
# Refatoração em Nível de Design – Facade

## Descrição da Refatoração

Em uma **refatoração em nível de design**, o foco está em **reorganizar a arquitetura e as relações entre componentes** sem mudar o comportamento externo para reduzir acoplamento, aumentar coesão e preparar o código para evoluções. Nesse contexto, aplicamos o padrão **Facade** que provê uma **interface única e simplificada** a um subsistema complexo. Em vez de cada página/componente React conversar diretamente com a API .NET via *fetch*, passamos a utilizar um **módulo central** (src/services/Api.js) que expõe operações de alto nível (como login, logout, buscarDetalhesSolicitacao, buscarSolicitacoesPorData). Esse Facade **encapsula rotas, headers, credenciais e tratamento de respostas/erros** resultando em menos duplicação, **desacoplamento da UI dos detalhes HTTP** e um fluxo mais consistente e testável em todo o frontend.

O comportamento funcional foi preservado, mas a arquitetura interna foi aprimorada: os componentes ficam focados em estado e navegação, enquanto `Api.js` concentra URL base, cabeçalhos, credenciais, serialização e parse de respostas (incluindo suporte explícito a respostas com e sem corpo). O resultado é um código mais limpo, coeso e preparado para evoluções.

## Justificativa Técnica

Antes, detalhes de infraestrutura (rotas, *headers*, *credentials*, *body*, *JSON parsing* e tratamento de erros) estavam espalhados por múltiplos componentes, gerando inconsistências e alto custo de manutenção. Aplicar o padrão **Facade**, aliado ao princípio de **Responsabilidade Única (SRP)** e ao **DRY**, elimina esse espalhamento: os componentes deixam de conhecer detalhes HTTP e passam a depender de uma API interna coerente.

A centralização também melhora testabilidade (mock em um único ponto), facilita a observabilidade (logs/telemetria em um lugar só), e habilita alterações transversais com mínimo impacto (por exemplo, mudança de URL base via variável de ambiente, inclusão de token de autenticação, ou tratamento uniforme para respostas `204 No Content`).

## **Evidências**
**Problema: Consumo de API espalhado nos componentes**
[Login.jsx (antes)](https://github.com/arsouza81/MIS_OS/blob/v3.0.0/codigo_fonte/frontend/src/pages/Login.jsx)

```
const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5053/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Salva token ou flag de autenticação
        localStorage.setItem("token", data.token || "true"); 
        // Navega para a rota protegida sem reload
        navigate("/gerente");
      } else {
        setErro(data.message || "Credenciais inválidas.");
      }
    } catch {
      setErro("Erro de conexão com o servidor.");
    }
  };
```

[Login.jsx (depois)](https://github.com/arsouza81/MIS_OS/blob/manutencao_de_refatoracao/codigo_fonte/frontend/src/pages/Login.jsx)

```
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
```

[Solicitacao.jsx (antes)](https://github.com/arsouza81/MIS_OS/blob/main/codigo_fonte/frontend/src/pages/Solicitacao.jsx)
```
const buscarSolicitacao = async () => {
    try {
      const res = await fetch(
        `http://localhost:5053/FormServidor/buscar_protocolo?protocolo=${protocolo}`
      );

      if (!res.ok) throw new Error("Protocolo não encontrado");

      const data = await res.json();
      setSolicitacao(data);
      setErro("");
    } catch (err) {
      console.error(err);
      setErro(err.message);
    }
  };
```
[Solicitacao.jsx (depois)](https://github.com/arsouza81/MIS_OS/blob/manutencao_de_refatoracao/codigo_fonte/frontend/src/pages/Solicitacao.jsx)
```
const buscarSolicitacao = async () => {
    setErro("");
    setSolicitacao(null);

    try {
      const data = await Api.buscarSolicitacao(protocolo);
      setSolicitacao(data);
    }catch(error) {
      console.error(error);
      setErro(error.message);
    }
  };
```

### DetalhesSolicitacao.jsx
- **Antes:** A página realizava a busca dos detalhes diretamente via `fetch`, lidando por conta própria com URL, parse e erros.  
  [DetalhesSolicitacao.jsx (antes)](https://github.com/arsouza81/MIS_OS/blob/v3.0.0/codigo_fonte/frontend/src/pages/DetalhesSolicitacao.jsx)
- **Depois:** A chamada foi substituída pelo método de alto nível do **Facade** (`Api.buscarDetalhesSolicitacao`), padronizando parse e tratamento de erro e removendo duplicação.  
  [DetalhesSolicitacao.jsx (depois)](https://github.com/arsouza81/MIS_OS/blob/manutencao_de_refatoracao/codigo_fonte/frontend/src/pages/DetalhesSolicitacao.jsx)

---

### Index.jsx
- **Antes:** Existiam chamadas diretas a endpoints espalhadas no componente.  
  [Index.jsx (antes)](https://github.com/arsouza81/MIS_OS/blob/v3.0.0/codigo_fonte/frontend/src/pages/Index.jsx)
- **Depois:** A lógica de comunicação foi delegada ao **Api** (ex.: `Api.logout()`), deixando o componente focado em fluxo de navegação/estado.  
  [Index.jsx (depois)](https://github.com/arsouza81/MIS_OS/blob/manutencao_de_refatoracao/codigo_fonte/frontend/src/pages/Index.jsx)

---

### Solicitacoes.jsx
- **Antes:** A página montava a URL com `searchParams` e fazia `fetch` direto para filtrar por data, repetindo parse/erros.  
  [Solicitacoes.jsx (antes)](https://github.com/arsouza81/MIS_OS/blob/v3.0.0/codigo_fonte/frontend/src/pages/Solicitacoes.jsx)
- **Depois:** O consumo foi centralizado em `Api.buscarSolicitacoesPorData`, simplificando o componente e garantindo respostas/erros padronizados.  
  [Solicitacoes.jsx (depois)](https://github.com/arsouza81/MIS_OS/blob/manutencao_de_refatoracao/codigo_fonte/frontend/src/pages/Solicitacoes.jsx)

---

### HeaderGerente.jsx
- **Antes:** O componente fazia a requisição de **logout** diretamente, repetindo configuração de método, credenciais e checagem de status.  
  [HeaderGerente.jsx (antes)](https://github.com/arsouza81/MIS_OS/blob/v3.0.0/codigo_fonte/frontend/src/components/HeaderGerente.jsx)
- **Depois:** O fluxo passou a utilizar `Api.logout`, removendo duplicação e aderindo ao tratamento de erro central.  
  [HeaderGerente.jsx (depois)](https://github.com/arsouza81/MIS_OS/blob/manutencao_de_refatoracao/codigo_fonte/frontend/src/components/HeaderGerente.jsx)

---

## **Api.js (centralização do consumo de API)**
[Api.js](https://github.com/arsouza81/MIS_OS/blob/manutencao_de_refatoracao/codigo_fonte/frontend/src/services/Api.js)
```
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
    return handleResponseNoContent(res);
  },

  async buscarSolicitacoesPorData(data_solicitacao) {
    const res = await fetch(
      `${API_BASE}/user/solicitacoes-por-data?data_solicitacao=${data_solicitacao}`
    );
    return handleResponseWithJson(res);
  },
};
```

---


## Api.js (Facade de Comunicação)

Arquivo: [`src/services/Api.js`](https://github.com/arsouza81/MIS_OS/blob/manutencao_de_refatoracao/codigo_fonte/frontend/src/services/Api.js).
O módulo consolida a URL base da API e padroniza o tratamento de respostas e erros por meio de helpers distintos para respostas com JSON e para respostas sem corpo (ex.: `204`). Ele expõe métodos de domínio (*login*, *logout*, *enviarFormulario*, *buscarSolicitacao*, *buscarDetalhesSolicitacao*, *atualizarStatus*, *buscarSolicitacoesPorData*) que encapsulam rotas, métodos HTTP, cabeçalhos, credenciais e serialização. Assim, os componentes deixam de lidar com detalhes HTTP e passam a usar uma interface consistente, favorecendo manutenção, testes e evolução.

## Conclusão

A refatoração em nível de **Design – Facade** no frontend eliminou duplicação de código e acoplamento excessivo, aumentou a coesão e padronizou a comunicação com o backend. O sistema permanece funcionalmente equivalente, porém com arquitetura mais clara, testável e escalável. Essa mudança estabelece uma base sólida para autenticação, observabilidade e outras melhorias transversais sem impacto na camada de UI.

## Classificação e Impacto Esperado

**Classificação:** Refatoração de Design – Facade – Frontend

* ✅ Redução de duplicação de código e inconsistências entre componentes;
* 🧠 Aumento da coesão e clareza arquitetural, com responsabilidades bem definidas;
* 🧪 Testabilidade ampliada (mock central) e menor risco de regressões;
* ⚙️ Base pronta para interceptadores, autenticação com tokens e logs centralizados.

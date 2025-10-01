# Changelog
Todas as mudanças notáveis deste projeto serão documentadas aqui.  
Formato: [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) • Versionamento: [SemVer](https://semver.org/lang/pt-BR/)

## [3.0.0] — 2025-10-01
> **Tipo:** Major — houve quebras de compatibilidade (rotas e contratos de API).  
> **Versão anterior:** v2.2.1

### 🎯 Destaques
- **Arquitetura separada**: backend (C#/.NET) → **API JSON**; frontend **React** responsável pela UI.  
- **Troca de stack** no frontend: **Handlebars → React**.  
- **LGPD**: remoção do **SIAPE** do frontend e do endpoint público de consulta por protocolo.  

---

## ✅ Resumo das 11 alterações entregues
1. **LGPD** – Removido o campo **SIAPE** das páginas **`DetalhesSolicitacao.jsx`** e **`Solicitacao.jsx`** (não é mais exibido no frontend).  
2. **API JSON** – Ajustados **`FormServidorController.cs`** e **`UserController.cs`** para retornarem **JSON**, eliminando dependência de templates HTML/Handlebars pelo frontend.  
3. **Gerência (data)** – **Migrada** página para **`IndexGerente.jsx`** em React (seleção de data para visualizar solicitações).  
4. **Detalhe (gerência)** – **Migrada** página para **`DetalhesSolicitacao.jsx`** (visualização/alteração de status).  
5. **Listagem (gerência)** – **Migrada** página para **`Solicitacoes.jsx`** (todas as solicitações do dia selecionado).  
6. **Estrutura do projeto** – Reorganizado para **backend** e **frontend** separados; criado **`.gitignore`**.  
7. **Detalhe (servidor)** – **Migrada** página para **`Solicitacao.jsx`** (detalhes da OS para o servidor).  
8. **Cadastro** – **Migrada** página de abertura de solicitação para **`Index.jsx`** (formulário).  
9. **Layout** – Criados componentes React **`Header`**, **`HeaderGerente`** e **`Footer`**.  
10. **Autenticação** – **Migrada** página de login para **`Login.jsx`** (perfil gerente) com redirecionamento para `/gerente`.  
11. **Backend sem views** – Removidas **views** e **arquivos estáticos** do backend; processamento passa a ser exclusivamente por **API JSON**.

---

## ⚠️ Breaking Changes (incompatibilidades)
- **Entrada/saída**: endpoints que aceitavam **`form-urlencoded`**/**`multipart`** e retornavam **HTML/redirect** agora aceitam **`application/json`** e retornam **JSON** com *status codes* apropriados.  
- **Autenticação**:
  - **POST `/User/login`** → retorna `200 { success: true }` ou `401 { success: false, message }` (**antes** havia redirect).  
  - **POST `/User/logout`** (**antes era GET**) → retorna `200 { success: true }`.  
- **Formulário**:
  - **POST `/FormServidor/formulario`** → agora recebe **JSON** e retorna `200 OK { message, protocolo }` (**antes** redirecionava).  
- **Consulta por protocolo**:
  - **GET `/FormServidor/buscar_protocolo?protocolo=...`** → agora responde **JSON** com `400/404` para erros (**antes** devolvia HTML com `alert()`); **SIAPE não é retornado**.

---

## ➕ Adicionado
- **Páginas React:** `IndexGerente.jsx`, `Solicitacoes.jsx`, `DetalhesSolicitacao.jsx`, `Solicitacao.jsx`, `Index.jsx`, `Login.jsx`.  
- **Componentes React:** `Header`, `HeaderGerente`, `Footer`.  
- **Endpoints JSON (consulta gerência):**
  - `GET /User/api/selecionar_data?data_solicitacao=yyyy-MM-dd` → `{ DiaSelecionado, NomesEIds[] }`
  - `GET /User/api/detalhes_solicitacao/{id}` → detalhes de uma solicitação (uso interno/gerência).

---

## 🔁 Alterado
- **Controllers** `FormServidorController.cs` e `UserController.cs` padronizados para **JSON**; validações passam a usar **códigos HTTP** (`400/401/404`).  
- **LGPD**: resposta de **`/FormServidor/buscar_protocolo`** filtra **SIAPE** (não expõe dado sensível no endpoint público).  
- **Organização de pastas** refletindo split FE/BE; `.gitignore` atualizado.

---

## 🗑️ Removido
- **Views Handlebars** e **ativos estáticos** do backend.  
- Exibição do **SIAPE** nas telas do frontend (`DetalhesSolicitacao.jsx` e `Solicitacao.jsx`).

---

## 🔒 Segurança & Privacidade (LGPD)
- **SIAPE** classificado como sensível: **não é exibido** no frontend nem retornado em endpoint público.

---

## 🧭 Guia de Migração
1. **Clientes/Frontend**
   - Enviar **JSON** em todos os *POSTs* (`Content-Type: application/json`).  
   - Tratar **status HTTP** e mensagens em JSON (substitui redirects/HTML).  
   - Atualizar rotas para SPA (ex.: `/login`, `/gerente`, `/gerente/solicitacoes/:id`, `/solicitacao/:id`).  
2. **Integrações internas**
   - Substituir *scraping* de HTML por consumo da **API JSON**.  
   - Adequar autenticação ao novo contrato de `login/logout`.  
3. **Infra**
   - Garantir **CORS** para o domínio do React.  
   - Publicar **frontend** (estático) e **backend** (API) separadamente.  
4. **LGPD**
   - Verificar DTOs e logs para não expor **SIAPE** indevidamente.

---

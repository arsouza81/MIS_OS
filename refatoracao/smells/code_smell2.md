## Code Smells Identificados

## Refatoração 3 - *Dead Code*

A refatoração de *remoção de código morto (Dead Code)* do UserController foi motivada pela identificação de code smells relacionados à presença de métodos, trechos e dependências *não utilizados, redundantes ou substituídos* por novas implementações.  

Esses smells foram classificados conforme os tipos descritos no capítulo *9.5 do livro Engenharia de Software Moderna, e a refatoração teve como objetivo **simplificar o código, **melhorar a legibilidade* e *reduzir riscos de inconsistência* entre versões antigas e atuais das rotas RESTful.

---

## 1. Código Morto (Dead Code)

O UserController continha métodos e trechos de código que já não eram mais utilizados pela aplicação, como antigos manipuladores de páginas Handlebars e endpoints duplicados.

*Consequência:*  
Presença de código sem uso efetivo aumentava a complexidade do projeto, o tempo de compilação e confundia a análise de manutenção. Além disso, métodos obsoletos poderiam gerar riscos de inconsistência entre rotas antigas e novas.

*Correção aplicada:*  
Foram removidos todos os métodos e dependências inativas, incluindo endpoints como SelecionarDataJson e DetalhesSolicitacaoJson, que foram substituídos por versões atualizadas (GetSolicitacoesPorData e GetSolicitacaoDetalhes).  
Essa limpeza deixou o controlador mais enxuto e alinhado às práticas RESTful.

---

## 2. Funcionalidade Duplicada (Duplicated Functionality)

Foram identificadas funções que realizavam operações idênticas ou semelhantes às novas versões em uso, coexistindo com endpoints atualizados que já desempenhavam o mesmo papel.

*Consequência:*  
A duplicação aumentava o risco de manutenção incorreta e dificultava a rastreabilidade das rotas em uso. Pequenas alterações poderiam gerar inconsistências entre versões diferentes do mesmo endpoint.

*Correção aplicada:*  
As versões antigas foram completamente removidas, mantendo apenas as rotas ativas e devidamente padronizadas no modelo *RESTful*. Dessa forma, garantiu-se que o sistema opere com apenas uma fonte de verdade para cada funcionalidade.

---

## 3. Dependências Obsoletas (Obsolete Dependencies)

O UserController ainda fazia referência a bibliotecas e métodos voltados ao uso de *Handlebars, que já não faziam parte da arquitetura atual baseada em respostas **JSON*.

*Consequência:*  
Essas dependências aumentavam o acoplamento do código e adicionavam complexidade desnecessária ao processo de compilação e carregamento da aplicação.

*Correção aplicada:*  
Todas as referências e trechos relacionados à renderização via Handlebars foram removidos, deixando o controlador responsável apenas por lidar com requisições *API REST* e retornos *JSON*.  

---

## 4. Complexidade Desnecessária (Unnecessary Complexity)

O acúmulo de trechos inativos e funções redundantes tornava o código mais extenso e menos intuitivo, dificultando o entendimento geral da estrutura e do fluxo de execução do controlador.

*Consequência:*  
Baixa legibilidade, maior esforço de manutenção e risco de erros durante modificações futuras.

*Correção aplicada:*  
Com a remoção de código morto, o UserController passou a conter apenas métodos realmente utilizados, reduzindo o tamanho e melhorando a clareza geral da classe.

---

### Resumo dos Benefícios
- Redução da complexidade e do tamanho do UserController;
- Maior clareza, legibilidade e manutenibilidade do código;
- Eliminação completa de dependências obsoletas e rotas inativas;
- Melhoria de desempenho e redução do tempo de compilação;
- Redução de riscos de inconsistência entre versões antigas e novas de rotas RESTful;
- Aderência às boas práticas de desenvolvimento e padrões REST.

---
---

## Refatoração 4 — *Extract Method*

A refatoração aplicada aos métodos `Login` (no `UserController`) e `PostFormulario` (no `FormServidorController`) teve como motivação a correção de *code smells* relacionados à **duplicação de código**, **baixa coesão** e **acúmulo de responsabilidades** nos controladores.  
Esses problemas foram identificados conforme os tipos descritos no capítulo 9.5 do livro *Engenharia de Software Moderna*.

---

#### 1. Método Longo (*Long Method*)
O método `Login` concentrava múltiplas operações: consulta ao banco de dados, verificação de credenciais, criação da lista de *claims*, construção da identidade e registro da autenticação no contexto HTTP.

**Consequência:**  
Código extenso e de difícil leitura, exigindo maior esforço cognitivo para compreender o fluxo e dificultando a escrita de testes unitários.

**Correção aplicada:**  
A lógica de autenticação foi **extraída** para o método dedicado `CreateClaimsPrincipal()` na classe `ClaimsHelper`, aplicando o padrão *Extract Method*.  
Isso reduziu o tamanho do método `Login`, tornando-o mais legível e direto ao propósito de autenticar usuários.

---

#### 2. Baixa Coesão (*Low Cohesion*)
O `UserController` executava tanto a responsabilidade de controle de requisições HTTP quanto a montagem da estrutura de autenticação, o que misturava camadas distintas da aplicação.

**Consequência:**  
Dificuldade de manutenção e de evolução do código, além de violação do Princípio da Responsabilidade Única (SRP).

**Correção aplicada:**  
A criação de *claims* e do `ClaimsPrincipal` foi movida para a classe `ClaimsHelper`, centralizando essa responsabilidade e mantendo o controlador apenas como orquestrador das requisições.

---

#### 3. Duplicação Potencial de Código (*Duplicated Code*)
A lógica de criação de *claims* poderia ser replicada em outros fluxos (como autenticação de administradores ou renovação de sessão).

**Consequência:**  
Risco de inconsistência e aumento do esforço de manutenção se fosse necessário atualizar a forma de autenticação em diferentes locais do código.

**Correção aplicada:**  
Com a refatoração, a criação de *claims* foi **centralizada** em um único método (`CreateClaimsPrincipal`), permitindo reutilização e padronização.

---

#### 4. Complexidade Desnecessária (*Unnecessary Complexity*)
O método `Login` apresentava complexidade excessiva por conter múltiplas etapas lógicas em um mesmo bloco de código.

**Consequência:**  
Baixa legibilidade, risco de erros ao modificar partes isoladas e dificuldade de expansão da autenticação (por exemplo, para adicionar novas permissões).

**Correção aplicada:**  
O uso do *Extract Method* simplificou o método original, reduzindo o número de responsabilidades diretas e melhorando a estrutura interna.

---

### Resumo dos Benefícios

- Redução da complexidade e tamanho do método `Login`;
- Maior clareza e legibilidade do fluxo de autenticação;
- Centralização da lógica de criação de *claims* em uma única classe reutilizável (`ClaimsHelper`);
- Melhoria na coesão e aderência ao SRP (Single Responsibility Principle);
- Facilitação da manutenção e testes unitários da lógica de autenticação.

---

### Referências

- Capítulo 9.5 — *Code Smells e Refatoração* do livro **Engenharia de Software Moderna** (Bruno P. de Almeida et al., 2021).  
- Fowler, Martin. *Refactoring: Improving the Design of Existing Code.* Addison-Wesley, 2018.

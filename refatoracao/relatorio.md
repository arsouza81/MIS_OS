# Relatório de Refatorações no Sistema Ordem de Serviço

## 1. Introdução
Este relatório apresenta as refatorações realizadas no Sistema de Ordem de Serviço, com o objetivo de melhorar a manutenibilidade, legibilidade e coesão do código, sem alterar o comportamento funcional da aplicação.


As refatorações foram guiadas pela identificação de *code smells* e aplicação de padrões de projeto e boas práticas de engenharia de software, conforme orientações em sala de aula da disciplina de Manutenção e Integração de Software, com base na referência de Martin Fowler no livro de Engenharia de Software Moderna.


Este relatório tem o objetivo de agrupar todas as informações e facilitar a navegação do leitor pelos pontos relevantes para aplicação das refatorações necessárias. Para acesso completo à descrições, documentações, bem como evidências na íntegra, o relatório possui links para as documentações completas de cada ponto apresentado a seguir.

A abordagem adotada foi estruturada neste relatório como:  
- Refatorações Aplicadas
  - Descrição da Refatoração
  - Justificativa Técnica
  - Code Smalls identificados
  - Evidências
---

## 2. Refatorações do Sistema Ordem de Serviço

### 2.1 Refatoração em nível de Código 1 — Extract Class  

Para viualizar a identificação dos pontos para efetuar essa refatoração, você pode acessar a issue documentada em : [Issue-#31- Extract Class](https://github.com/arsouza81/MIS_OS/issues/31)

#### 2.1.1 Descrição da Refatoração
Foram extraídas duas responsabilidades anteriormente presentes nos controladores `UserController` e `FormServidorController`.  
As funcionalidades de:
- Criação de `ClaimsPrincipal` (informações do usuário autenticado);
- Geração de protocolo único para solicitações;

foram movidas para classes auxiliares dedicadas:

- `Services/Helpers/ClaimsHelper.cs`
- `Services/Helpers/ProtocoloGenerator.cs`

Essa alteração aplica o padrão **Extract Class** e o **Princípio da Responsabilidade Única (SRP)**.

Para visualizar a descrição de pontos relevantes após aplicação dessa refatoração, você pode acessar a documentação em: [Refatoração em Nível de Código - Extract Class](https://github.com/arsouza81/MIS_OS/blob/manutencao_de_refatoracao/refatoracao/codigo/refatoracao1/refatoracao1.md)

#### 2.1.2 Justificativa Técnica
Antes da refatoração, os controladores acumulavam lógica de controle HTTP, autenticação e geração de identificadores.

| Controlador | Responsabilidades Antes |
|------------|------------------------|
| `UserController` | Controle de rotas + autenticação + montagem de claims |
| `FormServidorController` | Controle de rotas + geração de protocolo |

Esse acoplamento excessivo resultava em:
- Baixa coesão
- Dificuldade de manutenção
- Risco de duplicação de código
- Redução da testabilidade

Com a aplicação da extração, há benefícios como:
- Código mais modular
- Maior clareza arquitetural
- Melhor manutenção futura

#### 2.1.3 Code Smells Identificados

| Code Smell | Descrição | Solução Aplicada |
|-----------|-----------|-----------------|
| **Large Class** | Controladores com responsabilidades demais | Extração para `ClaimsHelper` e `ProtocoloGenerator` |
| **Long Method** | Métodos longos com lógica misturada | Redução após extração da lógica |
| **Duplicated Code** | Rotinas repetidas em diferentes pontos | Centralização em classes reutilizáveis |
| **Low Cohesion** | Mistura de controle HTTP e lógica de negócio | Reorganização seguindo SRP |

---
Para visualizar a descrição completa dos Code Smells identificados para essa refatoração ser aplicada, acesse a documentação completa em: [Code_smell 1- Refatoraões em nível de Código 1 e 2](https://github.com/arsouza81/MIS_OS/blob/manutencao_de_refatoracao/refatoracao/smells/code_smell1.md)


#### 2.1.4 Resumo das Evidências
<h3>Antes da Refatoração</h3>
<ul>
<li>A criação de <i>ClaimsPrincipal</i> ocorria diretamente dentro do <i>UserController</i>, junto com a lógica de autenticação e persistência, gerando acoplamento entre camadas de controle e segurança.</li>
<li>O <i>FormServidorController</i> continha a geração de protocolos de forma manual e repetitiva, sem abstração ou reutilização possível.</li>
<li>A ausência de abstrações dificultava a aplicação de testes unitários e a substituição de implementações.</li>
<li>Baixa coesão e alta dependência entre classes, comprometendo a clareza e a manutenibilidade do código.</li>
</ul>

<h3>Depois da Refatoração</h3>
<ul>
<li>Foram criadas as classes <i>ClaimsHelper</i> e <i>ProtocoloGenerator</i> no diretório <i>Services/Helpers</i>, cada uma com uma responsabilidade única.</li>
<li>O <i>UserController</i> passou a delegar a criação de <i>ClaimsPrincipal</i> para o <i>ClaimsHelper</i>, mantendo o foco apenas na lógica de requisição HTTP.</li>
<li>O <i>FormServidorController</i> agora solicita a geração de protocolo ao <i>ProtocoloGenerator</i>, removendo completamente essa lógica de seu escopo.</li>
<li>As classes podem ser injetadas via Dependency Injection, promovendo baixo acoplamento e alta testabilidade.</li>
<li>O código tornou-se mais legível, modular e reutilizável, permitindo evoluções futuras sem riscos de regressões indesejadas.</li>
</ul>

### 2.2 Refatoração em nível de Código 2 — Rename Method / Variable

Para viualizar a identificação dos pontos para efetuar essa refatoração, você pode acessar a issue documentada em : [Issue-#32- Rename Method / Variable](https://github.com/arsouza81/MIS_OS/issues/32)

#### 2.2.1 Descrição da Refatoração

A refatoração *Rename Method / Variable* foi aplicada nos controladores **UserController** e **FormServidorController** com o objetivo de padronizar nomes de métodos, parâmetros e rotas, alinhando-os às convenções do C# e às práticas RESTful.

Foram realizadas as seguintes ações:
- Padronização das rotas utilizando o formato `api/[controller]`, tornando as URLs mais previsíveis.
- Substituição de parâmetros em `snake_case` (ex.: `data_solicitacao`) para o padrão `camelCase` (ex.: `dataSolicitacao`).
- Renomeação de métodos e endpoints para que seus nomes representassem claramente a ação desempenhada, como `ObterDetalhesSolicitacao` e `SolicitacoesPorData`.
- Garantia de que a nomenclatura seguisse padrões consistentes em toda a API.

Essa refatoração **não alterou o comportamento funcional** das funcionalidades, apenas aprimorou a **organização, clareza e semântica** do código.


Para visualizar a descrição de pontos relevantes após aplicação dessa refatoração, você pode acessar a documentação em: [Refatoração em Nível de Código - Rename Method / Variable](https://github.com/arsouza81/MIS_OS/blob/manutencao_de_refatoracao/refatoracao/codigo/refatoracao2/refatoracao2.md)

---

#### 2.2.2 Justificativa Técnica
Durante a análise da base de código, foi identificado que havia inconsistência na nomeação de rotas, métodos e parâmetros, ocasionando:
- Dificuldade de manutenção
- Falta de clareza semântica
- Riscos de equívocos ao integrar o frontend com o backend

Esses problemas representam o *code smell* **Inconsistent Naming**, mencionado por Martin Fowler e reforçado pela literatura de Engenharia de Software. Ao aplicar o padrão *Rename Method / Variable*, o código passou a ser autoexplicativo, reduzindo necessidade de comentários e facilitando o entendimento dos fluxos.

Além disso, rotas que não seguiam convenção REST dificultavam a navegação e previsibilidade da API. A padronização para o formato `api/[controller]` tornou a estrutura mais alinhada ao estilo REST, reforçando a organização arquitetural.

---

#### 2.2.3 Code Smells Identificados

| Code Smell | Descrição | Impacto no Código |
|---|---|---|
| **Inconsistent Naming** | Mistura de diferentes convenções (snake_case e camelCase) | Dificultava leitura e manutenção |
| **Rotas pouco descritivas** | Endpoints não transmitiam claramente sua função | Prejudicava integração com o frontend |
| **Desalinhamento REST** | Estrutura de rotas não orientada a recursos | API menos padronizada e menos intuitiva |


Para visualizar a descrição completa dos Code Smells identificados para essa refatoração ser aplicada, acesse a documentação completa em: [Code_smell 1- Refatoraões em nível de Código 1 e 2](https://github.com/arsouza81/MIS_OS/blob/manutencao_de_refatoracao/refatoracao/smells/code_smell1.md)

---

#### 2.2.4 Resumo das Evidências (Antes e Depois)

**Antes da Refatoração**
- Rotas utilizavam padrões inconsistentes, como `detalhes_solicitacao/{id}`.
- Parâmetros usavam `snake_case` sem seguir convenção da linguagem.
- Métodos possuíam nomes genéricos que não expressavam claramente suas responsabilidades.

**Depois da Refatoração**
- Rotas foram padronizadas para formatos mais claros, como `solicitacao-detalhes/{id}`.
- Parâmetros passaram a utilizar `camelCase`, tornando o código coerente com convenções C#.
- Nomes de métodos foram renomeados para refletirem com precisão a operação realizada.

**Resultados Obtidos**
- URLs se tornaram **mais limpas** e **previsíveis**, facilitando navegação e integração.
- Código ficou **mais legível**, eliminando ambiguidades e necessidade de comentários explicativos.
- A API agora segue práticas recomendadas em desenvolvimento C# e REST.

---

#### 2.2.5 Conclusão
A refatoração *Rename Method / Variable* trouxe aprimoramentos significativos na **clareza**, **padronização** e **coerência semântica** do código, sem afetar o funcionamento da aplicação. A padronização de nomes e rotas fortaleceu a comunicação entre backend e frontend, preparando o sistema para evoluções futuras de forma sustentável.

---

### 2.3 Refatoração em nível de Código 3 — Dead Code Removal


Para viualizar a identificação dos pontos para efetuar essa refatoração, você pode acessar a issue documentada em : [Issue-#33- Dead Code](https://github.com/arsouza81/MIS_OS/issues/33)


#### 2.3.1 Descrição da Refatoração

A refatoração *Dead Code Removal* foi aplicada no **UserController** com o objetivo de eliminar métodos, trechos e dependências não utilizados ou redundantes, mantendo apenas o código efetivamente necessário para o funcionamento da aplicação.

As principais ações realizadas foram:
- Remoção de métodos antigos que renderizavam páginas com Handlebars, substituídos por rotas RESTful que retornam JSON.
- Eliminação de duplicações, como `SelecionarDataJson` e `DetalhesSolicitacaoJson`, que coexistiam com versões atualizadas (`GetSolicitacoesPorData`, `GetSolicitacaoDetalhes`).
- Padronização do controlador para conter apenas rotas válidas e ativas.
- Remoção de dependências obsoletas relacionadas a bibliotecas legadas.

Para visualizar a descrição de pontos relevantes após aplicação dessa refatoração, você pode acessar a documentação em: [Refatoração em Nível de Código - Dead Code](https://github.com/arsouza81/MIS_OS/tree/manutencao_de_refatoracao/refatoracao/codigo/refatoracao3)

---

#### 2.3.2 Justificativa Técnica
Durante a análise do código, foram identificados diversos trechos inativos e redundantes, caracterizando o *code smell* **Dead Code**. Esses elementos aumentavam a complexidade, reduziam o desempenho e introduziam risco de inconsistência entre rotas antigas e novas.

Ao remover o código morto:
- Reduz-se a base de código desnecessária.
- Facilita-se a manutenção e evolução do sistema.
- Melhora-se o tempo de compilação e carregamento da aplicação.
- Elimina-se ambiguidade entre métodos antigos e atualizados.

---

#### 2.3.3 Code Smells Identificados

| Code Smell | Descrição | Impacto no Código |
|---|---|---|
| **Dead Code** | Métodos e variáveis não mais utilizados ou acessados | Aumenta desnecessariamente a base de código e a complexidade |
| **Duplicated Functionality** | Funções antigas coexistindo com versões atualizadas | Gera ambiguidade e risco de manutenção incorreta |
| **Obsolete Dependencies** | Referências a bibliotecas e recursos legados (ex.: Handlebars) | Reduz desempenho e aumenta acoplamento |
| **Unnecessary Complexity** | Acúmulo de trechos inativos e redundantes | Diminui legibilidade e dificulta compreensão do fluxo de execução |


Para visualizar a descrição completa dos Code Smells identificados para essa refatoração ser aplicada, acesse a documentação completa em: [Code_smell 1- Refatoraões em nível de Código 3 e 4](https://github.com/arsouza81/MIS_OS/blob/manutencao_de_refatoracao/refatoracao/smells/code_smell2.md)

---

#### 2.3.4 Resumo das Evidências (Antes e Depois)

**Antes da Refatoração**
- Métodos antigos como `SelecionarDataJson` e `DetalhesSolicitacaoJson` coexistiam com novas rotas RESTful.
- Trechos de código não utilizados e dependências de Handlebars permaneciam no controlador.
- Código extenso, redundante e pouco intuitivo.

**Depois da Refatoração**
- Apenas rotas RESTful ativas foram mantidas, como `GetSolicitacoesPorData` e `GetSolicitacaoDetalhes`.
- Todo código morto e dependências obsoletas foram removidos.
- Controlador passou a ser mais enxuto, legível e alinhado às boas práticas.

**Resultados Obtidos**
- Redução significativa da complexidade e tamanho do controlador.
- Maior clareza e manutenibilidade do código.
- Melhoria de desempenho e tempo de compilação.
- Eliminação de riscos de inconsistência entre versões antigas e novas das rotas.
- Conformidade com padrões RESTful e práticas de desenvolvimento backend modernas.

---

#### 2.3.5 Conclusão
A refatoração *Dead Code Removal* deixou o **UserController** mais leve, limpo e eficiente, eliminando métodos redundantes e implementações descontinuadas. A manutenção e evolução futura da API REST ficaram mais simples e seguras, garantindo uma base estável e sustentável.


### 2.4 Refatoração em nível de Código 4 — Extract Method

Para viualizar a identificação dos pontos para efetuar essa refatoração, você pode acessar a issue documentada em : [Issue-#34- Extract Method](https://github.com/arsouza81/MIS_OS/issues/34)


#### 2.4.1 Descrição da Refatoração

A refatoração *Extract Method* foi aplicada nos métodos **Login** do *UserController* e **PostFormulario** do *FormServidorController*, com o objetivo de centralizar lógicas previamente extraídas para classes auxiliares:

- `ClaimsHelper` (método `CreateClaimsPrincipal`) para autenticação de usuários.
- `ProtocoloGenerator` (método `GenerateUniqueProtocol`) para geração de protocolos únicos.

Com isso, os controladores passaram a **delegar responsabilidades específicas** às classes auxiliares, reduzindo duplicação de código e aumentando a coesão. Os controladores agora apenas orquestram requisições HTTP, enquanto a lógica de negócio reside em métodos reutilizáveis.

Principais ações:
- Substituição de blocos manuais de autenticação e geração de protocolo por chamadas aos helpers.
- Redução da duplicação e simplificação da manutenção.
- Aplicação do **Princípio da Responsabilidade Única (SRP)** em todas as camadas envolvidas.


Para visualizar a descrição de pontos relevantes após aplicação dessa refatoração, você pode acessar a documentação em: [Refatoração em Nível de Código - Extract Method](https://github.com/arsouza81/MIS_OS/blob/manutencao_de_refatoracao/refatoracao/codigo/refatoracao4/refatoracao4.md)

---

#### 2.4.2 Justificativa Técnica
Antes da refatoração, os métodos Login e PostFormulario apresentavam:

- **Código longo e complexo**, com múltiplas responsabilidades.
- **Duplicação de lógica**, implementando autenticação e geração de protocolos diretamente nos controladores.
- **Baixa coesão**, misturando controle de requisição HTTP com regras de negócio.

Ao aplicar a refatoração:
- Centralizou-se a criação de `ClaimsPrincipal` no `ClaimsHelper`.
- Centralizou-se a geração de protocolo no `ProtocoloGenerator`.
- Reduziu-se a duplicação de código e aumentou a coesão entre camadas.
- Facilitou-se a manutenção, testes unitários e futuras evoluções do sistema.

---

#### 2.4.3 Code Smells Identificados

| Code Smell | Descrição | Impacto no Código |
|---|---|---|
| **Long Method** | Métodos longos com múltiplas responsabilidades (Login, PostFormulario) | Dificuldade de leitura, manutenção e testes unitários |
| **Low Cohesion** | Controladores misturavam controle HTTP e lógica de autenticação/protocolo | Violação do SRP e maior complexidade |
| **Duplicated Code** | Lógica de autenticação e geração de protocolos potencialmente replicável | Risco de inconsistência e maior esforço de manutenção |
| **Unnecessary Complexity** | Múltiplas etapas lógicas em um mesmo método | Reduz legibilidade e aumenta chances de erro |


Para visualizar a descrição completa dos Code Smells identificados para essa refatoração ser aplicada, acesse a documentação completa em: [Code_smell 1- Refatoraões em nível de Código 3 e 4](https://github.com/arsouza81/MIS_OS/blob/manutencao_de_refatoracao/refatoracao/smells/code_smell2.md)

---

#### 2.4.4 Resumo das Evidências (Antes e Depois)

**Antes da Refatoração**
- Métodos Login e PostFormulario continham lógicas completas de autenticação e geração de protocolo.
- Código extenso, difícil de ler e com duplicação potencial.
- Baixa coesão e mistura de responsabilidades.

**Depois da Refatoração**
- Uso de métodos `CreateClaimsPrincipal` e `GenerateUniqueProtocol` nos controladores.
- Redução significativa do tamanho dos métodos originais.
- Maior clareza, coesão e modularidade.
- Código agora segue padrões de responsabilidade única e reutilização.

**Resultados Obtidos**
- Diminuição da complexidade e tamanho dos métodos nos controladores.
- Lógica de autenticação e geração de protocolo centralizada em classes auxiliares.
- Aumento da clareza e legibilidade do fluxo de autenticação e do processamento de formulários.
- Facilitação de manutenção e testes unitários.
- Preparação do sistema para futuras extensões sem impactar outros controladores.

---

#### 2.4.5 Conclusão
A refatoração *Extract Method* consolidou o uso dos métodos previamente extraídos (`ClaimsHelper` e `ProtocoloGenerator`), promovendo **reutilização de código, modularidade e coesão**. O comportamento externo do sistema permaneceu inalterado, mas a estrutura interna se tornou mais limpa, organizada e aderente às boas práticas de arquitetura limpa e princípios SOLID.





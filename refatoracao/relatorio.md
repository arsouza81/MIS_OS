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

### 2.2 Refatoração em nível de Código 1 — Rename Method / Variable

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








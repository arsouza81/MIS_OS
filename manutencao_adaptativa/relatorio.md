<h1 align=center> Universidade Federal do Amazonas<br>
Instituto de Ciências Exatas e Tecnologia</h1>

<h3 align=right>Engenharia de Software</h3>
<p align=right>
Alicia Caldeira Da Silva <br>
Anderson Rodrigues De Souza <br>
Diandre Pires Bruce <br>
Kássia Ramos Oliveira <br>
Rennan De Souza Alves
</p>


---

<h3 align=center>RELATÓRIO FINAL<br>Manutenção Adaptativa</h3>


---

## 1. Descrição do Sistema

### 1.1 Propósito e Funcionalidades

<p align=justify>
O Instituto de Ciências Exatas e Tecnologia (ICET), em Itacoatiara, possui uma ampla infraestrutura acadêmica e tecnológica, atendendo milhares de alunos e servidores. Apesar desse porte, o setor de Tecnologia da Informação enfrenta dificuldades no gerenciamento de operações de suporte, devido à ausência de um sistema centralizado para registro e acompanhamento de atendimentos, o que compromete a organização e a eficiência da Gerência de TI (GTI).
</p>

<p align=justify>
Para resolver esse problema, foi desenvolvido o sistema <b>Ordem de Serviço (OS)</b>, uma aplicação voltada para a gestão das demandas de TI do instituto. O sistema tem como objetivo principal organizar, registrar e canalizar as vantagens de serviços, permitindo que os chamados sejam acompanhados em tempo real e direcionados corretamente aos responsáveis, oferecendo maior agilidade no processo de suporte técnico.
</p>

<p align=justify>
Entre suas principais funcionalidades, destacam-se: o cadastro de operadoras de serviços pelos servidores, a emissão de protocolos de envio, o envio automático de notificações por e-mail, consultas de andamento e histórico, além do acesso restrito à Gerência de TI, que pode consultar e alterar o status das transações.
</p>

---

### 1.2 Arquitetura Resumida

<p align=justify>
Para facilitar a leitura e entendimento, o sistema será apresentado por meio de um Diagrama de Classes, que apresenta uma representação visual das classes que compõem o sistema, bem como suas relações e interações entre si.
</p>

<img src="https://raw.githubusercontent.com/arsouza81/MIS_OS/refs/heads/main/images/Diagrama%20de%20classe.jpg" alt="Diagrama de Classe">


<p><i>Imagem 01: Diagrama de Classes do OS</i></p>

---

## 2. Identificação e Classificação das Atualizações do Sistema

<p align=justify>A seguir, são listadas as **11 issues classificadas como Manutenção Adaptativa**, com suas descrições, resultados obtidos, resultados esperados, classificação e status.</p>

---

### Atualização do Sistema 01 – Organização do Projeto - Arquitetura desacoplada
- **Descrição:** Organizar a estrutura do projeto, separando backend e frontend, e criar arquivo `.gitignore` para ignorar arquivos desnecessários do repositório.
- **Resultado Obtido:** O projeto atualmente está todo em uma única pasta sem separação entre frontend e backend, e sem `.gitignore`.
- **Resultado Esperado:** - Criar pasta backend para a API e arquivos do servidor.
- Criar pasta frontend para o React ou interface do usuário.
- Criar arquivo `.gitignore` para ignorar arquivos temporários, logs, `node_modules`, etc.
- Estrutura organizada que facilita desenvolvimento e manutenção futura.
- **Classificação:** Infraestrutura / Configuração / Chore
- **Status:** Concluída  
- **Link da Issue:** https://github.com/arsouza81/MIS_OS/issues/12 

---

### Atualização do Sistema 02 – Criar página Solicitacao.jsx
- **Descrição:** Migrar a página de detalhes da solicitação do Handlebars para React (`Solicitacao.jsx`). A página exibe detalhes da ordem de serviço para o servidor.
- **Resultado Obtido:** Página Handlebars ainda em uso. Dados renderizados no backend, consumindo HTML.
- **Resultado Esperado:** - Página completamente em React (Solicitacao.jsx).
- Consumo da API via fetch/axios retornando JSON.
- Renderização dos campos: Protocolo, Nome, Email, Bloco, Sala, Descrição do Problema, Data da Solicitação e Status.
Botão “Voltar” funcionando via useNavigate.
- Layout similar ao atual (Header, Footer, seção de menu).
- **Classificação:** Migração de API Externa - Frontend / Migração / Chore
- **Status:** Concluída  
- **Link da Issue:**  https://github.com/arsouza81/MIS_OS/issues/13"  

---

### Atualização do Sistema 03 – Criar página Index.jsx
- **Descrição:** Migrar a página de cadastro de solicitação do Handlebars para React (Index.jsx). A página permite que o usuário (servidor) preencha o formulário de ordem de serviço.
- **Resultado Obtido:** Página Handlebars ainda em uso. Dados do formulário renderizados e validados no backend.
- **Resultado Esperado:** - Página completamente em React (Index.jsx).
- Consumo da API via fetch/axios retornando JSON.
- Campos do formulário: Nome, Email, Siape, Bloco, Sala, Descrição do Problema.
- Validação no frontend com feedback de erro ou sucesso.
- Layout similar ao atual (Header, Footer, seção de menu).
- **Classificação:** Migração de API Externa - Frontend / Migração / Chore
- **Status:** Concluída  
- **Link da Issue:** https://github.com/arsouza81/MIS_OS/issues/14 

---

### Atualização do Sistema 04 – Criar página Login.jsx
- **Descrição:** Migrar a página de login do Handlebars para React (`Login.jsx`). A página permite que o usuário (gerente) faça login e seja redirecionado para a área protegida (`/gerente`).
- **Resultado Obtido:** Página Handlebars ainda em uso. Login realizado via backend, com recarregamento da página.
- **Resultado Esperado:** - Página completamente em React (Login.jsx).
- Consumo da API via fetch/axios retornando JSON.
- Feedback de erro visível ao usuário.
- Navegação SPA para a rota protegida (/gerente) sem reload.
- Layout similar ao atual (Header, Footer, seção de menu).
- **Classificação:** Migração de API Externa - Frontend / Migração / Chore
- **Status:** Concluída  
- **Link da Issue:** https://github.com/arsouza81/MIS_OS/issues/15

---

### Atualização do Sistema 05 – Criar página IndexGerente.jsx
- **Descrição:** Migrar a página de gerenciamento do Handlebars para React (IndexGerente.jsx). Esta página permite que o gerente selecione uma data para visualizar as solicitações registradas.
- **Resultado Obtido:** Página Handlebars ainda em uso. Navegação tradicional via backend, com reload da página.
- **Resultado Esperado:** - Página completamente em React (`IndexGerente.jsx`).
- Consumo de input do usuário via estado React (`useState`).
- Layout com HeaderGerente, Footer e seção de menu.
- **Classificação:** Simulação de Mudança de Dependência - Frontend / Migração / Chore
- **Status:** Concluída  
- **Link da Issue:** https://github.com/arsouza81/MIS_OS/issues/16

---

### Atualização do Sistema 06 – Criar página Solicitacoes.jsx
- **Descrição:** Migrar a página de listagem de solicitações do Handlebars para React (Solicitacoes.jsx). Esta página exibe todas as solicitações registradas em uma data selecionada pelo gerente.
- **Resultado Obtido:** Página Handlebars ainda em uso. Navegação tradicional via backend.
- **Resultado Esperado:** - Página completamente em React (`Solicitacoes.jsx`).
- Renderização da lista de solicitações usando estado React (`useState`) e efeito (`useEffect`).
- SPA com navegação para detalhes das solicitações.
- Layout com HeaderGerente, Footer e seção de menu.
- **Classificação:** Simulação de Mudança de Dependência - Frontend / Migração / Chore
- **Status:** Concluída  
- **Link da Issue:** https://github.com/arsouza81/MIS_OS/issues/17

---

### Atualização do Sistema 07 – Criar página DetalhesSolicitacao.jsx
- **Descrição:** Migrar a página de detalhes da solicitação do Handlebars para React (DetalhesSolicitacao.jsx). Esta página permite ao gerente visualizar detalhes de uma solicitação específica e alterar o status.
- **Resultado Obtido:** Página Handlebars ainda em uso. Navegação tradicional via backend.
- **Resultado Esperado:** - Página completamente em React (DetalhesSolicitacao.jsx). - Renderização dos detalhes da solicitação usando estado React (useState) e efeito (useEffect). - Possibilidade de atualizar o status diretamente na interface com SPA.
- Funcionalidade de logout implementada no HeaderGerente.
- Navegação SPA usando React Router.
- **Classificação:** Simulação de Mudança de Dependência - Frontend / Migração / Chore
- **Status:** Concluída  
- **Link da Issue:** https://github.com/arsouza81/MIS_OS/issues/18

---

### Atualização do Sistema 08 – Criar componentes Footer, Header e HeaderGerente
- **Descrição:** Criar os componentes React para o layout do sistema: Footer, Header e HeaderGerente. Esses componentes substituirão os templates Handlebars correspondentes.
- **Resultado Obtido:** Layout dependente de Handlebars.
- **Resultado Esperado:** - Componentes React (`Footer.jsx`, `Header.jsx`, `HeaderGerente.jsx`) funcionais, reutilizáveis em todas as páginas.
- Funcionalidade de logout implementada no HeaderGerente.
- Navegação SPA usando React Router.
- **Classificação:** Simulação de Mudança de Dependência - Frontend / Componente / Chore 
- **Status:** Concluída  
- **Link da Issue:** https://github.com/arsouza81/MIS_OS/issues/19

---

### Atualização do Sistema 09 – Remover SIAPE de visualização
- **Descrição:** Remover o campo SIAPE das páginas de consulta de solicitações (DetalhesSolicitacao.jsx e Solicitacao.jsx) para adequação à LGPD. O SIAPE é dado sensível e não deve ser exibido no frontend.
- **Resultado Obtido:** O campo SIAPE está presente, expondo dado sensível, tanto na consulta da Ordem de Serviço (OS) pelo servidor quanto na visualização da OS pelo Gerente de TI.
- **Resultado Esperado:** - O campo SIAPE não deve mais ser exibido tanto na consulta da OS pelo servidor quanto na visualização da OS pelo Gerente de TI;
- Todas as demais informações da OS continuam visíveis nas consultas.
- **Classificação:** Cenário de Mudança de Regulamentação - LGPD / Privacidade / Frontend  
- **Status:** Concluída  
- **Link da Issue:** https://github.com/arsouza81/MIS_OS/issues/20

---

### Atualização do Sistema 10 – Alterar controladores para retornar JSON ao frontend
- **Descrição:** Atualizar os controladores `FormServidorController.cs` e `UserController.cs` para que retornem respostas em formato JSON, permitindo que o frontend em React consuma os dados diretamente, sem depender de templates HTML/Handlebars.
- **Resultado Obtido:** As rotas dos controladores retornam JSON estruturado diretamente, pronto para ser consumido pelo React.
- **Resultado Esperado:** O frontend React recebe os dados em JSON, sem necessidade de depender de templates server-side. Todas as consultas de Solicitação e Usuário retornam no formato esperado.
- **Classificação:** Migração de API Externa – Ajuste de controladores para retornar dados em JSON, visando integração direta com frontend React.  
- **Status:** Concluída  
- **Link da Issue:** https://github.com/arsouza81/MIS_OS/issues/21  

---

### Atualização do Sistema 11 – Remover views, arquivos staticos do backend
- **Descrição:** Remover todas as views e arquivos estáticos presentes no backend, deixando-o exclusivamente como API que retorna dados em formato JSON. O frontend em React será responsável pela renderização da interface e consumo desses dados.
- **Resultado Obtido:** O projeto backend ainda contém as pastas Views e wwwroot, misturando responsabilidades de API com a de renderização de interface (server-side rendering).
- **Resultado Esperado:** - Eliminar completamente as pastas Views e wwwroot do projeto backend.
- Garantir que todas as rotas do backend retornem apenas JSON ou respostas de API (como códigos de status HTTP).
- Reduzir o acoplamento entre frontend e backend, tornando o backend agnóstico em relação à interface visual.  
- **Classificação:** Infraestrutura / Refatoração / Backend  
- **Status:** Concluída  
- **Link da Issue:** https://github.com/arsouza81/MIS_OS/issues/27 

---

## 3. Atualizações

<p align=justify>Para cada uma das atualizações listadas, foi aberta uma <i>Issue</i> no repositório remoto do projeto e posteriormente um <i>Pull Request</i>. Cada atualização foi implementada em uma branch separada, contendo responsável, prioridade e link do PR correspondente.</p>

### Atualização 01 – Organização do Projeto - Arquitetura desacoplada
- **Responsável pela correção:** Alicia Caldeira 
- **Prioridade:** Alta  
- **Link:** https://github.com/arsouza81/MIS_OS/issues/12

### Atualização 02 – Criar página Solicitacao.jsx  
- **Responsável pela correção:** Rennan Alves   
- **Prioridade:** Alta  
- **Link:** https://github.com/arsouza81/MIS_OS/issues/13  

### Atualização 03 – Criar página Index.jsx  
- **Responsável pela correção:** Rennan Alves  
- **Prioridade:** Alta  
- **Link:** https://github.com/arsouza81/MIS_OS/issues/14 

### Atualização 04 – Criar página Login.jsx  
- **Responsável pela correção:** Rennan Alves  
- **Prioridade:** Alta  
- **Link:** https://github.com/arsouza81/MIS_OS/issues/15   

### Atualização 05 – Criar página IndexGerente.jsx  
- **Responsável pela correção:** Alicia Caldeira 
- **Prioridade:** Alta  
- **Link:** https://github.com/arsouza81/MIS_OS/issues/16

### Atualização 06 – Criar página Solicitacoes.jsx  
- **Responsável pela correção:** Alicia Caldeira 
- **Prioridade:** Alta  
- **Link:** https://github.com/arsouza81/MIS_OS/issues/17  

### Atualização 07 – Criar página DetalhesSolicitacao.jsx  
- **Responsável pela correção:** Rennan Alves  
- **Prioridade:** Alta  
- **Link:** https://github.com/arsouza81/MIS_OS/issues/18   

### Atualização 08 – Criar componentes Footer, Header e HeaderGerente  
- **Responsável pela correção:** Rennan Alves
- **Prioridade:** Alta  
- **Link:** https://github.com/arsouza81/MIS_OS/issues/19   

### Atualização 09 – Remover SIAPE de visualização  
- **Responsável pela correção:** Anderson Souza  
- **Prioridade:** Alta  
- **Link:** https://github.com/arsouza81/MIS_OS/issues/20  

### Atualização 10 – Alterar controladores para retornar JSON ao frontend  
- **Responsável pela correção:** Rennan Alves  
- **Prioridade:** Crítica  
- **Link:** https://github.com/arsouza81/MIS_OS/issues/21  

### Atualização 11 – Remover views e arquivos estáticos do backend  
- **Responsável pela correção:** Rennan Alves   
- **Prioridade:** Média  
- **Link:** https://github.com/arsouza81/MIS_OS/issues/27   


---

## 4. Testes de Correções

<p align=justify>Para cada atualização realizada, foi realizada uma validação para comprovar a eficácia da solução e assegurar o pleno funcionamento do sistema diante das alterações aplicadas. Para isso, foi criada uma rotina de testes automatizados utilizando a plataforma <b>Cypress</b>, que validou a integração entre o frontend em React e o backend em .NET, garantindo que cada atualização atendesse ao seu objetivo.</p>


### Teste Atualização 01 – Organização do Projeto  
- **Cenário:** Executar o projeto após separação backend/frontend.  
- **Resultado Esperado:** Pastas frontend e backend funcionando de forma independente, sem conflitos.  
- **Responsável pelo teste:** Kássia Ramos  
- **Link da Evidência:** https://drive.google.com/file/d/185I8S9Fa6jmAq4m5ymJm8OB2zkQscm60/view?usp=sharing

### Teste Atualização 02 – Página Solicitacao.jsx  
- **Cenário:** Acessar detalhes de uma solicitação pelo React.  
- **Resultado Esperado:** Renderização correta dos campos e botão “Voltar” funcionando.  
- **Responsável pelo teste:** Kássia Ramos   
- **Link da Evidência:** https://drive.google.com/file/d/185I8S9Fa6jmAq4m5ymJm8OB2zkQscm60/view?usp=sharing

### Teste Atualização 03 – Página Index.jsx  
- **Cenário:** Preencher formulário e enviar dados.  
- **Resultado Esperado:** Validação no frontend e envio correto para API.  
- **Responsável pelo teste:** Kássia Ramos   
- **Link da Evidência:** https://drive.google.com/file/d/185I8S9Fa6jmAq4m5ymJm8OB2zkQscm60/view?usp=sharing

### Teste Atualização 04 – Página Login.jsx  
- **Cenário:** Inserir credenciais válidas e inválidas.  
- **Resultado Esperado:** Login realizado corretamente ou exibição de feedback de erro.  
- **Responsável pelo teste:** Kássia Ramos  
- **Link da Evidência:** https://drive.google.com/file/d/185I8S9Fa6jmAq4m5ymJm8OB2zkQscm60/view?usp=sharing

### Teste Atualização 05 – Página IndexGerente.jsx  
- **Cenário:** Selecionar data de consultas.  
- **Resultado Esperado:** Data escolhida é capturada e exibida corretamente.  
- **Responsável pelo teste:** Kássia Ramos  
- **Link da Evidência:** https://drive.google.com/file/d/185I8S9Fa6jmAq4m5ymJm8OB2zkQscm60/view?usp=sharing

### Teste Atualização 06 – Página Solicitacoes.jsx  
- **Cenário:** Listar solicitações por data escolhida.  
- **Resultado Esperado:** Exibição correta de todas as solicitações.  
- **Responsável pelo teste:** Kássia Ramos  
- **Link da Evidência:** https://drive.google.com/file/d/185I8S9Fa6jmAq4m5ymJm8OB2zkQscm60/view?usp=sharing

### Teste Atualização 07 – Página DetalhesSolicitacao.jsx  
- **Cenário:** Alterar status da solicitação.  
- **Resultado Esperado:** Atualização refletida no frontend.  
- **Responsável pelo teste:** Kássia Ramos  
- **Link da Evidência:** https://drive.google.com/file/d/185I8S9Fa6jmAq4m5ymJm8OB2zkQscm60/view?usp=sharing

### Teste Atualização 08 – Componentes Footer, Header e HeaderGerente  
- **Cenário:** Navegar entre páginas utilizando os componentes.  
- **Resultado Esperado:** Layout consistente em todo o sistema.  
- **Responsável pelo teste:** Kássia Ramos   
- **Link da Evidência:** https://drive.google.com/file/d/185I8S9Fa6jmAq4m5ymJm8OB2zkQscm60/view?usp=sharing

### Teste Atualização 09 – Remoção do SIAPE  
- **Cenário:** Consultar solicitação no frontend.  
- **Resultado Esperado:** Campo SIAPE não aparece.  
- **Responsável pelo teste:** Kássia Ramos   
- **Link da Evidência:** https://drive.google.com/file/d/156lgKbkX2nCjJbMmh7yfeVtQmTn997yP/view?usp=sharing 

### Teste Atualização 10 – Controladores JSON  
- **Cenário:** Requisição GET no endpoint de Usuário e Solicitação.  
- **Resultado Esperado:** Resposta em JSON estruturado.  
- **Responsável pelo teste:** Kássia Ramos   
- **Link da Evidência:** https://drive.google.com/file/d/1vE5529zTy2JLb7v6xrKNcUAyQco0HeSU/view?usp=drive_link 

### Teste Atualização 11 – Remover views e estáticos  
- **Cenário:** Subir backend sem pastas Views e wwwroot.  
- **Resultado Esperado:** Backend responde apenas com JSON.  
- **Responsável pelo teste:** Kássia Ramos  
- **Link da Evidência:** https://drive.google.com/file/d/1vE5529zTy2JLb7v6xrKNcUAyQco0HeSU/view?usp=drive_link

---

## 5. Conclusão

<p align=justify>  
As atividades de <b>Manutenção Adaptativa</b> envolveram principalmente a <b>migração</b> do sistema de Handlebars para React, a <b>adequação à LGPD</b> e a <b>refatoração de infraestrutura</b>, totalizando 11 issues concluídas com sucesso.  
</p>  

- O sistema agora está com frontend desacoplado do backend.  
- Todas as páginas principais foram migradas para React, com navegação SPA.  
- O backend retorna dados em JSON, eliminando dependência de views.  
- Dados sensíveis como o SIAPE foram ocultados, garantindo conformidade com a LGPD.  

<p align=justify>
Portanto, este relatório apresenta o fluxo completo da <b>Manutenção Adaptativa</b>, consolidando a modernização do Sistema de Ordem de Serviço e garantindo sua evolução tecnológica. 
</p>

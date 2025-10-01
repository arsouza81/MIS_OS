# Relatório de Testes de Manutenção Adaptativa do Sistema Ordem de Serviço

Este documento detalha o plano dos testes e as evidências de validação para cada uma das manutenções adaptativas realizadas no sistema **Ordem de Serviço**, com referência às issues originais no GitHub.

A elaboração desta fase de testes se organizou da seguinte maneira: 
- As modificações foram agrupadas em três cenários que são descritos abaixo. 
- Para cada cenário se tem um Plano de Testes com descrição de cada teste a ser executado bem como as informações do que vai ser validado em cada um.
- Os testes foram agrupados em um só arquivo, para garantir organização, coesão, otimização de tempo, e relação  com os problemas relatados como issues no repositório. 
- Foram também relacionadas em cada cenário as issues que possuem ligação com a modificação testada.
- Todas as issues relatadas foram cobridas pelos cenários e plano de teste de cada um.

Esta organização garante um auxilio eficiente para o leitor entender as validações feitas para cada modificação executada no sistema durante sua fase de Manutenção Adaptativa. 

---

## Cenários de Testes

### 1. Cenário: Modularização e Migração para React

**Objetivo:** Validar que a migração do front-end para a arquitetura React foi concluída com sucesso. Os testes garantirão que as páginas e componentes migrados estão funcionando corretamente e que a navegação entre eles não foi comprometida.

**Issues Relacionadas:**
- **Issue 1:** Organizar a estrutura do projeto.
- **Issue 5:** Criar página `IndexGerente.jsx`.
- **Issue 6:** Criar página `Solicitacoes.jsx`.
- **Issue 7:** Criar página `DetalhesSolicitacao.jsx`.
- **Issue 8:** Criar componentes `Footer`, `Header` e `HeaderGerente`.

**Plano de Testes:**  
Para este cenário, o plano de testes deve cobrir a funcionalidade e a estrutura das páginas e componentes migrados.

- **Teste 1: Componentes de Layout e Navegação**  
  Validar se os componentes de cabeçalho como (`Header` e `HeaderGerente`), e rodapé (`Footer`) são renderizados corretamente em todas as páginas do sistema e se os links de navegação entre as rotas do React funcionam como esperado.

- **Teste 2: Fluxo do Gerente**  
  Verificar se o fluxo completo do gerente funciona sem falhas, incluindo a entrada de dados na página `IndexGerente.jsx` e a navegação para a página `Solicitacoes.jsx`, confirmando que a URL e o conteúdo da página mudam conforme esperado.

- **Teste 3: Navegação para Detalhes**  
  Garantir que é possível navegar da lista de solicitações (`Solicitacoes.jsx`) para a página de detalhes de uma solicitação específica (`DetalhesSolicitacao.jsx`), validando o fluxo e a passagem de dados via parâmetros de URL.

**Evidências:**
Para cada cenário de testes foi incluido um video dos testes em execução, para evidencia da validação do Sistema, abaixo os links dos vídeos de testes de cada cenário.

- Cenario 01: [Evidencia de testes do Cenario 01](https://drive.google.com/file/d/185I8S9Fa6jmAq4m5ymJm8OB2zkQscm60/view?usp=sharing)
- Cenario 02: [Evidencia de testes do Cenario 02](https://drive.google.com/file/d/156lgKbkX2nCjJbMmh7yfeVtQmTn997yP/view?usp=sharing)
- Cenario 03: [Evidencia de testes do Cenario 02](https://drive.google.com/file/d/1vE5529zTy2JLb7v6xrKNcUAyQco0HeSU/view?usp=drive_link)
---

### 2. Cenário: Regulamentação - LGPD

**Objetivo:** Confirmar que a lógica de ocultação de dados sensíveis, como o número Siape, está funcionando conforme o controle de acesso de cada tipo de usuário (comum vs. gerente).

**Issue Relacionada:**
- **Issue 9:** Remover Siape de visualização.

**Plano de Testes:**  
Este cenário requer testes específicos para cada tipo de usuário, validando o comportamento de exibição do dado sensível.

- **Teste 1: Ocultação para Servidor**  
  Validar que, ao acessar a página de consulta de Ordem de Serviço (`Solicitacao.jsx`) como um servidor comum, o campo do Siape não é exibido.

- **Teste 2: Ocultação para Gerente**  
  Validar que, ao acessar a página de detalhes da Ordem de Serviço (`DetalhesSolicitacao.jsx`) como um gerente, o campo do Siape também não é exibido, confirmando que a remoção do dado é consistente em todas as telas de consulta.

---

### 3. Cenário: Migração de API Externa

**Objetivo:** Validar que a aplicação front-end está se comunicando com as novas rotas do back-end, que agora retornam dados em formato JSON, e que os dados estão sendo consumidos e exibidos corretamente.

**Issues Relacionadas:**
- **Issue 2:** Criar página `Solicitacao.jsx`.
- **Issue 3:** Criar página `Index.jsx`.
- **Issue 4:** Criar página `Login.jsx`.
- **Issue 10:** Alterar drivers para retornar JSON ao front-end.
- **Issue 11:** Remover views e arquivos estáticos do back-end.

**Plano de Testes:**  
Este plano de testes garantirá que os principais fluxos de interação com a API funcionam após as alterações no back-end.

- **Teste 1: Login**  
  Validar se o login do gerente funciona e se o front-end é redirecionado para a página correta após o recebimento de uma resposta JSON bem-sucedida da API de autenticação.

- **Teste 2: Cadastro de Solicitação**  
  Validar que o formulário da página `Index.jsx` envia os dados corretamente para a nova rota de API e que a aplicação exibe uma mensagem de sucesso após a resposta do back-end.

- **Teste 3: Busca de Solicitação**  
  Testar a funcionalidade de busca por protocolo, garantindo que o front-end chama a nova rota de API correta e exibe os detalhes da solicitação na página `Solicitacao.jsx`.

- **Teste 4: Logout**  
  Garantir que o botão de "Sair" do `HeaderGerente.jsx` envia a requisição para a nova rota de logout da API e que o usuário é redirecionado para a página inicial com sucesso.

## Conclusão 
Os testes realizados em cada cenário da Manutenção Adaptativa demonstram que as adaptações feitas no sistema foram bem sucedidas, garantindo que o sistema fique mais robusto e preparado para futuras mudanças. Como ponto de recaptulação abaixo os cenários e a conclusão dos testes para cada um.

- **Cenário de Modularização(React):** Os testes de navegação e renderização confirmaram a transição da arquitetura monolítica para uma arquitetura modular em React. Isso evidencia que o sistema agora possui uma base mais moderna e escalável, o que facilita manutenções e adições de funcionalidades futuras.

- **Cenário Regulamentação - LGPD:** As validações de ocultação dos dados sensíveis utilizados pelo sistema comprovam que a aplicação agora está em conformidade com as exigências de Privacidade, o que garante que o Siape do usuário não é exposto. Isso mostra que o sistema está apto para se adaptar a regulamentações legais, um requisito fundamental para softwares em produção.

- **Cenário de Migração de API:** Os testes de integração garantiram que a comunicação do front-end com as novas rotas do back-end que agora retornam dados em JSON, está funcionando corretamente. Isso evidencia que o sistema pode se adaptar a mudanças nas interfaces externas, mantendo sua interoperabilidade.

Portanto, a execução bem sucedida desses testes valida a eficácia de cada uma das alterações, comprovando que o sistema Ordem de Serviço evoluiu para ser mais seguro, flexível e adaptável, características cruciais para sua sustentabilidade a longo prazo, além de garantir preparo do sistema para as manutenções futuras.  
describe('Testes de Navegação e Modularização React', () => {

    // Antes de cada teste, execute a lógica de login para garantir autenticação
  beforeEach(() => {
    // 1. Visita a página de login
    cy.visit('http://localhost:5173/login');
    cy.wait(1000);

    // 2. Faz o login do gerente
    cy.get('input[name="email"]').type('rennansouzaalves@gmail.com');
    cy.get('input[name="password"]').type('123123');
    cy.get('button[type="submit"]').click();
    cy.wait(5000);

    // 3. Verifica o redirecionamento para a página do gerente
    cy.url().should('include', '/gerente');
  });

    // Teste 01: de renderização dos componentes de cabeçalho e rodapé
  it('Deve renderizar os componentes de cabeçalho e rodapé na página inicial', () => {
    // 1. Visita a página inicial da aplicação.
    cy.visit('http://localhost:5173/');

    // 2. Verifica se o componente de cabeçalho (`<header>`) está visível na tela.
    cy.get('header').should('be.visible');

    // 3. Adiciona uma pausa 
    cy.wait(5000);

    // 4. Verifica se o componente de rodapé (`<footer>`) está visível na tela.
    cy.get('footer').should('be.visible');

    // 5. Adiciona outra pausa para visualização.
    cy.wait(5000);
  });

  // Teste 02: de navegação entre a tela inicial do gerente e a lista de solicitações
it('Deve permitir a navegação para a lista de solicitações após selecionar uma data', () => {

    // 1. Seleciona a data e clica para pesquisar
    cy.get('#datepicker').type('2025-09-30'); 
    cy.get('#button-selecionar-data').click();
    cy.wait(5000);

    // 2. Verifica a URL completa gerada pela navegação
    cy.url().should('include', '/user/selecionar_data');
    cy.wait(5000);
    cy.url().should('include', 'data_solicitacao=2025-09-30');
    
    // 3. Confirma que o conteúdo da página foi renderizado
    cy.contains('h2', 'Solicitações do dia:').should('be.visible');
    cy.wait(5000);
  });

  // Teste 03: de navegação para a página de detalhes de uma solicitação
it('Deve permitir a navegação para a página de detalhes de uma solicitação', () => {
    
    const data = "2025-10-01"; // mesma data usada na URL

    // 1. Cria uma solicitação de teste via API
    cy.request({
        method: 'POST',
        url: 'http://localhost:5053/FormServidor/formulario',
        body: {
            nome: "Usuario de Teste",
            email: "teste@exemplo.com",
            siape: "123456",
            bloco: "A",
            sala: "101",
            descricaoProblema: "Problema no computador para testes Cypress",
            data_Solicitacao: data
        }
    }).its('status').should('eq', 200);

    // 2. Intercepta a chamada GET que carrega as solicitações dessa data
    cy.intercept('GET', `**/user/api/selecionar_data*`).as('getSolicitacoes');

    // 3. Navega para a página de solicitações da data escolhida
    cy.visit(`http://localhost:5173/user/selecionar_data?data_solicitacao=${data}`);

    // 4. Aguarda o carregamento da lista de solicitações
    cy.wait('@getSolicitacoes');
    cy.get('.custom-list li').should('have.length.greaterThan', 0);
    cy.wait(5000);

    // 5. Clica no link do primeiro item da lista de solicitações
    cy.get('a[href^="/user/detalhes_solicitacao/"]').first().click();
    cy.wait(5000);

    // 6. Verifica se a URL foi alterada e a página de detalhes está visível
    cy.url().should('include', '/detalhes_solicitacao/');
    cy.wait(5000);
    cy.get('h2').should('contain', 'Detalhes da Solicitação');
});

});
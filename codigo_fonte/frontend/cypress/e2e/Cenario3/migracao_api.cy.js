describe('Testes de Migração de API Externa', () => {

  // Teste 1: Login
  it('Deve permitir o login do gerente e redirecionar para a página correta', () => {
    cy.visit('http://localhost:5173/login');

    cy.get('input[name="email"]').type('rennansouzaalves@gmail.com');
    cy.get('input[name="password"]').type('123123');
    cy.wait(5000);

    cy.get('form.form-login button[type="submit"]').should('be.visible').click();

    cy.url().should('include', '/gerente');
    cy.wait(5000);
    cy.contains('h2', 'Solicitações Registradas').should('be.visible');
  });

  // Teste 2: Cadastro de Solicitação
  it('Deve enviar um novo formulário de solicitação e exibir a mensagem de sucesso', () => {
    // Intercepta a requisição POST para a API de cadastro
    cy.intercept('POST', '**/formServidor/formulario').as('postFormulario');

    cy.visit('http://localhost:5173/');

    cy.get('#nome').type('Usuario de Teste');
    cy.get('#email').type('teste@exemplo.com');
    cy.get('#siape').type('123456');
    cy.get('#bloco').type('A');
    cy.get('#sala').type('101');
    cy.get('#descricao-problema').type('Problema com a impressora.');
    cy.wait(5000);

    cy.get('form.form-servidor button[type="submit"]').click();

    // Aguarda a requisição da API de cadastro ser concluída com status 200
    cy.wait('@postFormulario').its('response.statusCode').should('eq', 200);

    // Verifica se o Toast de sucesso apareceu
    cy.contains('Formulário enviado com sucesso!').should('be.visible');
    cy.wait(2000);
  });

  // Teste 3: Busca de Solicitação
  it('Deve buscar uma solicitação por protocolo e exibir os detalhes corretos', () => {
    cy.visit('http://localhost:5173/');

    
    cy.get('input[name="protocolo"]').type('KCAENHKE');
    cy.wait(5000);

    // Pega o botão de submit do form visível
    cy.get('form').filter(':visible').find('button[type="submit"]').first().should('be.visible').click();

    cy.url().should('include', '/solicitacao/KCAENHKE');

    cy.get('.info-box').should('exist').and('be.visible');
    cy.wait(5000);
    cy.contains('strong', 'Protocolo:').should('be.visible');
  });

  // Teste 4: Logout
  it('Deve realizar o logout e ser redirecionado para a página inicial', () => {
    // 1. Faz o login do gerente
    cy.visit('http://localhost:5173/login');
    cy.get('input[name="email"]').type('rennansouzaalves@gmail.com');
    cy.get('input[name="password"]').type('123123');
    cy.wait(5000);
    cy.get('form.form-login button[type="submit"]').click();
    cy.wait(2000);

    // 2. Verifica se o botão/link "Sair" está visível no HeaderGerente
    cy.contains('Sair').should('be.visible').click();
    cy.wait(5000);
    
    // 3. Verifica se a URL foi alterada para a página inicial
    cy.url().should('eq', 'http://localhost:5173/');
  });
});


describe('teste de conformidade com a LGPD', () => {

  it('Não deve exibir os dados de SIAPE nas páginas de testes', () => {
    cy.visit('http://localhost:5173');
    cy.wait(5000);


    //Login da Gerência de TI
    cy.contains('Acesso Restrito').click(); //localizando e clicando no link Acesso Restrito
    cy.get('input[name="email"]').type('arsati@ufam.edu.br'); //localizando o campo email e preenchendo-o
    cy.get('input[name="password"]').type('12345678'); //localizando o campo senha e preenchendo-o
    cy.wait(5000); ////Segurando a tela para mostrar os campos email e senha preenchidos
    cy.contains('Entrar').click(); //localizando e clicando no botão Entrar
    
    //Selecionando a data desejada
    cy.get('input[type="date"]').type('2025-09-30');
    cy.contains('Solicitações Registradas').click();
    cy.wait(5000);
    cy.contains('Pesquisar').click();
    cy.wait(5000);
    //Selecionando a ordem de serviço desejada
    cy.contains('Servidor: Lana da Silva de Souza').click();
    cy.wait(5000);

    //Busca Servidor
    cy.contains('Sair').click();
    cy.get('input[name="protocolo"]').type('CWPGPJAG');
    cy.wait(5000); 
    cy.contains('Buscar').click();
    cy.wait(5000);
  });

});
describe('template spec', () => {

  //Cadastro de Solicitações de Serviços - Caso de Teste 1
  it('passes', () => {
    cy.visit('http://localhost:5053');
    //cy.visit('https://localhost:7232/Pagina/Index'); //visitando a página do sistema
   // cy.get('#nome').type('Anderson Souza'); //localizando o campo nome e preenchendo-o
    //cy.get('#email').type('arsdspg81@gmail.com'); //localizando o campo email e preenchendo-o
    //cy.get('#siape').type('19639551'); //localizando o campo siape e preenchendo-o
    //cy.get('#bloco').type('D'); //localizando o campo bloco e preenchendo-o
    //cy.get('#sala').type('310'); //localizando o campo sala e preenchendo-o
    //cy.get('#descricaoProblema').type('Impressora travando com o papel'); //localizando o campo decrição do problema e preenchendo-o
    //cy.contains('Enviar').click(); //localizando e clicando no botão Enviar


    //Consulta do andamento da solicitação de serviço - Caso de Teste 1 
    //cy.get('#search-form input').type('S8YRXJ07'); //localizando o campo protocolo e preenchendo-o 
    //cy.wait(15000); //Segurando a tela para mostrar o campo busca preenchido
    //cy.contains('Buscar').click(); //localizando e clicando no botão Buscar
 

    //cy.wait(10000); //segurando a tela para mostrar a ordem de serviço consultada
    //cy.contains('voltar').click(); //voltando para a tela inicial do sistema
    cy.wait(5000);


    //Login da Gerência de TI - Caso de Teste 1
    cy.contains('Acesso Restrito').click(); //localizando e clicando no link Acesso Restrito
    cy.get('#email').type('arsati@ufam.edu.br'); //localizando o campo email e preenchendo-o
    cy.get('#password').type('12345678'); //localizando o campo senha e preenchendo-o
    cy.wait(5000); ////Segurando a tela para mostrar os campos email e senha preenchidos
    cy.contains('Entrar').click(); //localizando e clicando no botão Entrar
    
    //Selecionando a data desejada
    cy.get('#datepicker').type('06/09/2025');
    cy.contains('Solicitações Registradas').click();
    cy.wait(5000);
    cy.contains('Pesquisar').click();
    cy.wait(5000);
    //Selecionando a ordem de serviço desejada
    cy.contains('Servidor: Saori da Siliva de Souza').click();
    cy.wait(5000);

  });

});
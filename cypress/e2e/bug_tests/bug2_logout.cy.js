describe('Bug 2 - Link de sair', () => {
  it('não deve quebrar a página ao clicar em sair', () => {
    // Passo 1: logar como GTI
    cy.visit('/login');  
    cy.get('input[name="email"]').type('rennansouzaalves@gmail.com', { delay: 100 }); // delay para visualização
    cy.get('input[name="password"]').type('123123', { delay: 100 });     // delay para visualização
    cy.get('button[type="submit"]').click();
    
    // Pequena pausa para o dashboard carregar
    cy.wait(1000);

    // Passo 2: selecionar uma data
    cy.get('#datepicker').click();
    cy.wait(5000); 

    // Seleciona o dia 15 do calendário
    cy.get('.ui-datepicker-calendar td:not(.ui-datepicker-other-month)')
        .contains('15')
        .click();
    cy.wait(5000); 

    cy.get('#button-selecionar-data').should('be.visible').click();
    cy.wait(5000); 

    // Passo 3: clicar em sair
    cy.get('a[href="/user/logout"]').click();
    cy.wait(5000); 

    // Passo 4: validar resultado esperado
    cy.url().should('include', '/');  // verifica se redirecionou corretamente
    cy.wait(1000); 
  });
});

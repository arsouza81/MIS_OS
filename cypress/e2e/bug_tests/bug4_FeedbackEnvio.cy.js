/// <reference types="cypress" />

describe('Bug 4 - Feedback de envio', () => {
    beforeEach(() => {
        // Acessa a página principal do formulário
        cy.visit('http://localhost:5053/');
    });

    it('Deve exibir feedback de sucesso ao enviar a ordem de serviço corretamente', () => {
        // Preenche o formulário
        cy.get('input#nome').type('Kassia Oliveira', { delay: 100 });
        cy.get('input#email').type('kassia@test.com', { delay: 100 });
        cy.get('input#siape').type('123456', { delay: 50 });
        cy.get('input#bloco').type('A', { delay: 50 });
        cy.get('input#sala').type('101', { delay: 50 });
        cy.get('textarea#descricaoProblema').type('Teste de envio automático do bug 4', { delay: 50 });

        // Envia o formulário
        cy.get('form.form-servidor button[type="submit"]').click();

        // Verifica se o toast de sucesso aparece
        cy.get('#toast', { timeout: 10000 })
        .should('exist')
        .invoke('text')
        .should('include', 'Formulário enviado com sucesso');



    });
});

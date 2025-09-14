/// <reference types="cypress" />

describe('Bug 3 - Formulário com espaços em branco nos campos de texto', () => {
    it('não deve quebrar a página ao enviar campos de texto com espaços', () => {
        // Acessa a página principal onde está o formulário
        cy.visit('http://localhost:5053/'); 
        cy.wait(500); 

        // Preenche campos de texto com espaços, com delay para vídeo
        cy.get('#nome').type('   ', { delay: 100 });
        cy.get('#email').type('   ', { delay: 100 });
        cy.get('#bloco').type('   ', { delay: 100 });
        cy.get('#descricaoProblema').type('   ', { delay: 100 });
        cy.wait(500); 

        // Preenche campos numéricos com valores válidos
        cy.get('#siape').type('12345678', { delay: 100 });
        cy.get('#sala').type('101', { delay: 100 });
        cy.wait(500); 

        // Intercepta o alert para verificar a mensagem
        cy.on('window:alert', (txt) => {
            expect(txt).to.include("O formulário precisa"); // Verifica se contém a mensagem de erro
        });

        // Envia o formulário
        cy.get('.form-servidor button[type="submit"]').click();
        cy.wait(1000); // pausa para ver o alert

        // Verifica se ainda estamos na mesma página (não houve redirecionamento)
        cy.url().should('eq', 'http://localhost:5053/');
        cy.wait(500); 
    });
});

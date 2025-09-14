/// <reference types="cypress" />

describe('Bug 5 - Feedback de falha no login', () => {
    
    // Antes de cada teste, vamos visitar a página de login
    beforeEach(() => {
        //url de acesso
        cy.visit('http://localhost:5053/login')
    })
 
    it('Deve exibir toast de erro ao inserir credenciais inválidas', () => {
        // Coloca um email e senha errados
        cy.get('#email').type('usuario_invalido@test.com', { delay: 100 }) // delay para ver digitação
        cy.get('#password').type('senhaerrada', { delay: 100 })

        // Clica no botão "Entrar"
        cy.get('.form-login button[type="submit"]').click()

        // Verifica se o toast de erro aparece
        cy.get('#errorToast', {timeout: 10000})
          .should('be.visible')
          .and('contain.text', '❌') // o emoggi de indicação de erro
          .wait(5000) // espera 5s para dar tempo de visualizar o toast
        
    })
})

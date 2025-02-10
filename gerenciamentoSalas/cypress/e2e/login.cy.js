describe("Cadastro de login", () => {
    beforeEach(() => {
        // Visita a página inicial
        cy.visit("http://localhost:5173/");

        // Espera os botões de ação estarem visíveis
        cy.get('.button-container').should('be.visible');

        // Clica no link "Faça Login" usando o texto
        cy.contains('Faça Login').click();
    });

    it("Deve acessar a página de login", () => {
        cy.url().should("include", "/login");
        cy.get("h2").should("contain.text", "Login");
    });

    it("Deve preencher o formulário de login e redirecionar para o dashboard após sucesso", () => {
        cy.intercept("POST", "http://localhost:8080/api/auth/login").as("loginRequest");

        cy.get("input[placeholder='Digite seu email']").type("rma@discente.ifpe.edu.br");
        cy.get("input[placeholder='Digite sua senha']").type("senhaSegura1!");
        cy.get("button[type='submit']").click();
        cy.wait("@loginRequest").its("response.statusCode").should("eq", 200);
        cy.get(".feedback-message.success").should("be.visible").and("contain.text", "Bem-vindo(a),");
        cy.url().should("include", "/dashboard");
    });

    it("Deve desabilitar o botão Entrar quando os campos estiverem vazios", () => {
        cy.get("button[type='submit']").should("be.disabled");
        cy.get("input[placeholder='Digite seu email']").type("usuario@exemplo.com");
        cy.get("button[type='submit']").should("be.disabled");
        cy.get("input[placeholder='Digite sua senha']").type("SenhaForte@123");
        cy.get("button[type='submit']").should("not.be.disabled");
    });

    it("Deve exibir mensagem de erro para email ou senha inválidos", () => {
        cy.get("input[placeholder='Digite seu email']").type("usuario@exemplo.com");
        cy.get("input[placeholder='Digite sua senha']").clear();
        cy.get("button[type='submit']").should("be.disabled");
        cy.get(".error-message").should("contain.text", "A senha é obrigatória.");
    });

    it("Deve alternar a visibilidade da senha ao clicar no ícone de olho", () => {
        cy.get("input[placeholder='Digite sua senha']").type("SenhaForte@123");
        cy.get("input#password").should("have.attr", "type", "password");
        cy.get("button.toggle-password").click();
        cy.get("input#password").should("have.attr", "type", "text");
        cy.get("button.toggle-password").click();
        cy.get("input#password").should("have.attr", "type", "password");
    });

    it("Deve redirecionar para a página de recuperação de senha ao clicar no link", () => {
        cy.contains("Esqueceu sua senha?").click();
        cy.url().should("include", "/esqueceu-senha");
    });    
});

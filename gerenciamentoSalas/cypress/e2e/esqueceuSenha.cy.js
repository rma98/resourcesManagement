describe("Esqueceu Senha", () => {
    beforeEach(() => {
        cy.visit("http://localhost:5173/");
        cy.get(".button-container").should("be.visible");
        cy.contains("Faça Login").click();
        cy.contains("Esqueceu sua senha?").click();
    });

    it("Deve acessar a página de esqueceu senha", () => {
        cy.url().should("include", "/esqueceu-senha");
        cy.get("h2").should("contain.text", "Esqueceu sua senha?");
    });

    it("Não deve permitir envio com campo de email vazio", () => {
        cy.get("button[type='submit']").click();
        cy.get(".error-message").should("be.visible").and("contain.text", "O email é obrigatório.");
    });

    it("Não deve permitir envio com email inválido", () => {
        cy.get("input[type='email']").type("email_invalido");
        cy.get("button[type='submit']").click();
        cy.get(".error-message").should("be.visible").and("contain.text", "O formato do email é inválido.");
    });

    it("Deve permitir envio com email válido", () => {
        cy.get("input[type='email']").type("hianyg81@gmail.com");
        cy.get("button[type='submit']").click();
        cy.get(".success-message")
            .should("be.visible")
            .and("contain.text", "Se o email informado estiver cadastrado, você receberá um link para redefinir sua senha.");
    });

    it("Deve exibir mensagem de erro caso a API falhe", () => {
        cy.intercept("POST", "http://localhost:8080/api/usuarios/esqueceu-senha", {
            statusCode: 500,
            body: { message: "Erro interno no servidor" },
        });

        cy.get("input[type='email']").type("usuario@email.com");
        cy.get("button[type='submit']").click();
        cy.get(".error-message")
            .should("be.visible")
            .and("contain.text", "Falha ao enviar o email. Tente novamente.");
    });
});

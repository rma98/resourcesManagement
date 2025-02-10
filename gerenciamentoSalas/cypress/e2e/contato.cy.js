describe("Receber Feedbacks", () => {
    beforeEach(() => {
        // Visita a página inicial
        cy.visit("http://localhost:5173/");

        // Abre o sidebar, se necessário
        cy.get(".menu-toggle").click();

        // Clica no link para a página de contato
        cy.get("a[href='/contato']").click();
    });

    it("Deve acessar a página de contato", () => {
        cy.url().should("include", "/contato");
        cy.get("h2").should("contain.text", "Envie seu Feedback!");
    });

    it("Deve exibir o formulário de feedback", () => {
        cy.get("input[placeholder='Seu Nome']").should("be.visible").type("Robson Albuquerque");
        cy.get("input[placeholder='Seu E-mail']").should("be.visible").type("robson@email.com");
        cy.get("textarea[placeholder='Sua Mensagem']").should("be.visible").type("Esse sistema está ótimo!");
        cy.get("button[type='submit']").should("be.visible").and("not.be.disabled");
    });

    it("Deve enviar o feedback com dados válidos e exibir mensagem de sucesso", () => {
        cy.intercept("POST", "http://localhost:8080/api/feedback", {
            statusCode: 201,
            body: { message: "Feedback enviado com sucesso!" },
        }).as("sendFeedback");

        cy.get("input[placeholder='Seu Nome']").type("Robson Albuquerque");
        cy.get("input[placeholder='Seu E-mail']").type("robson@example.com");
        cy.get("textarea[placeholder='Sua Mensagem']").type("Este é meu feedback!");
        cy.get("button[type='submit']").click();
        cy.wait("@sendFeedback").its("response.statusCode").should("eq", 201);
        cy.get(".status-message.success").should("be.visible").and("contain.text", "Feedback enviado com sucesso!");
    });

    it("Não deve permitir o envio do feedback se algum campo estiver vazio", () => {
        cy.get("button[type='submit']").should("be.disabled");
        cy.get("input[placeholder='Seu Nome']").type("Robson Albuquerque");
        cy.get("button[type='submit']").should("be.disabled");
        cy.get("input[placeholder='Seu E-mail']").type("robson@email.com");
        cy.get("button[type='submit']").should("be.disabled");
        cy.get("textarea[placeholder='Sua Mensagem']").type("Ótimo sistema!");
        cy.get("button[type='submit']").should("not.be.disabled");
    });

    it("Deve exibir mensagem de erro caso ocorra um erro ao enviar o feedback", () => {
        cy.intercept("POST", "http://localhost:8080/api/feedback", {
            statusCode: 500,
            body: { message: "Erro ao enviar feedback. Tente novamente!" },
        }).as("sendFeedbackError");
    
        cy.get("input[placeholder='Seu Nome']").type("Robson Albuquerque");
        cy.get("input[placeholder='Seu E-mail']").type("robson@example.com");
        cy.get("textarea[placeholder='Sua Mensagem']").type("Este é meu feedback!");
        cy.get("button[type='submit']").click();
        cy.wait("@sendFeedbackError").its("response.statusCode").should("eq", 500);
        cy.get(".status-message.error").should("be.visible").and("contain.text", "Erro ao enviar feedback. Tente novamente!");
    });
    
    it("Deve desabilitar o botão 'Enviar Feedback' quando o formulário for inválido", () => {
        cy.get("button[type='submit']").should("be.disabled");
        cy.get("input[placeholder='Seu Nome']").type("Robson Albuquerque");
        cy.get("input[placeholder='Seu E-mail']").type("robson@example.com");
        cy.get("textarea[placeholder='Sua Mensagem']").type("Este é meu feedback!");
        cy.get("button[type='submit']").should("not.be.disabled");
    });    
});

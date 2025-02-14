describe("Reserva Recurso", () => {
    beforeEach(() => {
        cy.visit("http://localhost:5173/");
        cy.get('.button-container').should('be.visible');
        cy.contains('Faça Login').click();
        cy.intercept("POST", "http://localhost:8080/api/auth/login").as("loginRequest");
        cy.get("input[placeholder='Digite seu email']").type("rma@discente.ifpe.edu.br");
        cy.get("input[placeholder='Digite sua senha']").type("senhaSegura1!");
        cy.get("button[type='submit']").click();
        cy.wait("@loginRequest").its("response.statusCode").should("eq", 200);
        cy.get(".feedback-message.success").should("be.visible").and("contain.text", "Bem-vindo(a),");
        cy.get('.button-grid').should('be.visible');
        cy.contains('Reservar Recurso').click();
    });

    it("Deve exibir o botão 'Reservar' quando o usuário tem permissão", () => {
        cy.get(".btn-reservar").should("be.visible").and("not.be.disabled");
    });

    it("Deve abrir o modal de reserva ao clicar no botão 'Reservar'", () => {
        cy.get(".btn-reservar").click();
        cy.get(".modal-reserva").should("be.visible");
    });

    it("Deve preencher o formulário de reserva e enviá-lo", () => {
        cy.get(".btn-reservar").click();
        cy.get(".modal-reserva").should("be.visible");

        // Preenchendo as datas e horários
        cy.get("#start-date").type("2024-12-20T10:00");
        cy.get("#end-date").type("2024-12-20T12:00");

        // Marcar checkbox de recurso adicional
        cy.get("input[type='checkbox']").check();
        cy.get("#additional-resource").type("Projetor de alta definição");

        // Enviar o formulário
        cy.get(".btn-confirmar").click();

        // Verificar se a reserva foi enviada corretamente (exemplo com interceptação da requisição)
        cy.intercept("POST", "http://localhost:8080/api/reservas").as("submitReservation");
        cy.wait("@submitReservation").its("response.statusCode").should("eq", 201);
    });
});

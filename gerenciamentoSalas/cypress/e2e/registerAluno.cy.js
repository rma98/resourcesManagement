describe("Cadastro de Aluno", () => {
    beforeEach(() => {
        // Visita a página inicial
        cy.visit("http://localhost:5173/");

        // Abre o sidebar, se necessário
        cy.get(".menu-toggle").click();

        // Abre o dropdown de cadastro
        cy.get("#registerMenu > a").click();

        // Clica no link para a página de cadastro de aluno
        cy.get("a[href='/register-aluno']").click();
    });

    it("Deve preencher o formulário e cadastrar um aluno com sucesso", () => {
        cy.get("input[placeholder='Digite seu nome completo']").type("Robson Albuquerque");
        cy.get("input[placeholder='Digite seu email']").type("robson.albuquerque@example.com");
        cy.get("input[placeholder='Digite sua senha']").type("SenhaForte@123");

        // Clica no botão para enviar o formulário
        cy.get("button.btn").click();
    });
    
    it("Deve exibir erro ao tentar cadastrar com email inválido", () => {
        cy.get("input[placeholder='Digite seu nome completo']").type("Robson Albuquerque");
        cy.get("input[placeholder='Digite seu email']").type("email-invalido");
        cy.get("input[placeholder='Digite sua senha']").type("SenhaForte@123");

        cy.get("button.btn").click();

        cy.contains("O formato do email é inválido.").should("be.visible");
    });

    it("Deve exibir erro ao tentar cadastrar com senha fraca", () => {
        cy.get("input[placeholder='Digite seu nome completo']").type("Robson Albuquerque");
        cy.get("input[placeholder='Digite seu email']").type("robson.albuquerque@example.com");
        cy.get("input[placeholder='Digite sua senha']").type("123456");

        cy.get("button.btn").click();

        cy.contains("A senha deve ter no mínimo 8 caracteres").should("be.visible");
    });

    it("Deve impedir cadastro caso o nome tenha menos de duas palavras", () => {
        cy.get("input[placeholder='Digite seu nome completo']").type("Robson");
        cy.get("input[placeholder='Digite seu email']").type("robson.albuquerque@example.com");
        cy.get("input[placeholder='Digite sua senha']").type("SenhaForte@123");

        cy.get("button.btn").click();

        cy.contains("Informe pelo menos nome e sobrenome.").should("be.visible");
    });

    it("Deve exibir erro ao tentar cadastrar com um email já cadastrado", () => {
        cy.get("input[placeholder='Digite seu nome completo']").type("Robson Albuquerque");
        cy.get("input[placeholder='Digite seu email']").type("robson.albuquerque@example.com"); // Email já existente
        cy.get("input[placeholder='Digite sua senha']").type("SenhaForte@123");

        cy.get("button.btn").click();

        cy.contains("Este email já está em uso.").should("be.visible");
    });

    it("Deve exibir erro ao tentar cadastrar com campos obrigatórios vazios", () => {
        cy.get("button.btn").click();

        cy.contains("O nome completo é obrigatório.").should("be.visible");
        cy.contains("O email é obrigatório.").should("be.visible");
        cy.contains("A senha é obrigatória.").should("be.visible");
    });

    it("Deve exibir erro ao tentar cadastrar com um nome muito longo", () => {
        cy.get("input[placeholder='Digite seu nome completo']").type("Robson".repeat(20));
        cy.get("input[placeholder='Digite seu email']").type("robson.albuquerque@example.com");
        cy.get("input[placeholder='Digite sua senha']").type("SenhaForte@123");

        cy.get("button.btn").click();

        cy.contains("O nome não pode ultrapassar 100 caracteres.").should("be.visible");
    });

    it("Deve exibir erro ao tentar cadastrar com uma senha sem critérios mínimos de segurança", () => {
        cy.get("input[placeholder='Digite seu nome completo']").type("Robson Albuquerque");
        cy.get("input[placeholder='Digite seu email']").type("robson.albuquerque@example.com");
        cy.get("input[placeholder='Digite sua senha']").type("abcdef12"); // Falta caractere especial

        cy.get("button.btn").click();

        cy.contains("A senha deve conter pelo menos uma letra maiúscula, um número e um caractere especial.").should("be.visible");
    });
});

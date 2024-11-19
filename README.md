# ResourcesManagement (Gerenciamento de Recursos)

O **ResourcesManagement** é uma aplicação web desenvolvida com **Vue.js** e **Spring Boot** para gerenciar salas, laboratórios e recursos adicionais em uma instituição de ensino. A aplicação oferece funcionalidades específicas para coordenadores, professores e alunos, promovendo uma experiência personalizada baseada no tipo de usuário.

## Visão Geral

Ao acessar a aplicação pela primeira vez, o usuário está deslogado. Nesse estado, ele pode:

- Navegar pelo menu com as opções: **Início**, **Cadastrar**, e **Login**.
- Visualizar salas, laboratórios e recursos disponíveis.

Para acessar funcionalidades avançadas, como reservar, editar ou remover salas e laboratórios, o usuário precisa realizar o cadastro e login.

### Permissões por Tipo de Usuário

- **Coordenador**:
  - Reservar salas ou laboratórios.
  - Editar e remover recursos.
- **Professor**:
  - Reservar salas ou laboratórios.
  - Não pode editar nem remover recursos.
- **Aluno**:
  - Funcionalidades específicas em desenvolvimento.
- **Usuário Deslogado**:
  - Acesso limitado à visualização de recursos.

### Funcionalidades Dinâmicas

Quando um usuário está logado, o sistema exibe funcionalidades adicionais no menu, como:
- **Perfil do Usuário**.
- **Sair**.
- Funcionalidades exclusivas baseadas no tipo do usuário.

## Funcionalidades

- **Login e Cadastro**: Acesso seguro com tipos de usuários específicos.
- **Visualização de Recursos**: Salas, laboratórios e recursos disponíveis.
- **Gerenciamento de Recursos**:
  - Adição, edição e exclusão de salas e laboratórios (somente coordenadores).
- **Reservas**: Realização de reservas para salas e laboratórios.

## Exemplos de Páginas

### Página Inicial (Usuário Deslogado)

![Página Inicial Deslogado](./docs/deslogado.png)

A tela inicial exibe os recursos disponíveis (salas e laboratórios) para visualização.

### Página Inicial (Usuário Logado)

![Página Inicial Logado](./docs/logado.png)

Após o login, o menu e as funcionalidades são adaptados ao tipo de usuário, permitindo ações específicas.

### Configuração do Frontend

1. Navegue até o diretório do frontend:
   ```bash
   cd https://github.com/rma98/resourcesManagement.git
2. Instale as dependências:
   ```bash
   npm install

### Configuração do Backend

1. Navegue até o diretório do backend:
   ```bash
   cd https://github.com/rma98/backend.git
2. Execute o projeto com Maven:
   ```bash
   ./mvnw spring-boot:run

### Estrutura de Diretórios

/gerenciamentoSalas
|-- /gerenciamentoSalasFrontend
|   |-- /src
|   |   |-- /components
|   |   |-- /views
|   |   |-- /assets
|   |-- /public
|   |-- package.json
|-- /gerenciamentoSalasBackend
|   |-- /src
|   |   |-- /main
|   |   |   |-- /java
|   |   |   |-- /resources
|   |-- pom.xml
|-- README.md

### Contribuição

1. Faça um fork do repositório.
2. Crie uma branch para sua feature:
   ```bash
   ./mvnw spring-boot:run
3. Faça suas alterações e teste.
4. Commit suas alterações:
   ```bash
   git add .
   git commit -m "feat: adicionar nova funcionalidade"
5. Faça push para sua branch:
   ```bash
   git push origin minha-feature
6. Abra um Pull Request.

### Licença

Este projeto visa facilitar o gerenciamento de recursos em instituições de ensino, garantindo acesso seguro e organizado com base nas permissões do usuário. Este projeto está licenciado sob a Licença MIT.

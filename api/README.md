# Introdução ao mks-nest-api-challenge

Bem-vindo à API mks-nest-api-challenge! 
Esta API permite gerenciar usuários e filmes, fornecendo endpoints para criar, recuperar, atualizar e excluir dados. Também inclui endpoints de factory para gerar dados de amostra. 

# Swagger

🔍 Mapeamento dos <a href="https://app.swaggerhub.com/apis-docs/SKYP33_1/mks-nest-api-challenge/1.0.0" target="_blank">endpoints</a>

## Visão geral da API

### Endpoints de Usuários
- **GET /users/**: Recupera uma lista paginada de usuários.
- **POST /users/**: Cria um novo usuário.
- **PUT /users/**: Atualiza os dados de um usuário existente.
- **DELETE /users/**: Exclui um usuário.
- **GET /users/show/1**: Recupera detalhes de um usuário específico.

### Endpoints de Filmes
- **GET /movies/**: Recupera uma lista paginada de filmes.
- **POST /movies/**: Adiciona um novo filme.
- **PUT /movies/**: Atualiza os dados de um filme existente.
- **DELETE /movies/**: Exclui um filme.
- **GET /movies/show/5**: Recupera detalhes de um filme específico.

### Endpoints de Fábrica
- **POST /users/factory/generate**: Gera usuários de amostra.
- **POST /movies/factory/generate**: Gera filmes de amostra.

## Autenticação

Para usar a maioria dos endpoints da API, você precisa estar autenticado. A autenticação é feita usando tokens JWT.

### Endpoint de Login
- **POST /auth/login**: Autentica e recupera um token JWT.
  - Exemplo de corpo da solicitação:
    ```json
    {
      "username": "marcos_sco",
      "password": "password"
    }
    ```

## Usando o Token JWT

Depois de obter seu token JWT no endpoint de login, inclua-o no cabeçalho de Autorização de suas solicitações para endpoints autenticados.

### Exemplo de Uso do Token JWT
```http
GET /users/ HTTP/1.1
Host: nest-api-mks-challenge.onrender.com
Authorization: Bearer your_jwt_token
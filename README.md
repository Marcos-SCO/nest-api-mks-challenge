<<<<<<< HEAD
# Projeto feito como desafio da empresa MkS 🚀

## 🔗 Api hospedada no link: 

<a href="https://nest-api-mks-challenge.onrender.com" target="_blank">https://nest-api-mks-challenge.onrender.com</a>

### Tecnologias Utilizadas 💻

- Node.js
- Typescript
- Docker
- PostgreSQL
- TypeORM

## Link para documentação da api e utilização no Swagger

📚 Readme de <a href="https://github.com/Marcos-SCO/nest-api-mks-challenge/tree/main/api#readme">introdução da api</a> 

🔍 Mapeamento dos endpoints no <a href="https://app.swaggerhub.com/apis-docs/SKYP33_1/mks-nest-api-challenge/1.0.0" target="_blank">Swagger</a>

## Postman

📬 Caso prefira, existe uma pasta na raiz do projeto chamada "postman" com um arquivo de importação, nele é possível utilizar os endpoints da api.

## Instruções de Uso para rodar localmente 🚀

Este repositório contém arquivos Docker necessários para executar uma API utilizando Node.js e PostgreSQL.

## Pré-requisitos 📋

- Docker: Certifique-se de ter o Docker instalado em sua máquina. 

- Caso seu sistema operacional seja windows, você pode rodar o projeto com o WSL ou docker desktop. Instale o Docker a partir do <a href="https://www.docker.com/products/docker-desktop" target="_blank">site oficial</a>.


## Configuração do Arquivo .env 🛠️

1. Dentro da pasta `/api`, localize o arquivo `.env.example`.

2. Copie este arquivo e cole na mesma pasta, renomeando-o para `.env`.

3. Abra o arquivo `.env` em um editor de texto.

4. Substitua os valores das variáveis de ambiente conforme necessário para a configuração da sua aplicação.

    - `APP_PORT`: Porta em que a aplicação estará escutando.
    - `DATABASE_HOST`: Host do banco de dados PostgreSQL.
    - `DATABASE_PORT`: Porta do banco de dados PostgreSQL.
    - `DATABASE_NAME`: Nome do banco de dados PostgreSQL.
    - `DATABASE_USERNAME`: Nome de usuário do banco de dados PostgreSQL.
    - `DATABASE_PASSWORD`: Senha do banco de dados PostgreSQL.
    - `JWT_SECRET`: Chave secreta para geração de tokens JWT.
    - `REDIS_URL`: URL do servidor Redis.
    - `REDIS_PASSWORD`: Senha do servidor Redis.

5. Salve as alterações no arquivo.

## Como Usar 🛠️

1. Navegue até o diretório onde os arquivos estão localizados.

2. Certifique-se de que sua aplicação está estruturada corretamente, incluindo todos os arquivos necessários, como `package.json`, `src` e outros, conforme esperado pelo Dockerfile e docker-compose.yml.

3. Execute o seguinte comando para criar e iniciar os contêineres Docker:

    ```
    docker-compose up --build
    ```

Certifique-se de ajustar as configurações de acordo com as necessidades específicas da sua aplicação, como variáveis de ambiente, portas expostas e dependências do contêiner.
=======
# mks-backend-challenge
>>>>>>> 14f4711 (Initial commit)

# Stremberry API

Projeto foi desenvolvido para o desafio técnico da *Keyworks*.
A Streamberry é uma empresa inovadora no ramo do entretenimento que busca revolucionar a forma como os filmes são produzidos. Determinada a criar algo único, a equipe da Streamberry deseja desenvolver um sistema de gestão de acervo de filmes que servirá como uma valiosa base de dados para a produção de novas obras cinematográficas.

O é montar uma API de gestão de acervo de filmes para a Streamberry com os critérios abaixo

## Critérios

  - [x] Os filmes podem estar disponíveis em vários Streamings,
  - [x] São agrupados por gênero
  - [x] Podem ser avaliados pelos usuários, com uma classificação de 1 a 5, podendo receber comentários
  - [x] São diferenciados através dos títulos
  - [x] Possuem mês e ano de lançamento
 
Para realizar a produção no novas obras, alguns dados são importantes:
  - [x] Em quantos Streamings um filme está disponível?
  - [x] Qual a média de avaliação de cada filme?
  - [x] Quantos filmes e quais foram lançados em cada ano?
  - [x] Localizar filmes conforme avaliação e seus respectivos comentários
  - [x] Quais são as avaliações médias de filmes agrupados por gênero conforme a época de lançamento

## 🚀 Começando

Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.

### 📋 Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/en/)

### Rodando o Back End (servidor)

```bash
# Clone este repositorio
$ git clone https://github.com/edurodrigues0/api-maturation-production.git

# Acesse a pasta do projeto no terminal/cmd

# Instale as dependências
$ npm install

# Crie um arquivo .env na raiz do projeto e copie e cole o conteudo do arquivo .env.example

# Rode as migration com o prisma
$ npx prisma migrate dev

# Apos a migration deve aparecer uma messagem "The seed command has been executed.", se nao use o comando
$ npx prisma db seed

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# O servidor iniciará na porta 3333 - acesse a documentação em <http://localhost:3333/api-docs>
```

## ⚙️ Executando os testes

Para executar os testes você precisará ter seguidos os passos acima e execute

```bash
$ npm run test
```

## 🛠️ Construído com

* [Fastify](https://fastify.dev/) - O framework web usado
* [Prisma](https://www.prisma.io/) - ORM usado para o banco de dados
* [Vitest](https://vitest.dev/guide/filtering) - Usado para fazer os testes e2e
* [Fastify-Swagger](https://github.com/fastify/fastify-swagger) - Para documentação da API
* [Zod](https://zod.dev/) - Para validação de tipagem
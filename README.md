# Chat Online

[README in English](README-eng.md)  

Este projeto é destinado a análises técnicas por recrutadores e não para uso público. O Chat Online é um chat simples e funcional, com cadastro de usuário, autenticação por e-mail e senha, e uma página privada de chat por texto em tempo real entre os usuários autenticados.

## Tabela de Conteúdos
- [Descrição](#descrição)
- [Arquitetura](#arquitetura)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Dependências](#dependências)
- [Demonstração do Projeto](#demonstração-do-projeto)
- [Decisões de Desenvolvimento](#decisões-de-desenvolvimento)
- [Considerações Finais](#considerações-finais)

## Descrição

Este projeto implementa um chat online com as seguintes funcionalidades:
- Cadastro através de uma API REST, com armazenamento dos dados em um banco relacional, no caso o PostgreSQL.
- Login com autenticação via json web tokens armazenados em cookies e armazenamento de sessão em Redis local.
- Chat em tempo real via conexão web socket entre usuários cadastrados e autenticados.

O objetivo é demonstrar habilidades de desenvolvimento e experimentação de tecnicas, incluindo:
- Organização de código em arquitetura MVC e separação de responsabilidades.
- Seração de backend e frontend explícita, com consumo do servidor via API.
- Segurança básica, como sanitização de entradas do usuário, prevenção de compartilhamentos de recursos por fontes externas, limitação de requisições para o sistema, armazenamento de senhas criptografadas.
- Utilização de diferentes usos do javascript, com React, Next.js, Typescript, Node.js e o próprio Vanilla.js.

## Arquitetura

O projeto segue a arquitetura MVC (Model-View-Controller), estruturado da seguinte forma:

- **Models:** Definem os modelos de dados usando Sequelize, incluindo a tabela `users` com os campos `id`, `email`, `username`, `password` e opções como `createdAt`.
- **Controllers:** Contêm a lógica de negócios, incluindo:
  - Processar o cadastro do usuário e inserção no banco de dados.
  - Processar o login e armazenamento da sessão no Redis.
  - Configurações gerais da lógica do funcionamento do chat online.
- **Routes:** Mapeiam as rotas para os controladores.
- **Middleware:** Inclui middlewares para limitação de requisições, autenticação do usuário na aplicação e no chat.
- **Config:** Contém toda a lógica de inicialização do servidor, do web socket e conexão com os bandos de dados.

  ### Estrutura de pastas:
```plaintext
/
├── backend
│   ├── package-lock.json
│   ├── package.json
│   ├── src
│       ├── app.js
│       ├── index.js
│       ├── config
│       │   ├── database.js
│       │   ├── redis.js
│       │   ├── server.js
│       │   ├── socket.js
│       ├── controllers
│       │   ├── authController.js
│       │   ├── chatController.js
│       ├── middlewares
│       │   ├── authMiddleware.js
│       │   ├── loginLimiter.js
│       │   ├── rateLimiter.js
│       │   ├── security.js
│       │   ├── signupLimiter.js
│       │   ├── socketAuth.js
│       ├── models
│       │   ├── user.js
│       ├── routes
│           ├── routes.js
├── frontend
│   ├── components
│   │   ├── Layout.tsx
│   ├── pages
│   │   ├── _app.tsx
│   │   ├── chat.tsx
│   │   ├── index.tsx
│   │   ├── signup.tsx
│   ├── public
│   │   ├── images
│   │       ├── denim.png
│   ├── styles
│   │   ├── Chat.module.css
│   │   ├── globals.css
│   │   ├── Layout.module.css
│   │   ├── Login.module.css
│   │   ├── Signup.module.css
│   ├── utils
│   │   ├── api.ts
│   ├── next.config.ts
│   ├── package-lock.json
│   ├── package.json
│   ├── tsconfig.json
├── README.md
├── README-eng.md
```

## Tecnologias Utilizadas

- **React e Next.js:** Para componetizar e renderizar o frontend.
- **Typecript:** Melhorando a tipagem para que os dados enviados ao backend sejam mais consistentes.
- **CSS:** Para gerar a estilização do design das páginas.
- **Node.js:** Runtime para o backend, configurando o servidor.
- **Express:** Framework para construir a API.
- **Sequelize:** ORM para comunicação com o banco de dados.
- **PostgreSQL:** Banco de dados relacional usado no ambiente local para armazenar os dados de cadastro.
- **Redis:** Banco de dados para armazenamento da sessão de login em memória.
- **Socket.Io:** Biblioteca para estabelecimento da conexão web socket.

## Dependências

- **bcrypt:** Para hashing de senhas de forma segura.
- **cookie:** Para manipular cabeçalhos e strings de cookies.
- **cookie-parser:** Para analisar cookies enviados em requisições HTTP.
- **cors:** Para habilitar o compartilhamento de recursos entre origens diferentes.
- **dotenv:** Para gerenciar variáveis de ambiente em arquivos .env.
- **express:** Framework minimalista para criação de servidores web e APIs.
- **express-rate-limit:** Para limitar o número de requisições por IP, prevenindo abusos.
- **express-validator:** Para validar e sanitizar entradas em rotas do Express.
- **helmet:** Para configurar cabeçalhos HTTP de segurança.
- **jsonwebtoken:** Para criar e validar tokens JWT (JSON Web Tokens).
- **pg:** Biblioteca para conectar e executar queries no PostgreSQL.
- **pg-hstore:** Para lidar com tipos de dados JSON armazenados no PostgreSQL.
- **redis:** Cliente para interagir com o banco de dados Redis.
- **sequelize:** ORM (Object Relational Mapper) para manipular bancos de dados SQL.
- **socket.io:** Para comunicação bidirecional em tempo real usando WebSockets.
- **nodemon:** Para reiniciar automaticamente o servidor durante o desenvolvimento.
- **axios:** Para realizar requisições HTTP.
- **next:** Framework para React com suporte a SSR (Server-Side Rendering) e SSG (Static Site Generation).
- **react:** Biblioteca para construção de interfaces de usuário.
- **react-dom:** Para manipulação da árvore DOM com React.
- **socket.io-client:** Cliente WebSocket para conectar com servidores usando socket.io.

## Demonstração do Projeto
- Página de login:

<img src="https://i.ibb.co/q96SsSx/login.png" alt="Atalho Gerado" width="700" />

- Página de cadastro:

<img src="https://i.ibb.co/18nZw2z/signup.png" alt="Atalho Gerado" width="700" />

- Página do chat:

<img src="https://i.ibb.co/1JkZ9Tb/chat2.png" alt="Atalho Gerado" width="700" />

- Testando ao vivo:

https://github.com/user-attachments/assets/c9ee84cd-8b2c-4bb4-8623-ba67c02aa791

## Decisões de Desenvolvimento

- **Arquitetura MVC:** Escolhida para separar responsabilidades no backend e facilitar a manutenção.
- **Componentização e Modularização:** Para organizar com clareza o frontend, com base em princípios de file-system routing, estilos escopados e separação de responsabilidades.
- **Implemento de segurança com middlewares:** Para flexibilizar a generalização ou individualização das regras de segurança para as rotas e protocolos, possibilitando autenticação tanto do usuário quanto do web socket, além de limitar tentativas de negação de serviço contra o sistema.
- **Sanitização de entradas:** Implementada com `express-validator` e javascript para evitar injeções de códigos pelo usuário. O sequelize também trata da proteção contra injeções SQL.
- **Armazenamento de sessão:** Utilizando o Redis em razão da possibilidade do uso em memória, tornando as sessões de login temporárias e de alta performance.
- **Banco de dados PostgreSQL:** Escolhido pela simplicidade de instalação e utilização local, dada a finalidade pessoal do projeto. É também ideal para armazenamento de dados cadastrais, utilizando tabelas.
- **Next e Node:** Para simular dois ambientes distintos em interação entre si, com tecnologias e regras distintas cooperando em conjunto.

## Considerações Finais

Este projeto foi desenvolvido com o intuito de demonstrar estudos e práticas de desenvolvimento web, podendo eventualmente e futuramente ser utilizado para escalar em uma aplicação real, provavelmente a ser refatorado em com práticas mais direcionadas ao contexto de um chat online real e robusto. Sugestões e críticas são bem-vindas!

Obrigado pela oportunidade de analisar meu trabalho.

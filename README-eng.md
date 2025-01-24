# Chat Online

[README em Português](README.md)  

This project is intended for technical analysis by recruiters and not for public use. Online Chat is a simple and functional chat, with user registration, email and password authentication, and a private real-time text chat page between authenticated users.

## Table of Contents
- [Description](#description)
- [Architecture](#architecture)
- [Technologies Used](#technologies-used)
- [Dependencies](#dependencies)
- [Project Demonstration](#project-demonstration)
- [Development Decisions](#development-decisions)
- [Final Considerations](#final-considerations)

## Description

This project implements an online chat with the following features:
- Registration via a REST API, with data storage in a relational database, in this case PostgreSQL.
- Login with authentication via JSON web tokens stored in cookies and session storage in local Redis.
- Real-time chat via web socket connection between registered and authenticated users.

The goal is to demonstrate development skills and experimentation with techniques, including:
- Code organization in MVC architecture and separation of responsibilities.
- Explicit backend and frontend configuration, with server consumption via API.
- Basic security, such as sanitizing user input, preventing resource sharing by external sources, limiting requests to the system, and storing encrypted passwords.
- Using different uses of JavaScript, with React, Next.js, Typescript, Node.js, and Vanilla.js itself.

## Architecture

The project follows the MVC (Model-View-Controller) architecture, structured as follows:

- **Models:** Define the data models using Sequelize, including the `users` table with the fields `id`, `email`, `username`, `password` and options such as `createdAt`.
- **Controllers:** Contain the business logic, including:
- Processing user registration and insertion into the database.
- Processing login and storing the session in Redis.
- General configurations of the online chat operation logic.
- **Routes:** Map the routes to the controllers.
- **Middleware:** Includes middleware for limiting requests, user authentication in the application and in the chat.
- **Config:** Contains all the server initialization logic, the web socket and connection to the databases.

  ### Folder structure:
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

## Technologies Used

- **React and Next.js:** To compose and render the frontend.
- **Typescript:** Improving typing so that data sent to the backend is more consistent.
- **CSS:** To generate the styling of the page design.
- **Node.js:** Runtime for the backend, configuring the server.
- **Express:** Framework to build the API.
- **Sequelize:** ORM for communicating with the database.
- **PostgreSQL:** Relational database used in the local environment to store registration data.
- **Redis:** Database for storing the login session in memory.
- **Socket.Io:** Library for establishing the web socket connection.

## Dependencies

- **bcrypt:** For secure password hashing.
- **cookie:** For manipulating cookie headers and strings.
- **cookie-parser:** For parsing cookies sent in HTTP requests.
- **cors:** For enabling cross-origin resource sharing.
- **dotenv:** For managing environment variables in .env files.
- **express:** Minimalist framework for creating web servers and APIs.
- **express-rate-limit:** For limiting the number of requests per IP, preventing abuse.
- **express-validator:** For validating and sanitizing input in Express routes.
- **helmet:** For configuring secure HTTP headers.
- **jsonwebtoken:** For creating and validating JWT tokens (JSON Web Tokens).
- **pg:** Library for connecting and executing queries in PostgreSQL.
- **pg-hstore:** For handling JSON data types stored in PostgreSQL.
- **redis:** Client for interacting with the Redis database.
- **sequelize:** ORM (Object Relational Mapper) for manipulating SQL databases.
- **socket.io:** For real-time bidirectional communication using WebSockets.
- **nodemon:** For automatically restarting the server during development.
- **axios:** For making HTTP requests.
- **next:** Framework for React with support for SSR (Server-Side Rendering) and SSG (Static Site Generation).
- **react:** Library for building user interfaces.
- **react-dom:** For manipulating the DOM tree with React.
- **socket.io-client:** WebSocket client for connecting to servers using socket.io.

## Project Demonstration
- Login page:

<img src="https://i.ibb.co/D9SHgkw/login.png" alt="Atalho Gerado" width="700" />

- Sign Up page:

<img src="https://i.ibb.co/nPSwDCW/signup.png" alt="Atalho Gerado" width="700" />

- Chat page:

<img src="https://i.ibb.co/0VsHDRv/chat2.png" alt="Atalho Gerado" width="700" />

- Live testing:



## Development Decisions

- **MVC Architecture:** Chosen to separate responsibilities in the backend and facilitate maintenance.
- **Componentization and Modularization:** To clearly organize the frontend, based on principles of file-system routing, scoped styles and separation of responsibilities.
- **Security implementation with middleware:** To make it easier to generalize or individualize security rules for routes and protocols, enabling authentication of both the user and the web socket, in addition to limiting denial of service attempts against the system.
- **Input sanitization:** Implemented with `express-validator` and javascript to prevent code injections by the user. Sequelize also handles protection against SQL injections.
- **Session storage:** Using Redis due to the possibility of using it in memory, making login sessions temporary and high-performance. - **PostgreSQL database:** Chosen for its simplicity of installation and local use, given the personal purpose of the project. It is also ideal for storing registration data, using tables.
- **Next and Node:** To simulate two distinct environments interacting with each other, with different technologies and rules cooperating together.

## Final Considerations

This project was developed with the aim of demonstrating studies and web development practices, and may eventually be used in the future to scale up a real application, probably to be refactored with practices more directed to the context of a real and robust online chat. Suggestions and criticisms are welcome!

Thank you for the opportunity to analyze my work.
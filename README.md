# Travlr

Travlr is a full-stack travel application built with the MEAN stack (MongoDB, Express, Angular, Node.js). It includes a public travel site and an admin dashboard for managing trip listings, with JWT-based authentication for protected operations.

## Project Overview

This project demonstrates a complete end-to-end web application for a travel company:

- A public-facing travel site built with Express and Handlebars
- A MongoDB-backed API for trips and user data
- An Angular admin application for managing trip records
- Secure login and registration using JWTs
- CRUD operations for trip data

## Tech Stack

- Backend: Node.js, Express
- Frontend: Angular
- Template engine: Handlebars
- Database: MongoDB with Mongoose
- Authentication: Passport.js + JWT
- Environment config: dotenv

## Features

- Travel listing page powered by API data
- Trip search and display via trip codes
- User registration and login
- Protected trip create/update APIs
- Angular admin interface for adding and editing trips
- JWT-based session handling in the browser

## Project Structure

```text
travlr/
├── app.js
├── app_admin/                  # Angular admin application
│   ├── src/
│   ├── package.json
│   └── angular.json
├── app_api/                   # Express API and Mongo models
│   ├── config/
│   ├── controllers/
│   ├── models/
│   └── routes/
├── app_server/                # Server-rendered views and route handlers
│   ├── controllers/
│   ├── routes/
│   └── views/
├── public/                    # Static front-end assets
├── data/
├── package.json
├── README.md
└── bin/
```

## Prerequisites

Before running the project, make sure you have:

- Node.js installed
- npm installed
- MongoDB running locally
- A terminal with access to the workspace

## Environment Setup

Create a `.env` file in the project root with values like:

```env
PORT=3000
DB_HOST=127.0.0.1
JWT_SECRET=your_secret_key_here
CLIENT_ORIGIN=http://localhost:4200
API_BASE_URL=http://localhost:3000
```

### Environment variable reference

- `PORT`: backend server port
- `DB_HOST`: MongoDB host
- `JWT_SECRET`: signing secret for JWTs
- `CLIENT_ORIGIN`: allowed CORS origin for the API
- `API_BASE_URL`: base URL used by the server-rendered app when fetching trip data

## Installation

From the project root:

```bash
npm install
```

Then install dependencies for the Angular app:

```bash
cd app_admin
npm install
```

## Running the Application

### 1. Start MongoDB

Ensure MongoDB is running locally on your machine.

### 2. Start the backend API/server

From the project root:

```bash
npm start
```

This starts the Express server and serves the application on the configured port: `3000`.

### 3. Start the Angular admin app

In a separate terminal:

```bash
cd app_admin
npm start
```

This launches the Angular development server on: `http://localhost:4200`.

## Admin App Notes

The Angular admin application uses a runtime API base URL and can be configured for another environment without changing source code.

## Build Verification

The Angular admin app has been verified to build successfully with:

```bash
cd app_admin
npm run build
```

This completed successfully in the current workspace.

## Testing

This project includes validation-focused logic for auth and trip handlers, and the API now validates inputs before database operations. For added confidence, you can extend the suite with tests covering:

- successful registration
- duplicate user rejection
- invalid login payloads
- trip creation validation
- trip update and fetch flows

## License

This project is intended for educational and portfolio demonstration purposes.


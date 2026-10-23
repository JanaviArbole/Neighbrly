# Neighbrly 🏡

**Good people, right around the corner.**

Neighbrly is a full-stack web application designed to help residents discover local service providers and help local professionals showcase their businesses within their communities.

The project uses React for the frontend, Node.js and Express.js for the backend, and MongoDB Atlas for cloud database storage.

---

## 📌 Project Overview

Neighbrly aims to connect residents with trusted local professionals through a simple, community-focused platform.

### Objectives

- Build a responsive and interactive user interface.
- Implement RESTful APIs using Node.js and Express.js.
- Store application data in MongoDB Atlas.
- Support resident and service-provider accounts.
- Enable local service discovery and provider listings.
- Allow residents to send enquiries to service providers.
- Practise API testing using Postman.

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| HTML, CSS, JavaScript | Frontend development |
| React | User interface |
| Vite | Frontend development server |
| Node.js | Backend runtime |
| Express.js | REST API development |
| MongoDB Atlas | Cloud database |
| Mongoose | MongoDB object modelling |
| bcryptjs | Password hashing |
| jsonwebtoken | JWT authentication tokens |
| Postman | API testing |
| Git and GitHub | Version control |

---

## 📁 Project Structure

```text
Neighbrly/
├── client/
│   └── src/
│       ├── assets/
│       ├── App.jsx
│       ├── App.css
│       ├── index.css
│       └── main.jsx
│
├── server/
│   ├── src/
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Provider.js
│   │   │   ├── Enquiry.js
│   │   │   ├── Category.js
│   │   │   └── Locality.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   └── categoryRoutes.js
│   │   ├── app.js
│   │   ├── db.js
│   │   ├── seed.js
│   │   └── server.js
│   ├── .env
│   ├── package.json
│   └── package-lock.json
│
├── docs/
├── .gitignore
└── README.md
```

---

## ⚙️ Prerequisites

Install the following before running the project:

- Node.js and npm
- MongoDB Atlas account
- Git
- Visual Studio Code
- Postman (for API testing)

---

## 🚀 Installation and Setup

### 1. Clone or open the project

Open the project directory in VS Code and open a terminal at the project root.

### 2. Install frontend dependencies

```bash
cd client
npm install
```

### 3. Install backend dependencies

Open another terminal at the project root:

```bash
cd server
npm install
npm install bcryptjs jsonwebtoken
```

### 4. Configure environment variables

Create or update `server/.env`:

```env
PORT=5001
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_long_random_secret
```

Replace the example values with your own configuration.

- `MONGODB_URI` must contain your MongoDB Atlas connection string.
- `JWT_SECRET` is a private random secret used to sign authentication tokens.
- Never commit `.env` or share database credentials.
- Ensure your current public IP is permitted in Atlas Network Access.

### 5. Start the backend

From the `server` directory:

```bash
npm run dev
```

The backend should connect to MongoDB Atlas and start on:

`http://localhost:5001`

### 6. Start the frontend

In a second terminal:

```bash
cd client
npm run dev
```

Open the local URL printed by Vite.

---

## 🗄️ Database Design

The application uses MongoDB Atlas with the database name `neighbrly`.

### Collections

| Collection | Purpose |
|---|---|
| `categories` | Available service categories |
| `localities` | Supported neighbourhoods and localities |
| `users` | Resident and provider accounts |
| `providers` | Service-provider business profiles |
| `enquiries` | Enquiries submitted by residents |

MongoDB creates collections when documents are first successfully inserted, unless a collection has already been created explicitly.

The `categories` and `localities` collections have been seeded with 8 categories and 12 localities.

The remaining collections will contain records when their corresponding backend operations successfully save documents.

### User Model

The `User` model stores:

- Name
- Email
- Password hash
- Role (`resident` or `provider`)
- Phone number
- City and locality
- Account status
- Creation and update timestamps

Passwords are hashed with bcrypt before storage. The password hash is excluded from ordinary query results by default.

### Provider Model

The `Provider` model represents a service-provider business and includes:

- Owner's user ID
- Business name
- Service category
- Description and services offered
- Phone number
- City, locality, and address
- Working hours
- Starting price
- Images and verification status

### Enquiry Model

The `Enquiry` model stores requests sent to providers, including:

- Resident reference, when available
- Provider reference
- Customer name and contact information
- Enquiry message
- Status
- Creation and update timestamps

---

## 🔌 API Endpoints

The backend runs on `http://localhost:5001`.

### Health Check

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Check whether the API is running |

Example response:

```json
{
  "success": true,
  "message": "Neighbrly API is running."
}
```

### Authentication

The authentication router provides the following endpoints:

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/auth/register` | Register a resident or provider account |
| POST | `/api/auth/login` | Authenticate an existing account |

#### Register an account

Request:

```json
{
  "name": "Test Resident",
  "email": "resident.test@example.com",
  "password": "TestPass123!",
  "role": "resident",
  "phone": "9000000000",
  "city": "Pune",
  "locality": "Kothrud"
}
```

A successful registration returns the user details and a JWT token. The password itself is not returned.

#### Log in

Send a POST request to `/api/auth/login`:

```json
{
  "email": "resident.test@example.com",
  "password": "TestPass123!",
  "role": "resident"
}
```

Use the account's actual password when testing.

### Categories

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/categories` | Retrieve active service categories |
| GET | `/api/categories/:slug` | Retrieve a category by slug |

**Note:** Provider listing and enquiry models exist, but their CRUD API routes and frontend integration must be implemented before those operations can be considered fully connected to MongoDB.

---

## 🧪 Testing with Postman

### Test registration

1. Start the backend and confirm the MongoDB connection.
2. Create a POST request to `http://localhost:5001/api/auth/register`.
3. Select **Body → raw → JSON**.
4. Enter the registration JSON.
5. Click **Send**.
6. Confirm a successful response.

### Verify MongoDB storage

1. Open MongoDB Atlas.
2. Navigate to **Database → Browse Collections**.
3. Open the `neighbrly` database.
4. Refresh the collections view.
5. Open `users` and locate the newly registered account.

The document should contain a `passwordHash`, not the original password.

### Test login

Send a POST request to `http://localhost:5001/api/auth/login` with the registered email, password, and role.

A successful login should return the account details and a JWT token.

---

## 🔐 Security Considerations

- Store passwords as hashes using bcrypt.
- Keep MongoDB credentials and JWT secrets in environment variables.
- Never commit `.env` to version control.
- Validate request bodies and reject invalid input.
- Protect private routes with JWT verification middleware before using tokens for authorization.
- Never return password hashes or plain-text passwords to the frontend.
- Use a strong, private JWT secret.
- Do not expose sensitive authentication tokens in screenshots, logs, or public repositories.

---

## 📊 Current Implementation Status

| Feature | Status |
|---|---|
| React frontend | Implemented |
| Express backend | Running |
| MongoDB Atlas connection | Verified |
| Category and locality seed data | Seeded |
| User and provider models | Created |
| Enquiry model | Created |
| Authentication API registration | Tested successfully |
| Authentication API login | Endpoint implemented; test separately |
| React Sign Up/Login connected to API | Pending integration |
| Provider CRUD API | Pending |
| Enquiry CRUD API | Pending |
| End-to-end persistence for listings and enquiries | Pending |

The frontend currently contains browser `localStorage` logic. Until the React authentication, listing, and enquiry flows call their backend endpoints, the website may continue to store some data locally rather than in MongoDB Atlas.

---

## 🔮 Future Enhancements

- Connect React registration and login forms to the authentication API.
- Add JWT authentication middleware and protected endpoints.
- Implement provider creation, updating, and retrieval.
- Implement enquiry creation and status management.
- Connect frontend listing and enquiry forms to MongoDB-backed APIs.
- Add validation and improved error handling.
- Add automated API tests.
- Improve security and production deployment configuration.

---

## 👥 Contributors

Add the names and responsibilities of your team members here.

---

## 📄 License

This project is developed for educational purposes as part of a Full Stack Development course.

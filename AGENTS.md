# AGENTS.md - E-Commerce REST API

## Project Overview
This is a Node.js/Express REST API for an e-commerce application using PostgreSQL database.
The project follows MVC architecture with routes (controllers), models, and loaders pattern.

## Project Structure
```
backend/
  db/           - Database connection and queries
  loaders/      - Express middleware loaders (express.js, passport.js)
  models/       - Database models (user, product, cart, order)
  routes/       - API route handlers (controllers)
  index.js      - Application entry point
```

## Commands

### Development
```bash
npm run devStart   # Start server with nodemon (auto-restarts on file changes)
```

### Production
```bash
npm start          # Start production server (runs backend/index.js)
```

### Testing
```bash
npm test           # Currently returns "Error: no test specified"
```

## Code Style Guidelines

### JavaScript Standard (CommonJS)
- Use `require()` for imports and `module.exports` for exports
- Do NOT use ES6 module syntax (`import`/`export`)

### File Organization

#### Database Layer (db/index.js)
```javascript
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
```

#### Models (models/*.js)
- Export a class that handles all database interactions
- Use async/await for database operations
- Always use parameterized queries with `$1`, `$2`, etc. for values
- Wrap table/column names in double quotes: `"tableName"`, `"columnName"`
- Return `null` or empty array `[]` when no results found
- Throw `Error` with descriptive message on failure

```javascript
const db = require('../db/index');

module.exports = class ProductModel {
  async getProductById(id) {
    try {
      const product = await db.query('SELECT * FROM "products" WHERE "id" = $1', [id]);
      if (product.rows?.length) {
        return product.rows[0];
      }
      return null;
    } catch(err) {
      throw new Error('Error finding product: ' + err.message);
    }
  }
};
```

#### Routes (routes/*.js)
- Create router, instantiate model, define endpoints
- Use async/await with try/catch for async handlers
- Pass errors to `next(err)` for error-handling middleware
- Use appropriate HTTP status codes (200, 201, 400, 401, 500)

```javascript
const express = require('express');
const router = express.Router();
const ProductModel = require('../models/product');
const ProductModelInstance = new ProductModel();

module.exports = (app) => {
  app.use('/products', router);

  router.get('/get_all', async (req, res, next) => {
    try {
      const response = await ProductModelInstance.getAllProducts();
      res.status(200).send(response);
    } catch(err) {
      next(err);
    }
  });
};
```

#### Loaders (loaders/*.js)
- Configure and apply middleware
- Return configured passport or app instance

```javascript
module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());
  return passport;
};
```

### Naming Conventions

| Element | Convention | Example |
|---------|-----------|---------|
| Files | kebab-case | `cart-model.js`, `auth-routes.js` |
| Classes | PascalCase | `UserModel`, `OrderModel` |
| Functions | camelCase | `createUser`, `getCartById` |
| Constants | SCREAMING_SNAKE_CASE | `DATABASE_NAME`, `SESSION_SECRET` |
| Database tables | singular, lowercase | `users`, `products`, `orders` |
| HTTP routes | kebab-case, descriptive | `/get_all`, `/add_to_cart` |

### Error Handling

1. **Models**: Throw `Error` objects with descriptive messages
```javascript
throw new Error('Error registering user: ' + err.message);
```

2. **Routes**: Use try/catch, pass errors to `next(err)`
```javascript
try {
  const result = await model.method();
  res.status(200).send(result);
} catch(err) {
  next(err);
}
```

3. **Error Middleware**: In loaders/index.js
```javascript
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  const { message, status = 500 } = err;
  return res.status(status).send({ message });
});
```

### Database Queries

- Always use parameterized queries to prevent SQL injection
- Use `$1`, `$2`, etc. for parameter placeholders
- Wrap identifiers (table/column names) in double quotes
- Use `RETURNING *` for INSERT/UPDATE to get modified rows

```javascript
// Good
await db.query('SELECT * FROM "users" WHERE "email" = $1', [email]);
await db.query('INSERT INTO "products" ("name", "price") VALUES ($1, $2) RETURNING *', [name, price]);

// Avoid - SQL injection vulnerability
await db.query(`SELECT * FROM users WHERE email = '${email}'`);
```

### Async/Await Patterns

- Always use `async`/`await` for database operations
- Do not mix callbacks with async/await
- Handle promise rejections with try/catch

### Security Considerations

- Never commit `.env` files (already in `.gitignore`)
- Use bcrypt for password hashing
- Validate all user input in routes before passing to models
- Use parameterized queries for all database operations

### Environment Variables

Required in `backend/.env`:
```env
DATABASE_NAME=your_database_name
DATABASE_PASSWORD=your_database_password
FRONTEND_ENDPOINT=http://localhost:3000
API_ENDPOINT=http://localhost:4000
FRONTEND_LOCAL_NETWORK_ENDPOINT=http://192.168.x.x:3000
SESSION_SECRET=your_session_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
STRIPE_SECRET_TEST_KEY=your_stripe_secret_key
```

### Response Patterns

- Successful GET: `res.status(200).send(data)`
- Successful POST: `res.status(201).send(data)`
- Not found: `res.status(204).json({ message: '...' })` or return `null`
- Errors: `res.status(500).json({ error: err.message })`

### Passport Authentication

- Configure strategies in `loaders/passport.js`
- Serialize/deserialize user to session
- Use `req.isAuthenticated()` to check login status
- Protect routes by checking `req.user`

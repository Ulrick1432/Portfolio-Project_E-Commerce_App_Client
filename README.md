# Portfolio-Project_E-Commerce_App_REST-API

## Endpoints:
1. User Authentication:
* POST /api/register: Create a new user account.
* POST /api/login: Authenticate and log in a user.
* POST /api/logout: Log out the current user (optional).

2. CRUD Operations on Products:
* GET /api/products: Retrieve all products.
* GET /api/products/:id: Retrieve a specific product by ID.
* POST /api/products: Create a new product.
* PUT /api/products/:id: Update an existing product.
* DELETE /api/products/:id: Delete a product.

3. CRUD Operations on User Accounts:
* GET /api/users: Retrieve all user accounts (admin-only).
* GET /api/users/:id: Retrieve a specific user account by ID.
* POST /api/users: Create a new user account.
* PUT /api/users/:id: Update an existing user account.
* DELETE /api/users/:id: Delete a user account (admin-only).

4. CRUD Operations on User Carts:
* GET /api/carts: Retrieve all user carts (admin-only or user-specific).
* GET /api/carts/:userId: Retrieve a specific user's cart.
* POST /api/carts/:userId: Create a new cart for a user.
* PUT /api/carts/:userId: Update a user's cart.
* DELETE /api/carts/:userId: Delete a user's cart.

5. CRUD Operations on Orders:
* GET /api/orders: Retrieve all orders (admin-only or user-specific).
* GET /api/orders/:id: Retrieve a specific order by ID.
* POST /api/orders: Create a new order.
* PUT /api/orders/:id: Update an existing order (e.g., change order status).
* DELETE /api/orders/:id: Delete an order (admin-only).

6. Placing an Order:
* POST /api/orders/place: Endpoint for a user to place an order. This could include adding items to their cart, specifying shipping details, and completing the order.

## Folder: routes
The routes folder is used for endpoint

## Folder: models
The models folder is used for interating with the database with endpoint ()
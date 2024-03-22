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
1. The routes folder is used for endpoint
2. It handles incoming HTTP requests (Controller).
3. It interacts with for example the UserModel (Model) to perform business logic related to user registration.
4. It sends back appropriate HTTP responses to the client, including error handling (View).

## Folder: models
The models folder is used for interating with the database with endpoint ()
1. Model: for example The UserModel class represents the model in MVC. It encapsulates the logic related to users, such as registering a new user and querying existing users. It abstracts away the database interaction details and provides an interface for other parts of the application to interact with user-related data.

2. Database Interaction: The registerUser method interacts with the database to perform two operations:
It checks if a user with the provided email already exists in the database.
It inserts a new user into the database if the email is not already registered.

3. Error Handling: The code includes error handling to handle potential exceptions that may occur during database interactions or other operations. It throws custom error messages to provide meaningful feedback to the caller.

4. Asynchronous Operations: The methods are defined as async, indicating that they perform asynchronous operations, such as querying the database and handling promises returned by database operations.

## What is .env file used for? 
 - The file i used for storeing configuation variables for the project/application it can be accessible with the "process.env" object.

## what is the .gitignore used for?
- The file i used by Git to specify intentionally untracked files that Git should ignore.
- For example the .env file in this project has been set in the .gitignore so that i wont be tracked/copied by git.
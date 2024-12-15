# Library Management System

This project is a library management system API. Users can borrow, return, and view book information. The API is developed using Express.js and Sequelize, and it utilizes TypeScript.

## Project Structure


## Setup and Running the Project

1. **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2. **Install the necessary packages:**
    ```bash
    npm install
    ```

3. **Create a `.env` file and enter the required environment variables:**
    ```

    DATABASE_URL=postgres://${PG_USER}:${PG_PASS}@${PG_HOST}:${PG_PORT}/${PG_DATABASE}
    ```

4. **Run the database migrations:**
    ```bash
    npx sequelize-cli db:migrate
    ```

5. **Start the application:**
    ```bash
    npm start
    ```

## Running the Application with Docker
    ```bash
docker-compose build
docker-compose up
   ```

## Running Postman Tests with Newman
### Prerequisites
Ensure you have Newman installed. You can install Newman globally using npm:

```sh
npm install -g newman
```
### Running Tests

```sh
newman run collections/testCollection.postman_collection.json
```

## API Endpoints

### Book Endpoints

- **GET /api/books**: Retrieves all books.
- **GET /api/books/:id**: Retrieves a book by its ID.
- **POST /api/books**: Creates a new book.

### Book Viewing Endpoints

- **POST /api/users/:userId/borrow/:bookId**: Borrows a book for a user.
- **POST /api/users/:userId/return/:bookId**: Returns a borrowed book for a user.

### User Endpoints

- **GET /api/users**: Retrieves all users.
- **GET /api/users/:id**: Retrieves a user by their ID.
- **POST /api/users**: Creates a new user.

## Error Handling

Error handling is defined in the `middlewares/errorHandler.ts` file. It handles Joi validation errors and general server errors.



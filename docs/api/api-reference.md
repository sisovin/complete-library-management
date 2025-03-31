# API Reference

## Authentication

### Register User
- **URL**: `/api/v1/auth/register`
- **Method**: `POST`
- **Description**: Register a new user.
- **Request Body**:
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "id": "string",
      "name": "string",
      "email": "string"
    }
  }
  ```

### Login User
- **URL**: `/api/v1/auth/login`
- **Method**: `POST`
- **Description**: Login an existing user.
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "token": "string"
  }
  ```

## Users

### Get All Users
- **URL**: `/api/v1/users`
- **Method**: `GET`
- **Description**: Get a list of all users.
- **Response**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "string",
        "name": "string",
        "email": "string"
      }
    ]
  }
  ```

### Get User by ID
- **URL**: `/api/v1/users/:id`
- **Method**: `GET`
- **Description**: Get a user by their ID.
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "id": "string",
      "name": "string",
      "email": "string"
    }
  }
  ```

### Update User
- **URL**: `/api/v1/users/:id`
- **Method**: `PUT`
- **Description**: Update a user's information.
- **Request Body**:
  ```json
  {
    "name": "string",
    "email": "string"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "id": "string",
      "name": "string",
      "email": "string"
    }
  }
  ```

### Delete User
- **URL**: `/api/v1/users/:id`
- **Method**: `DELETE`
- **Description**: Delete a user by their ID.
- **Response**:
  ```json
  {
    "success": true,
    "data": null
  }
  ```

## Books

### Get All Books
- **URL**: `/api/v1/books`
- **Method**: `GET`
- **Description**: Get a list of all books.
- **Response**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "string",
        "title": "string",
        "author": "string",
        "isbn": "string",
        "publishedDate": "string"
      }
    ]
  }
  ```

### Get Book by ID
- **URL**: `/api/v1/books/:id`
- **Method**: `GET`
- **Description**: Get a book by its ID.
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "id": "string",
      "title": "string",
      "author": "string",
      "isbn": "string",
      "publishedDate": "string"
    }
  }
  ```

### Add New Book
- **URL**: `/api/v1/books`
- **Method**: `POST`
- **Description**: Add a new book.
- **Request Body**:
  ```json
  {
    "title": "string",
    "author": "string",
    "isbn": "string",
    "publishedDate": "string"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "id": "string",
      "title": "string",
      "author": "string",
      "isbn": "string",
      "publishedDate": "string"
    }
  }
  ```

### Update Book
- **URL**: `/api/v1/books/:id`
- **Method**: `PUT`
- **Description**: Update a book's information.
- **Request Body**:
  ```json
  {
    "title": "string",
    "author": "string",
    "isbn": "string",
    "publishedDate": "string"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "id": "string",
      "title": "string",
      "author": "string",
      "isbn": "string",
      "publishedDate": "string"
    }
  }
  ```

### Delete Book
- **URL**: `/api/v1/books/:id`
- **Method**: `DELETE`
- **Description**: Delete a book by its ID.
- **Response**:
  ```json
  {
    "success": true,
    "data": null
  }
  ```

## Borrowing

### Borrow Book
- **URL**: `/api/v1/borrow`
- **Method**: `POST`
- **Description**: Borrow a book.
- **Request Body**:
  ```json
  {
    "userId": "string",
    "bookId": "string",
    "borrowDate": "string",
    "returnDate": "string"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "id": "string",
      "userId": "string",
      "bookId": "string",
      "borrowDate": "string",
      "returnDate": "string"
    }
  }
  ```

### Return Book
- **URL**: `/api/v1/borrow/:id/return`
- **Method**: `POST`
- **Description**: Return a borrowed book.
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "id": "string",
      "userId": "string",
      "bookId": "string",
      "borrowDate": "string",
      "returnDate": "string"
    }
  }
  ```

## Fines

### Get All Fines
- **URL**: `/api/v1/fines`
- **Method**: `GET`
- **Description**: Get a list of all fines.
- **Response**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "string",
        "userId": "string",
        "amount": "number",
        "paid": "boolean"
      }
    ]
  }
  ```

### Get Fine by ID
- **URL**: `/api/v1/fines/:id`
- **Method**: `GET`
- **Description**: Get a fine by its ID.
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "id": "string",
      "userId": "string",
      "amount": "number",
      "paid": "boolean"
    }
  }
  ```

### Pay Fine
- **URL**: `/api/v1/fines/:id/pay`
- **Method**: `POST`
- **Description**: Pay a fine.
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "id": "string",
      "userId": "string",
      "amount": "number",
      "paid": "boolean"
    }
  }
  ```

## Admin

### Get All Users (Admin)
- **URL**: `/api/v1/admin/users`
- **Method**: `GET`
- **Description**: Get a list of all users (Admin only).
- **Response**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "string",
        "name": "string",
        "email": "string"
      }
    ]
  }
  ```

### Get User by ID (Admin)
- **URL**: `/api/v1/admin/users/:id`
- **Method**: `GET`
- **Description**: Get a user by their ID (Admin only).
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "id": "string",
      "name": "string",
      "email": "string"
    }
  }
  ```

### Update User (Admin)
- **URL**: `/api/v1/admin/users/:id`
- **Method**: `PUT`
- **Description**: Update a user's information (Admin only).
- **Request Body**:
  ```json
  {
    "name": "string",
    "email": "string"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "id": "string",
      "name": "string",
      "email": "string"
    }
  }
  ```

### Delete User (Admin)
- **URL**: `/api/v1/admin/users/:id`
- **Method**: `DELETE`
- **Description**: Delete a user by their ID (Admin only).
- **Response**:
  ```json
  {
    "success": true,
    "data": null
  }
  ```

## Miscellaneous

### Health Check
- **URL**: `/api/v1/health`
- **Method**: `GET`
- **Description**: Check the health of the API.
- **Response**:
  ```json
  {
    "success": true,
    "status": "healthy"
  }
  ```

### Get API Version
- **URL**: `/api/v1/version`
- **Method**: `GET`
- **Description**: Get the current version of the API.
- **Response**:
  ```json
  {
    "success": true,
    "version": "string"
  }
  ```

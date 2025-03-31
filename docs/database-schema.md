# Database Schema Documentation

## Users Table
- **Table Name**: `users`
- **Columns**:
  - `id`: Primary key, auto-incremented integer
  - `username`: Unique username, string
  - `email`: Unique email address, string
  - `password`: Hashed password, string
  - `role`: User role (e.g., admin, user), string
  - `created_at`: Timestamp of user creation
  - `updated_at`: Timestamp of last update

## Books Table
- **Table Name**: `books`
- **Columns**:
  - `id`: Primary key, auto-incremented integer
  - `title`: Title of the book, string
  - `author`: Author of the book, string
  - `isbn`: ISBN number, string
  - `published_date`: Date of publication, date
  - `genre`: Genre of the book, string
  - `available_copies`: Number of available copies, integer
  - `created_at`: Timestamp of book creation
  - `updated_at`: Timestamp of last update

## Borrow Table
- **Table Name**: `borrow`
- **Columns**:
  - `id`: Primary key, auto-incremented integer
  - `user_id`: Foreign key referencing `users` table
  - `book_id`: Foreign key referencing `books` table
  - `borrow_date`: Date when the book was borrowed, date
  - `return_date`: Date when the book was returned, date
  - `due_date`: Due date for returning the book, date
  - `fine_amount`: Fine amount for overdue books, decimal
  - `created_at`: Timestamp of borrow record creation
  - `updated_at`: Timestamp of last update

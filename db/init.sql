CREATE DATABASE IF NOT EXISTS expense_tracker;
USE expense_tracker;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  type ENUM('income', 'expense') NOT NULL,
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  category_id INT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  type ENUM('income', 'expense') NOT NULL,
  date DATE NOT NULL,
  description VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_user_id (user_id),
  INDEX idx_date (date),
  INDEX idx_category_id (category_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- Seed default categories (global, no user)
INSERT INTO categories (name, type, user_id) VALUES
('Salary', 'income', NULL),
('Freelance', 'income', NULL),
('Food', 'expense', NULL),
('Rent', 'expense', NULL),
('Transport', 'expense', NULL),
('Entertainment', 'expense', NULL),
('Health', 'expense', NULL),
('Shopping', 'expense', NULL);
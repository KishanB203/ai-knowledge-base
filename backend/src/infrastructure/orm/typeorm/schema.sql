CREATE TABLE users (
  id VARCHAR(64) PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  username VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('Admin', 'Normal User') NOT NULL,
  department VARCHAR(100) NOT NULL,
  position VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO users (id, email, username, password_hash, role, department, position)
VALUES
  (
    'admin-001',
    'admin@knowledgebase.local',
    'admin',
    '$2a$10$development.seed.hash.placeholder',
    'Admin',
    'Management',
    'Manager'
  ),
  (
    'user-001',
    'normal.user@knowledgebase.local',
    'normaluser',
    '$2a$10$development.seed.hash.placeholder',
    'Normal User',
    'Design',
    'Team Leader'
  );

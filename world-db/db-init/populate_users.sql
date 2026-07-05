INSERT INTO Users (mail, username, password, is_verified, role) VALUES
('admin@test.com', 'Admin Doe', '$2a$10$XX8C/AuxtuMclX5XsbaVkO3w2e4ITcvVDq80Lqp.IXw80En.7dD5K', TRUE, 'ADMIN'),
('user@test.com', 'John Doe', '$2a$10$XX8C/AuxtuMclX5XsbaVkO3w2e4ITcvVDq80Lqp.IXw80En.7dD5K', TRUE, 'USER');
-- The password above is 'user' for testing purpose.
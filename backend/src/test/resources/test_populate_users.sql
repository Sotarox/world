INSERT INTO Users (
  mail, username, password, is_verified, role
) VALUES
('admin@test.com', 'admin', '$2a$10$Micox2sLqd.8R66lL0yEaO79k/9YSkt4sZuZ5ve7kjEHL3lf4o9DS', TRUE, 'ADMIN'),
('example1@test.com', 'user1', '$2a$10$VDLq0HP.9NkRE/IG9lSPwuebJPm.DV5Exfr4JOUx6HxWmK/OwYYa6', TRUE, 'USER');
-- admin's password is 'admin', example's password is 'password1'
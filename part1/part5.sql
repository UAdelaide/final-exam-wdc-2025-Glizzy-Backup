INSERT INTO Users (username, email, password_hash, role) VALUES ('alice123', 'alice@example.com', 'hashed123', 'owner');
INSERT INTO Users (username, email, password_hash, role) VALUES ('bobwalker', 'bob@example.com', 'hashed456', 'walker');
INSERT INTO Users (username, email, password_hash, role) VALUES ('carol123', 'carol@example.com', 'hashed789', 'owner');
INSERT INTO Users (username, email, password_hash, role) VALUES ('glizzy-g', 'gliccy.g@example.com', 'hashed50', 'owner');
INSERT INTO Users (username, email, password_hash, role) VALUES ('busy-g', 'busy.g@example.com', 'hashed150', 'walker');

INSERT INTO Dogs (owner_id, name, size) VALUES ((SELECT user_id FROM Users WHERE Users.username = 'alice123'), 'Max', 'medium');
INSERT INTO Dogs (owner_id, name, size) VALUES ((SELECT user_id FROM Users WHERE Users.username = 'carol123'), 'Bella', 'small');
INSERT INTO Dogs (owner_id, name, size) VALUES ((SELECT user_id FROM Users WHERE Users.username = 'carol123'), 'Madi', 'medium');
INSERT INTO Dogs (owner_id, name, size) VALUES ((SELECT user_id FROM Users WHERE Users.username = 'glizzy-g'), 'Pumpkin', 'medium');
INSERT INTO Dogs (owner_id, name, size) VALUES ((SELECT user_id FROM Users WHERE Users.username = 'alice123'), 'Snuggle Buns Lovey Dove', 'large');

INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status) VALUES ((SELECT dog_id FROM Dogs WHERE Dogs.name = 'Max'), '2025-06-10 08:00:00', 30, 'Parklands', 'completed');
INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status) VALUES ((SELECT dog_id FROM Dogs WHERE Dogs.name = 'Bella'), '2025-06-10 09:30:00', 45, 'Beachside Ave', 'accepted');
INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status) VALUES ((SELECT dog_id FROM Dogs WHERE Dogs.name = 'Madi'), '2025-06-10 08:00:00', 30, 'Thorndon Park', 'completed');
INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location) VALUES ((SELECT dog_id FROM Dogs WHERE Dogs.name = 'Pumpkin'), '2025-06-10 08:00:00', 30, 'Bowser''s Castle');
INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location) VALUES ((SELECT dog_id FROM Dogs WHERE Dogs.name = 'Snuggle Buns Lovey Dove'), '2025-06-10 08:00:00', 30, 'Narnia');

INSERT INTO WalkRatings (request_id, walker_id, owner_id, rating, comments) VALUES (1, 2, 1, 5, '');
INSERT INTO WalkRatings (request_id, walker_id, owner_id, rating, comments) VALUES (3, 2, 1, 3, '');

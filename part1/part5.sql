INSERT INTO Users () VALUES ('alice123', 'alice@example.com', 'hashed123', 'owner');
INSERT INTO Users VALUES ('bobwalker', 'bob@example.com', 'hashed456', 'walker');
INSERT INTO Users VALUES ('carol123', 'carol@example.com', 'hashed789', 'owner');
INSERT INTO Users VALUES ('glizzy-g', 'gliccy.g@example.com', 'hashed50', 'owner');
INSERT INTO Users VALUES ('busy-g', 'busy.g@example.com', 'hashed150', 'walker');

INSERT INTO Dogs VALUES ((SELECT user_id FROM Users WHERE Users.username = 'alice123'), 'Max', 'medium');
INSERT INTO Dogs VALUES ((SELECT user_id FROM Users WHERE Users.username = 'carol123'), 'Bella', 'small');
INSERT INTO Dogs VALUES ((SELECT user_id FROM Users WHERE Users.username = 'carol123'), 'Madi', 'medium');
INSERT INTO Dogs VALUES ((SELECT user_id FROM Users WHERE Users.username = 'glizzy-g'), 'Pumpkin', 'medium');
INSERT INTO Dogs VALUES ((SELECT user_id FROM Users WHERE Users.username = 'alice123'), 'Snuggle Buns Lovey Dove', 'large');

INSERT INTO WalkRequests VALUES ((SELECT dog_id FROM Dogs WHERE Dogs.name = 'Max'), '2025-06-10 08:00:00', 30, 'Parklands');
INSERT INTO WalkRequests VALUES ((SELECT dog_id FROM Dogs WHERE Dogs.name = 'Bella'), '2025-06-10 09:30:00', 45, 'Beachside Ave');
INSERT INTO WalkRequests VALUES ((SELECT dog_id FROM Dogs WHERE Dogs.name = 'Madi'), '2025-06-10 08:00:00', 30, 'Thorndon Park');
INSERT INTO WalkRequests VALUES ((SELECT dog_id FROM Dogs WHERE Dogs.name = 'Pumpkin'), '2025-06-10 08:00:00', 30, 'Bowser''s Castle');
INSERT INTO WalkRequests VALUES ((SELECT dog_id FROM Dogs WHERE Dogs.name = 'Snuggle Buns Lovey Dove'), '2025-06-10 08:00:00', 30, 'Narnia');

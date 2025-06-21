INSERT INTO Users VALUES ('alice123', 'alice@example.com', 'hashed123', 'owner')
INSERT INTO Users VALUES ('bobwalker', 'bob@example.com', 'hashed456', 'walker')
INSERT INTO Users VALUES ('carol123', 'carol@example.com', 'hashed789', 'owner')
INSERT INTO Users VALUES ('glizzy-g', 'gliccy.g@example.com', 'hashed50', 'owner')
INSERT INTO Users VALUES ('busy-g', 'busy.g@example.com', 'hashed150', 'walker')

INSERT INTO Dogs VALUES (SELECT user_id FROM Users WHERE Users.username = 'alice123')
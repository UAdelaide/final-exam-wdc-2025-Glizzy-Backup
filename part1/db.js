var mysql = require('mysql2/promise');
var fs = require('fs');

let db;

(async () => {
  try {
    // Connect to MySQL without specifying a database
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '' // Set your MySQL root password
    });

    // Create the database if it doesn't exist
    await connection.query('CREATE DATABASE IF NOT EXISTS DogWalkService');
    await connection.end();

    // Now connect to the created database
    db = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'DogWalkService'
    });

    // Insert dogwalks.sql data. Note that this will reset the database every time
    // (suitable as this is for testing purposes)
    await db.execute(
        fs.readFileSync('./dogwalks.sql', 'utf-8')
    );

    // Insert test data
    await db.execute(
        fs.readFileSync('./part5.sql', 'utf-8')
    );
  } catch (err) {
    console.error('Error setting up database. Ensure Mysql is running: service mysql start', err);
  }
})();

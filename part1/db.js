var mysql = require('mysql2/promise');
var fs = require('fs');

let pool;

(async () => {
  try {
    // Connect to MySQL without specifying a database
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '' // Set your MySQL root password
    });

    // Create dogwalks.sql db. Note that this will reset the database every time
    // (suitable as this is for testing purposes)
    await connection.query(fs.readFileSync('./dogwalks.sql', 'utf-8').split('/n'));
    await connection.end();

    // Now connect to the created database
    pool = await mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'DogWalkService',
      connectionLimit: 10
    });

    let db = await pool.getConnection();

    // Insert test data
    await db.execute(
        fs.readFileSync('./part5.sql', 'utf-8').split('/n')
    );
  } catch (err) {
    console.error('Error setting up database. Ensure Mysql is running: service mysql start', err);
  }
})();

module.exports = pool;
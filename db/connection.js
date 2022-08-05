const mysql = require("mysql2/promise");

exports.dbQuery = async (query, data) => {
  try {
    // Create Connection
    const db = await mysql.createConnection({
      host: process.env.DB_HOST, //Hostname of the database you are connecting to.
      user: process.env.DB_USER, //MySQL user to authenticate as
      password: process.env.DB_PASS, //MySQL user password
      database: process.env.DB_NAME, //Name of the database to use for this connection.
    });

    const [rows] = await db.execute(query, data);
    return rows;
  } catch (err) {
    throw new Error(err);
  }
};

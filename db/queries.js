exports.queryList = {
  // Flight Queries
  insertFlightQuery: `INSERT INTO flight(source, destination, date) VALUES (? ,? ,? )`,

  updateFlightQuery: `UPDATE flight SET source= ?, destination= ?, date= ? WHERE f_id = ?`,

  deleteFlightQuery: `DELETE FROM flight WHERE f_id = ? `,

  createFlightTable: `CREATE TABLE flight(
                        f_id int AUTO_INCREMENT,
                        source VARCHAR(255),
                        destination VARCHAR(255),
                        date VARCHAR(255),
                        PRIMARY KEY (f_id) )`,

  // Traveller Queries
  getTravellerByEmailQuery: `SELECT t_id, email, password FROM traveller WHERE email = ?`,

  insertTravellerQuery: `INSERT INTO traveller(name, email, phone_number, password) VALUES (? ,? , ?, ?)`,

  createTravellerTable: `CREATE TABLE traveller(
                            t_id int AUTO_INCREMENT,
                            name VARCHAR(255),
                            email VARCHAR(255),
                            phone_number VARCHAR(255),
                            password VARCHAR(255),
                            PRIMARY KEY (t_id) )`,

  // Register Queries
  createRegisterTable: `CREATE TABLE register (
                          f_id int ,
                          t_id int,
                          FOREIGN KEY (f_id) REFERENCES flight (f_id) ON DELETE RESTRICT ON UPDATE CASCADE,
                          FOREIGN KEY (t_id) REFERENCES traveller (t_id) ON DELETE RESTRICT ON UPDATE CASCADE,
                          PRIMARY KEY (f_id, t_id))`,

  insertResgisterQuery: `INSERT INTO register(f_id, t_id) VALUES (?, ?)`,
  deleteRegisterQuery: `DELETE FROM register WHERE register.f_id = ? `,
  getTravellerRegistrations: ` SELECT flight.f_id, flight.source, flight.destination, flight.date FROM flight
                                INNER JOIN register
                                WHERE register.t_id = ? AND register.f_id = flight.f_id;`,

  // ON DELETE RESTRICT means you can't delete the parent row if a child row exists
  // ON UPDATE CASCADE means that if the parent primary key is changed, the child value will also change to reflect that.
};

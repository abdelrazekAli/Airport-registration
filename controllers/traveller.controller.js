const bcrypt = require("bcrypt");
const { queryList } = require("../db/queries");
const { dbQuery } = require("../db/connection");

// Insert new traveller controller
exports.insertTraveller = async (req, res) => {
  try {
    let { name, email, phone_number, password } = req.body;
    let { insertTravellerQuery, getTravellerByEmailQuery } = queryList;

    // Check Traveller Email
    let result = await dbQuery(getTravellerByEmailQuery, [email]);
    if (result.length != 0) {
      return res.status(409).send(`email : ${email} is already used`);
    }

    // Hash password
    let hashedPassword = await bcrypt.hash(password, 10);

    let data = [name, email, phone_number, hashedPassword];
    await dbQuery(insertTravellerQuery, data);

    return res.status(200).send("User inserted successfully");
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: "Faild to insert traveller" });
  }
};

// traveller login controller
exports.travellerLogin = async (req, res) => {
  try {
    let { email, password } = req.body;

    // Check email
    let { getTravellerByEmailQuery } = queryList;

    // Check Traveller Email
    let traveller = await dbQuery(getTravellerByEmailQuery, [email]);

    if (traveller.length == 0) {
      return res.status(400).send("There is no traveller with this email");
    }

    // Check password
    let passwordCheck = await bcrypt.compare(password, traveller[0].password);
    if (!passwordCheck) return res.status(400).send(`Invalid password`);

    return res.status(200).send({ travellerID: traveller[0].t_id });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: "Faild to login" });
  }
};

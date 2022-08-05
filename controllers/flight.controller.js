const { queryList } = require("../db/queries");
const { dbQuery } = require("../db/connection");

// Get flights controller
exports.getFlights = async (req, res) => {
  try {
    let { travellerID } = req.params;
    let { getTravellerRegistrations } = queryList;
    let result = await dbQuery(getTravellerRegistrations, [travellerID]);
    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: "Faild to get flights" });
  }
};

// Insert new flight controller
exports.insertFlight = async (req, res) => {
  try {
    let { source, destination, date, travellerID } = req.body;
    let flightData = [source, destination, date];
    let { insertFlightQuery, insertResgisterQuery } = queryList;

    // Insert Flight
    const flight = await dbQuery(insertFlightQuery, flightData);
    let flightID = flight.insertId;

    // Insert Register
    let registerData = [flightID, travellerID];
    await dbQuery(insertResgisterQuery, registerData);

    return res.status(200).send("Flight inserted successfully");
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: "Faild to insert flight" });
  }
};

// update flight controller
exports.updateFlight = async (req, res) => {
  try {
    let flightID = req.params.id;
    let { source, destination, date } = req.body;
    let data = [source, destination, date, flightID];
    let { updateFlightQuery } = queryList;

    await dbQuery(updateFlightQuery, data);

    return res.status(200).send("Flight updated successfully");
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: "Faild to update flight" });
  }
};

// delete flight controller
exports.deleteFlight = async (req, res) => {
  try {
    let flightID = req.params.id;
    let { deleteRegisterQuery, deleteFlightQuery } = queryList;

    // Delete Register
    await dbQuery(deleteRegisterQuery, [flightID]);

    // Delete Flight
    await dbQuery(deleteFlightQuery, [flightID]);

    return res
      .status(200)
      .send(`Flight with id ${flightID} deleted successfully`);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: "Faild to delete flight" });
  }
};

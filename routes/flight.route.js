const router = require("express").Router();

// Import Flight Controllers
const {
  getFlights,
  insertFlight,
  updateFlight,
  deleteFlight,
} = require("../controllers/flight.controller");

// Flight Routers
router.get("/:travellerID", getFlights);
router.post("/", insertFlight);
router.put("/:id", updateFlight);
router.delete("/:id", deleteFlight);

module.exports = router;

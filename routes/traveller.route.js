const router = require("express").Router();

// Import Traveller Controllers
const {
  insertTraveller,
  travellerLogin,
} = require("../controllers/traveller.controller");

// Traveller Routers
router.post("/signup", insertTraveller);
router.post("/login", travellerLogin);

module.exports = router;

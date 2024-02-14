const express = require("express");
const {
  getSeats,
  assignSeat,
  deleteSeat,
  countSeat,
} = require("../controller/seatController");
const router = express.Router();

router.get("/getseats/:id", getSeats);
router.get("/countseat/:id", countSeat);
router.post("/assignseat", assignSeat);

router.delete("/deleteseat", deleteSeat);

module.exports = router;

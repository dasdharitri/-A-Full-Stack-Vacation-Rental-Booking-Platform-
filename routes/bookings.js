const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");

// create booking
router.post("/book/:id", async (req, res) => {

  const { checkIn, checkOut, guests } = req.body;

  const booking = new Booking({
    listing: req.params.id,
    user: req.user._id,
    checkIn,
    checkOut,
    guests
  });

  await booking.save();

  res.redirect("/bookings");
});

module.exports = router;

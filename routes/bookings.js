const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");

// Show Payment Page
router.post("/book/:id", (req, res) => {

  if(!req.user){
    req.flash("error","You must be logged in to book");
    return res.redirect("/login");
  }

  const { checkIn, checkOut, guests } = req.body;

  // store booking data temporarily in session
  req.session.bookingData = {
    listing: req.params.id,
    user: req.user._id,
    checkIn,
    checkOut,
    guests
  };

  res.redirect("/payment");
});


// Payment Page
router.get("/payment",(req,res)=>{
  res.render("payment");
});




// After clicking Pay Now
router.post("/payment", async (req,res)=>{
  
   console.log("PAYMENT ROUTE HIT");

  const data = req.session.bookingData;
  // check if data exists
  if (!data) {
    req.flash("error", "Session expired");
    return res.redirect("/listings");
  }

  const booking = new Booking({
    listing: data.listing,
    user: data.user,
    checkIn: data.checkIn,
    checkOut: data.checkOut,
    guests: data.guests
  });

  await booking.save();

  req.session.bookingData = null; // clear session

  req.flash("success","Payment Successful & Booking Confirmed!");

  res.redirect("/success");
});


// Success Page
router.get("/success",(req,res)=>{
  res.render("success");
});

module.exports = router;


//Here i can add something 04/04/26

router.get("/owner/bookings", async (req, res) => {

  if (!req.user) {
    req.flash("error", "Please login first");
    return res.redirect("/login");
  }

  const bookings = await Booking.find()
    .populate("listing")
    .populate("user");

  const ownerBookings = bookings.filter(b =>
    b.listing.owner.equals(req.user._id)
  );

  res.render("bookings/ownerBookings", { bookings: ownerBookings });
});

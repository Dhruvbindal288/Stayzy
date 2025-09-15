
import express from "express";
import { protectRoute } from '../middlewares/auth.middleware.js';
import {
  createBooking,
  getUserBookings,
  getListingBookings,
} from "../controllers/booking.controller.js";

const router = express.Router();


router.post("/:listingId", protectRoute, createBooking);


router.get("/my-bookings", protectRoute, getUserBookings);


router.get("/listing/:listingId", getListingBookings);

export default router;

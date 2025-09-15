import express from 'express';
const router=express.Router();
import { allListings, createListing,listingDetails } from '../controllers/listing.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';


router.post('/create-listing',protectRoute,createListing);
router.get('/all-listings',allListings)
router.get('/:id',protectRoute,listingDetails)

export default router;
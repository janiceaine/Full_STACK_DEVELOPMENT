const authController =require('../controllers/authentication');
const express = require('express'); // Express app
const router = express.Router(); // Router logic
const jwt = require('express-jwt'); // JWT for authentication
const auth = jwt({ // Authentication middleware
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
});

// This is where we import the controllers we will route
const tripsController = require('../controllers/trips');

// Define route for our trips endpoint
router
    .route('/trips')
    .get(tripsController.tripsList) // GET Method routes tripList
    .post(auth, tripsController.tripsAddTrip); // POST Method routes tripsCreate

router
    .route('trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(auth, tripsController.tripsUpdateTrip);
    
//GET Method routes tripsFindByCode - requires parameter
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode);

router
    .route('/login')
    .post(authController.login);

router
    .route('/register')
    .post(authController.register);

module.exports = router;
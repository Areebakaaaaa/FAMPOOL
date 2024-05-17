var express = require('express');
var router = express.Router();
const {addRide, bookRide, getAvailableRide, getBookedRide, updateRideStatus, getDemoLocation} = require('../controllers/rideController');


router.post('/post-ride', async (req, res) => {
    console.log('Backend Post Ride Entered.');
    const postRideDetailsTwo = req.body;
    //console.log("WayPoints: =>> ", postRideDetailsTwo.waypoints);
    console.log("Booked Seats: =>> ", postRideDetailsTwo.bookedSeats);
  
    try {
      const result = await addRide(postRideDetailsTwo);
  
      if(result)
      {
        res.status(200).send({ message: 'Ride posted successfully' });
      } else{
        res.status(200).send({ message: 'Ride posted unsuccessfully' });
      }
      
    } catch (error) {
      console.error('Error posting ride:', error);
      res.status(500).send({ error: 'Failed to post ride due to an internal error.' });
    } 

  });
  
  router.post('/book-ride', async (req, res) => {
    console.log('Backend Book ride entered.');
    const bookRideDetails = req.body;
    console.log(bookRideDetails);
    console.log("Fare ========>>>> ",bookRideDetails.fare);
  
    try{
      const result = await bookRide(bookRideDetails);
      if(result){
        res.status(200).send({message: 'Ride booked successfully.'});
      }else{
        res.status(200).send({message: 'Ride booked unsuccessful.'});
      }
    }catch(err){
      console.error("ERROR booking ride ",err);
      res.status(500).send({error: 'Failed to book ride due to an error.'});
    }
  
  });
 

  router.post('/update-rideStatus', async (req, res) => {
    const rideStatusDetails = req.body;
    console.log("Received data:", rideStatusDetails);
    
    try {
        const result = await updateRideStatus(rideStatusDetails);
        if (result) {
            res.status(200).send({ message: 'Ride Status Updated successfully.' });
        } else {
            res.status(200).send({ message: 'Ride Status Update unsuccessful.' });
        }
    } catch (err) {
        res.status(500).send({ error: 'Failed to update ride status due to an error.' });
    }
});


  router.get('/available-rides', getAvailableRide);
  router.get('/demo-location', getDemoLocation);
  router.get('/booked-rides', getBookedRide);
  
  module.exports = router;

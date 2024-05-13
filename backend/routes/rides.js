var express = require('express');
var router = express.Router();
const {addRide, bookRide, getAvailableRide, getDemoLocation} = require('../controllers/rideController');


router.post('/post-ride', async (req, res) => {
    console.log('Backend Post Ride Entered.');
    const postRideDetails = req.body;
    //getAvailableRide();
  
    try {
      const result = await addRide(postRideDetails);
  
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
    //console.log(bookRideDetails.aaa);
  
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
  
  router.get('/available-rides', getAvailableRide);
  router.get('/demo-location', getDemoLocation);
  
  module.exports = router;

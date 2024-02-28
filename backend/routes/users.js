var express = require('express');
var router = express.Router();
const {addUser, verifyUser, addRide} = require('../controllers/userController');

router.post('/get-user', async (req, res, next) => {
  console.log("Get user.");
  let loginDetails = req.body;
  
  try{
    const result = await verifyUser(loginDetails);
    if(result){
      res.status(200).send(true);
    } else{
      res.status(200).send(false);
    }
    
  }catch(err)
  {
    console.error(err);
    res.status(500).send("Server Error.");
  }
  
});

router.post('/add-user', (req, res, next) => {
  
  let userDetails = req.body;
  console.log('HELLO')
  addUser(userDetails);
  
  res.send('added');
});

router.post('/post-ride', async (req, res) => {
  console.log('Backend Post Ride Entered.');
  const postRideDetails = req.body;

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

module.exports = router;



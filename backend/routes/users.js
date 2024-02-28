var express = require('express');
var router = express.Router();
const {addUser, verifyUser} = require('../controllers/userController');

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
  addUser(userDetails);
  
  res.send('added');
});

router.post('/post-ride', (req, res, next)=>{
  console.log("Backend Post Ride Entered.");
  let postRideDetails= req.body;
  addRide(postRideDetails);

  res.send('Added');
})

module.exports = router;



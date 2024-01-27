var express = require('express');
var router = express.Router();
const addUser = require('../controllers/userController')

/* GET users listing. */
router.get('/get-user', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/add-user', (req, res, next) => {
  let userDetails = req.body;
  addUser(userDetails);
  
  res.send('hello')
})

module.exports = router;



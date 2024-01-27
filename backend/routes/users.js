var express = require('express');
var router = express.Router();
const addUser = require('../controllers/userController')

/* GET users listing. */
router.get('/get-user', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/add-user', (req, res, next) => {
  addUser(req.body);
  
  res.send('hello')
})

module.exports = router;



const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('This API is working correctly!');
});

router.get("/test", function( req, res, nex) {
  res.send( "You're at the test directory");
} );

module.exports = router;

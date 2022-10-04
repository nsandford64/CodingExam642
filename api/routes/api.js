//Copyright 2022 under MIT License
const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send( req )
});

router.post('/test', (req, res) => {
  res.send({
    answer: `You requested: ${req.body.answer}`
  })
});

module.exports = router;

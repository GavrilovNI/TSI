const express = require('express');
const router = express.Router();

const utils = require('./utils');

router.get('/', (req, res) => {
  res.render("index.hbs" );
})


module.exports = router;

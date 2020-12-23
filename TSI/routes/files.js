const express = require('express');
const router = express.Router();

const utils = require('./utils');


router.get('/:filename', (req, res)=>{
    res.sendFile(utils.uploadsDir + req.params["filename"]);
})


module.exports = router;

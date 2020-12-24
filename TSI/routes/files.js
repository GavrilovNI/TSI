const express = require('express');
const router = express.Router();

const fs = require('fs');

const utils = require('./utils');


router.get('/:filename', (req, res)=>{

    const filename = req.params["filename"];
    if(!utils.HasFile(filename))
    {
        res.render("error");
        return;
    }

    res.sendFile(utils.uploadsDir + filename);
})

router.get('/', (req, res)=>{



    fs.readdir(utils.uploadsDir, function (err, files) {

        console.log(files);
        res.render("files", {
            filesVisible : files.length>0,
            files:files
        });
    });

})


module.exports = router;

const express = require('express');
const router = express.Router();

const utils = require('./utils');
const fs = require('fs');


router.get('/', (req, res) => {

    res.render('upload.hbs');
})

router.post('/', (req, res)=>{

    if(req.files && req.files.file)
    {
        var file = req.files.file;
        var filename = file.name;

        const path = utils.uploadsDir+filename;

        if(fs.existsSync(path))
        {
            res.send("<script> alert('file already exists, change name of it!'); window.location.href = '/upload/';  </script>");
        }
        else
        {

            file.mv(path, (err) => {
                if(err)
                {
                    console.error(err);
                    res.render("error", {error :"error on uploading file"});
                }
                else
                {
                    res.send("<script> alert('file uploaded!'); window.location.href = '/upload/';  </script>");
                }
            });
        }
    }
    else
    {
        res.send("<script> alert('file not given!'); window.location.href = '/upload/';  </script>");
    }
})


module.exports = router;

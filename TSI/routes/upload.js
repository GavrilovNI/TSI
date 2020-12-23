const express = require('express');
const router = express.Router();


const utils = require('./utils');
const db = require('./db');

const path = require('path');
const fs = require('fs');




router.get('/', (req, res) => {

    res.render('upload.hbs');

    /*fs.readdir(utils.uploadsDir, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }


        console.log(files.length);
        //listing all files using forEach
        files.forEach(function (file) {
            // Do whatever you want to do with the file
            console.log(file);
        });
    });*/


})

router.post('/', (req, res)=>{

    if(req.files && req.files.file)
    {
        var file = req.files.file;
        var filename = file.name;

        //var fileExtension = utils.fileExtensionStr.exec(filename) || "";

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
                    res.send(err);
                }
                else
                {
                    db.AddFile(filename);
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

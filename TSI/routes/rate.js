const express = require('express');
const router = express.Router();
const db = require('./db');
const utils = require('./utils');
const path = require("path");
const fs = require('fs');



const GetFilesRatesCount = (callback) =>{
    fs.readdir(utils.uploadsDir, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }

        const arr = files.map((file)=>{
            return
        })



        //listing all files using forEach
        files.forEach(function (file) {
            // Do whatever you want to do with the file

            db.GetRatesCount(file, ((count)=>{
                arr.push({file, count});
            }));


        });

        //console.log(arr);
    });
};


router.get('/', (req, res) => {

    res.render("rate3.hbs", {
        filename1: 'a.png',
        filename2: 'asd.png',
        filename3: 'small2.png'
    });
})

router.get('/:filename', (req, res) => {

    const filename = req.params["filename"];
    db.GetRates(filename, (rates) =>{

        const strRates = Array.from(rates, x =>"rate: " + x.rate+", comment: "+(x.comment==""?"not present":"'"+x.comment+"'"));

        res.render("rate.hbs", {
            filename: filename,
            ratesVisible: rates.length>0,
            rates: strRates
        });
    })

})

router.post('/:filename', (req, res) => {

    if(!req.body.rate)
    {
        res.send("<script> alert('bad rate!'); window.location.href = '#';  </script>");
        return;
    }

    const rate = parseInt(req.body.rate)

    if(!rate || rate<0 || rate>5)
    {
        res.send("<script> alert('bad rate2!'); window.location.href = '#';  </script>");
        return;
    }


    const filename = req.params["filename"];
    const comment = req.body.comment;

    db.AddRate(filename, rate, comment);

    res.send("<script> history.go(-2);  </script>");
})


module.exports = router;

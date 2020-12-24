const express = require('express');
const router = express.Router();
const db = require('./db');
const utils = require('./utils');
const path = require("path");
const fs = require('fs');

const Get3RandomFilesWithLessRateCount = (callback)=> {

    db.GetFilesOrderByRatesCount((arr) => {
        fs.readdir(utils.uploadsDir, function (err, files) {


            arr.forEach(element => {
                if (files.includes(element.name)) {
                    const index = files.indexOf(element.name);
                    if (index > -1) {
                        files.splice(index, 1);
                    }
                }
            });

            files.forEach(element => {
                arr.unshift({name: element, count: 0});
            });

            var res = [[], [], []];

            if (arr.length > 0) {

                var i = 0;
                var c = arr[0].count;

                try {
                    arr.forEach(element => {

                        if (element.count != c) {
                            i++;
                            c = element.count;
                        }

                        if(i>=3)
                        {
                            throw BreakException;
                        }
                        else {
                            res[i].push(element.name);
                        }


                    });
                } catch (e) {
                    if (e !== BreakException) throw e;
                }



            }


            let need = 3;
            let currArr = 0;

            let result = [];

            while (need > 0 && currArr < 3) {
                while (res[currArr].length > 0 && need > 0) {
                    const randId = Math.floor(Math.random() * res[currArr].length)
                    result.push(res[currArr][randId]);
                    res[currArr].splice(randId, 1);
                    need = need - 1;
                }
                currArr = currArr + 1;
            }

            callback(result);
        });
    });

};

router.get('/', (req, res) => {
    Get3RandomFilesWithLessRateCount((arr)=>{
        res.render("rate3.hbs", {
            filename1: arr[0],
            filename2: arr[1],
            filename3: arr[2]
        });
    });
})

router.get('/:filename', (req, res) => {

    const filename = req.params["filename"];

    if(!utils.HasFile(filename))
    {
        res.render("error");
        return;
    }

    db.GetRates(filename, (rates) =>{

        res.render("rate.hbs", {
            filename: filename,
            ratesVisible: rates.length>0,
            rates: rates
        });
    })

})

router.post('/:filename', (req, res) => {

    const filename = req.params["filename"];

    if(!utils.HasFile(filename))
    {
        res.render("error");
        return;
    }

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



    const comment = req.body.comment;

    db.AddRate(filename, rate, comment);

    res.send("<script> history.go(-2);  </script>");
})


module.exports = router;

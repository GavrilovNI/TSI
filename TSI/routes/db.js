//const express = require('express');
//const router = express.Router();


const utils = require('./utils');


const sqlite3 = require('sqlite3').verbose();
//const db = new sqlite3.Database(':memory:');


var db = new sqlite3.Database(utils.ratesDBPath);


db.serialize(function() {

    db.run('CREATE TABLE IF NOT EXISTS rates (name TEXT NOT NULL, rate INT NOT NULL, comment TEXT);');
    db.run('CREATE TABLE IF NOT EXISTS files (name TEXT NOT NULL , rateCount INT NOT NULL);');

    /*var stmt = db.prepare('INSERT INTO rates VALUES (?,?)');

    for (var i = 0; i < 10; i++) {
        stmt.run('Ipsum ' + i, i);
    }

    stmt.finalize();

    /*db.each('SELECT * FROM rates', function(err, row) {
        console.log(row);
    });*/

    /*var stmt = db.prepare('INSERT INTO lorem VALUES (?)');

    for (var i = 0; i < 10; i++) {
         stmt.run('Ipsum ' + i);
     }

    stmt.finalize();

    db.each('SELECT rowid AS id, info FROM lorem', function(err, row) {
        console.log(row.id + ': ' + row.info);
    });*/

    db.each('SELECT * FROM rates', function(err, row) {
        console.log(row);
    });

    db.each('SELECT * FROM files', function(err, row) {
        console.log(row);
    });
});

/*db.serialize(function() {

    db.all("SELECT * FROM rates", function(err, allRows) {

        allRows.forEach(element => console.log(element));

    });

    db.all("SELECT COUNT(*) FROM rates", function(err, allRows) {

        console.log(allRows[0]['COUNT(*)']);

    });
});*/


db.close();



/*var GetCount = function(callback)
{
    const db = new sqlite3.Database(utils.ratesDBPath);

    db.serialize(function() {
        db.all("SELECT COUNT(*) FROM rates", (err, allRows) => {

            if(!err)
            {
                callback(allRows[0]['COUNT(*)']);
            }

        });
    });

    db.close();
}*/

AddFile = (name) => {
    const db = new sqlite3.Database(utils.ratesDBPath);

    const stmt = db.prepare('INSERT INTO files VALUES (?,?)');

    stmt.run(name, 0);

    stmt.finalize();

    console.log("added ("+name+")");

    db.close();
}

AddRate = (name, rate, comment) => {
    const db = new sqlite3.Database(utils.ratesDBPath);

    const stmt = db.prepare('INSERT INTO rates VALUES (?,?,?)');

    stmt.run(name, rate, comment);

    stmt.finalize();

    console.log("added ("+name+", "+rate+", '"+comment+"')");

    db.close();
};

GetRates = (name, callback) => {
    const db = new sqlite3.Database(utils.ratesDBPath);

    db.serialize(function() {
        db.all("SELECT rate, comment FROM rates WHERE name='"+name+"'", (err, allRows) => {

            if(!err)
            {
                callback(allRows);
            }

        });
    });

    db.close();
};

GetLessCommentedFiles = (callback) => {
    const db = new sqlite3.Database(utils.ratesDBPath);

    db.serialize(function() {
        db.all("SELECT rate, comment FROM rates ORDER BY ", (err, allRows) => {

            if(!err)
            {
                callback(allRows);
            }

        });
    });

    db.close();
};





module.exports = {
    db,
    AddFile,
    AddRate,
    GetRates
//GetCount
};

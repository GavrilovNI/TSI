const utils = require('./utils');
const sqlite3 = require('sqlite3').verbose();

const CreateDbsIfNeeded = ()=>{

    const db = new sqlite3.Database(utils.ratesDBPath);

    db.serialize(function() {

        db.run('CREATE TABLE IF NOT EXISTS rates (name TEXT NOT NULL, rate INT NOT NULL, comment TEXT);');

        /*db.each('SELECT * FROM rates', function(err, row) {
            console.log(row);
        });*/
    });

    db.close();
};
CreateDbsIfNeeded();

const AddRate = async (name, rate, comment) => {
    const db = new sqlite3.Database(utils.ratesDBPath);

    const stmt = db.prepare('INSERT INTO rates VALUES (?,?,?)');

    stmt.run(name, rate, comment);

    stmt.finalize();

    console.log("added ("+name+", "+rate+", '"+comment+"')");

    db.close();
};

const GetRates = async (name, callback) => {
    const db = new sqlite3.Database(utils.ratesDBPath);

    await db.serialize(function() {
        db.all("SELECT rate, comment FROM rates WHERE name='"+name+"'", (err, allRows) => {

            if(!err)
            {
                callback(allRows);
            }

        });
    });

    db.close();
};

const GetFilesOrderByRatesCount = async (callback) => {
    const db = new sqlite3.Database(utils.ratesDBPath);

    db.serialize(function() {
        db.all("SELECT name, COUNT(*) as count FROM rates GROUP BY name ORDER BY count", (err, allRows) => {

            if(!err)
            {
                callback(allRows);
            }

        });
    });

    db.close();
}


module.exports = {
    AddRate,
    GetRates,
    GetFilesOrderByRatesCount
};

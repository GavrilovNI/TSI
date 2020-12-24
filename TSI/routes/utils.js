const path = require("path");
const fs = require('fs');

const uploadsDir = path.join(__dirname, '..', 'uploads/');
const viewsDir = path.join(__dirname, '..', 'routes/');
const ratesDBPath = path.join(__dirname, '..', 'rates.db');

const HasFile = (name)=>{
    return fs.existsSync(uploadsDir+name);
}


module.exports = {
    uploadsDir,
    ratesDBPath,
    viewsDir,
    HasFile
};

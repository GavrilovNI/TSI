//const express = require('express');
//const router = express.Router();

const path = require("path");
const fs = require('fs');

const uploadsDir = path.join(__dirname, '..', 'uploads/');
const ratesDBPath = path.join(__dirname, '..', 'rates.db');

//const fileExtensionStr = /(?:\.([^.]+))?$/;


const HasFile = (name)=>{
    return fs.existsSync(uploadsDir+name);
}


module.exports = {
    uploadsDir,
    ratesDBPath,
    //fileExtensionStr,
    HasFile
};

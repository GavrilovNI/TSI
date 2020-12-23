//const express = require('express');
//const router = express.Router();

const path = require("path");

const uploadsDir = path.join(__dirname, '..', 'uploads/');
const ratesDBPath = path.join(__dirname, '..', 'rates.db');

var fileExtensionStr = /(?:\.([^.]+))?$/;


module.exports = {
    uploadsDir,
    ratesDBPath,
    fileExtensionStr
};

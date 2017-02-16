var express = require("express");
// Routes principales
module.exports = function(app) {
    console.log(__dirname);
    app.get('/', function (req, res) {
        // Homepage
    	var path = require("path"),
        fs = require("fs");
        res.sendFile(path.join(__dirname, '../', 'views/login.html'));
    });
}
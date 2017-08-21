/**
 * Created by ChangLiu on 8/4/17.
 */
//using express with node js
var express = require('express');
//initialize app as an express application
var app = express();

var restRouter = require('./routes/rest');
var redirectRouter = require('./routes/redirect');
var indexRouter = require('./routes/index');

var mongoose = require('mongoose');
mongoose.connect("mongodb://user:123456@ds011745.mlab.com:11745/tinyurl");

app.use("/public", express.static(__dirname + "/public"));

app.use("/api/v1", restRouter);

app.use("/", indexRouter);

app.use("/:shortUrl", redirectRouter);



app.listen(3000);
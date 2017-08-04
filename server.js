/**
 * Created by ChangLiu on 8/4/17.
 */
//using express with node js
var express = require('express');
//initialize app as an express application
var app = express();

var restRouter = require('./routes/rest');
var redirectRouter = require('./routes/redirect');
// var indexRouter = require('./routes/index');

app.use("/api/v1", restRouter);
app.use("/:shortUrl", redirectRouter);
// app.use("/", indexRouter);

app.listen(3000);
/**
 * Created by ChangLiu on 8/25/17.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var RequestSchema = new Schema({
    shortUrl : String,
    referer : String,
    platform : String,
    browser : String,
    country : String,
    timestamp : Date
});

var RequestSchema = mongoose.model("RequestSchema", RequestSchema);

module.exports = RequestSchema;
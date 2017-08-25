/**
 * Created by ChangLiu on 8/4/17.
 */
var UrlModel = require("../models/urlModel");
var redis = require("redis");

var host = process.env.REDIS_PORT_6379_TCP_ADDR;
var port = process.env.REDIS_PORT_6379_TCP_PORT;

var redisClient = redis.createClient(port, host);

var encode = [];

var generateCharArray = function (charA, charZ) {
    var arr = [];
    var i = charA.charCodeAt(0);
    var j = charZ.charCodeAt(0);
    for (; i <= j; i++) {
        arr.push(String.fromCharCode(i));
    }
    return arr;
};

encode = encode.concat(generateCharArray('a', 'z'));
encode = encode.concat(generateCharArray('A', 'Z'));
encode = encode.concat(generateCharArray('0', '9'));

var getShortUrl = function (longUrl, callback) {

    // To make a real URL for redirect
    if (longUrl.indexOf('http') === -1) {
        longUrl = "http://" + longUrl;
    }

    // Get from cache before get from db
    redisClient.get(longUrl, function (err, shortUrl) {
        if (shortUrl) {
            console.log("byebye Mongod");
            callback({
                shortUrl : shortUrl,
                longUrl : longUrl
            });
        } else {
            // If cache doesn't have, get from db, and save to cache

            UrlModel.findOne({ longUrl: longUrl }, function (err, data) {
                if (data) {
                    callback(data);
                    redisClient.set(data.shortUrl, data.longUrl);
                    redisClient.set(data.longUrl, data.shortUrl);
                } else {
                    generateShortUrl(function (shortUrl) {
                        var url = new UrlModel({
                            shortUrl : shortUrl,
                            longUrl : longUrl
                        });
                        url.save();
                        callback(url);
                        redisClient.set(url.shortUrl, url.longUrl);
                        redisClient.set(url.longUrl, url.shortUrl);
                    });
                }
            });
        }
    });




};

var generateShortUrl = function (callback) {
    UrlModel.count({}, function (err, num) {
        callback(convertTo62(num));
    });
};

var convertTo62 = function (num) {
    var result = "";
    do {
        result = encode[num % 62] + result;
        num = Math.floor(num / 62);
    } while (num);
    return result;
};

var getLongUrl = function (shortUrl, callback) {
    redisClient.get(shortUrl, function (err, longUrl) {
        if (longUrl) {
            console.log("byebye Mongod");
            callback({
                shortUrl : shortUrl,
                longUrl : longUrl
            });
        } else {
            UrlModel.findOne({ shortUrl: shortUrl }, function (err, data) {
                callback(data);
                redisClient.set(data.shortUrl, data.longUrl);
                redisClient.set(data.longUrl, data.shortUrl);
            });
        }
    });



};

module.exports = {
    getShortUrl: getShortUrl,
    getLongUrl: getLongUrl
};
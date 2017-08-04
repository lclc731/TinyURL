/**
 * Created by ChangLiu on 8/4/17.
 */
var express = require('express');
var router = express.Router();
var urlService = require('../services/urlService');
// var path = require('path');

router.get("*", function (req, res) {
    var shortUrl = req.originalUrl.slice(1);
    var longUrl = urlService.getLongUrl(shortUrl);

    // ** redirect must to a real URL
    if (longUrl) {
        res.redirect(longUrl);
    } else {
        res.send(404);
        // res.sendFile("404.html", { root : path.join(__dirname, '../public/views/')});
    }
});

module.exports = router;
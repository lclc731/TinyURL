/**
 * Created by ChangLiu on 8/4/17.
 */
var longToShortHash = {};
var shortToLongHash = {};

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

var getShortUrl = function (longUrl) {

    // To make a real URL for redirect
    if (longUrl.indexOf('http') === -1) {
        longUrl = "http://" + longUrl;
    }

    if (longToShortHash[longUrl] != null) {
        return longToShortHash[longUrl];
    } else {
        var shortUrl = generateShortUrl();
        longToShortHash[longUrl] = shortUrl;
        shortToLongHash[shortUrl] = longUrl;
        return shortUrl;
    }
};

var generateShortUrl = function () {
    var currentLength = Object.keys(longToShortHash).length;
    return convertTo62(currentLength);
};

var convertTo62 = function (num) {
    var result = "";
    do {
        result = encode[num % 62] + result;
        num = Math.floor(num / 62);
    } while (num);
    return result;
};

var getLongUrl = function (shortUrl) {
    return shortToLongHash[shortUrl];
};

module.exports = {
    getShortUrl: getShortUrl,
    getLongUrl: getLongUrl
};
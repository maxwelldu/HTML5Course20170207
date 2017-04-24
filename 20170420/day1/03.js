var fs = require('fs');
var gm = require('gm');

gm('./danny.jpg')
    .resize(50, 50,"!")
    .write('./danny2.jpg', function (err) {
        if (err) {
            console.log(err);
        }
    });
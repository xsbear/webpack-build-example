require('./config');

require("../css/base.css");
require("../css/page/style.css");
require("../css/style2.css");

require(['./chunk'], function(a){
    a()
});

function loadshare () {
    require.ensure([], function(require) {
        var log = require("./shared");
        log("This is page A...........");
    }, 'shared');
}

document.write(require("./content.js"));

var img1 = document.createElement("img");
img1.src = require("../images/small.png");
document.body.appendChild(img1);

var img2 = document.createElement("img");
img2.src = require("../images/big.png");
document.body.appendChild(img2);

// setTimeout(loadshare, 2000);
document.getElementById('log').addEventListener('click', loadshare, false);

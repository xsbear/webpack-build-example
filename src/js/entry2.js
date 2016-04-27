require('./config');

// require("../css/style.css");

require.ensure(["./shared"], function(shared) {
    shared("This is page B");
}, 'shared');
document.write(require("./content.js"));



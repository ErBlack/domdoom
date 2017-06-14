Cacodemon = require('./modules/Cacodemon.js');
onDomReady = require('./modules/ondomready');

require('./index.css');

onDomReady(function() {
    new Cacodemon(document.querySelector('.cacodemon'));
});

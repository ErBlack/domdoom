const ghpages = require('gh-pages');

ghpages.publish('build', {
    push: false
}, console.error);
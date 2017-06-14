const minimize = process.argv.indexOf('--optimize-minimize') > -1;

module.exports = {
    entry: './index.js',
    output: {
        path: __dirname,
        filename: `bundle${minimize ? '.min' : ''}.js`
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: 'style!css'},
            {test: /\.png/, loader: 'file'}
        ]
    }
};
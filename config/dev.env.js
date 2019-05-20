var merge = require('webpack-merge');
var prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    Avatar_Update_Path: 'http://localhost:8000/avatar'
});

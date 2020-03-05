const users = require('./users');
const products = require('./products');

module.exports = function (app) {
    app.use('/api/users', users);
    app.use('/api/products', products);

};
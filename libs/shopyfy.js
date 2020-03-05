const Shopify = require('shopify-api-node')
const config = require('../config');

class ShopifyClient {
    constructor() {
        this.shopify = new Shopify({
            shopName: config.shopify.shopName,
            apiKey: config.shopify.apiKey,
            password: config.shopify.password
        });
        this.shopify.callLimits = {
            remaining: 30,
            current: 10,
            max: 40
        };
    }
}

module.exports = ShopifyClient;
require('dotenv').config();

const config = {
    dev: process.env.NODE_ENV !== 'production',
    port: process.env.PORT || 3000,
    defaultUserEmail: process.env.DEFAULT_USER_EMAIL,
    defaultUserPassword: process.env.DEFAULT_USER_PASSWORD,
    mongodb: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        dbName: process.env.DB_NAME,
    },
    shopify: {
        shopName: process.env.SHOP_NAME || '',
        apiKey: process.env.SHOP_API_KEY || '',
        password: process.env.SHOP_PASSWORD || '',
    }
}

module.exports = config;
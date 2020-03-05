const express = require('express');
const router = express.Router();
const Products =  require('../services/products');

const Service = new Products();

router.get('/', async function(req, res, next) {
    try {
        const products =  await Service.listProducts();
        res.status(200).json({
            error: false,
            message: 'Products Listed',
            body: products
        });
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async function(req, res, next) {
    try {
        const product =  await Service.getProduct(req.params.id);
        res.status(200).json({
            error: false,
            message: 'Products retrieved',
            body: product
        });
    } catch (error) {
        next(error);
    }
});

router.post('/', async function(req, res, next) {
    try {
        const product = await Service.addProduct(req.body);
        res.status(201).json({
            error: false,
            message: 'Product created',
            body: product
        });
    } catch (error) {
        next(error);
    }
});


module.exports = router;
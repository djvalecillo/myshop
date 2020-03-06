const express = require('express');
const router = express.Router();
const Users = require('../services/users');
const basicAuth = require('../../utils/middlewares/basicAuth');
const service = new Users();

router.use(basicAuth);
router.get('/', async function(req, res, next) {
    try {
        const { query } = req;
        const users = await service.listUsers(query);
        res.status(200).json({
            message: 'Users listed',
            body: users
        });
    } catch (error) {
        next(error);
    }
});


module.exports = router;
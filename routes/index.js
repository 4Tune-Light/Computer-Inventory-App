const express = require('express');
const router = express.Router();

const category = require('./categoriesRoute')
const product = require('./productsRoute')
const user = require('./usersRoute')

router.use('/categories', category)
router.use('/products', product)
router.use('', user)

module.exports = router;
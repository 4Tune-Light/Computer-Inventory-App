const express = require('express');
const router = express.Router();

const category = require('./categoryRoute')
const product = require('./productRoute')
const user = require('./userRoute')

router.use('/category', category)
router.use('/product', product)
router.use('', user)


module.exports = router;
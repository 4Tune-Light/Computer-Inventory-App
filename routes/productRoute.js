const express = require('express');
const router = express.Router();
const jwt = require('../middlewares/jwt');
const limit = require('../middlewares/limitValue');
const productController = require('../controllers/productController');

router.get('', limit.limitValue, productController.getProducts);
router.get('/:id', productController.getProduct);
router.post('', jwt.verifyToken, productController.createProduct);
router.put('/:id', jwt.verifyToken, productController.updateProduct);
router.patch('/:id', jwt.verifyToken, productController.addOrReduceQuantity);
router.delete('/:id', jwt.verifyToken, productController.deleteProduct);


module.exports = router;
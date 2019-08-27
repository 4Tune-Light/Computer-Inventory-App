const express = require('express');
const router = express.Router();
const jwt = require('../middlewares/jwt');
const productController = require('../controllers/productController');

router.get('', productController.getProducts);
router.get('/:id', productController.getProduct);
router.post('', jwt.verifyToken, productController.createProduct);
router.put('/:id', jwt.verifyToken, productController.updateProduct);
router.patch('/:id', jwt.verifyToken, productController.addOrReduceQuantity);
router.delete('/:id', jwt.verifyToken, productController.deleteProduct);


module.exports = router;
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const limit = require('../middlewares/limitValue');
const productController = require('../controllers/productsController');

router.get('', limit.limitValue, productController.getProducts);
router.get('/:id', productController.getProduct);
router.post('', auth.verifyToken, productController.createProduct);
router.put('/:id', auth.verifyToken, productController.updateProduct);
router.patch('/:id', auth.verifyToken, productController.addOrReduceQuantity);
router.delete('/:id', auth.verifyToken, productController.deleteProduct);


module.exports = router;
const express = require('express');
const router = express.Router();
const jwt = require('../middlewares/jwt')
const categoryController = require('../controllers/categoryController');

router.get('', categoryController.getCategories);
router.get('/:id', categoryController.getCategory);
router.post('', jwt.verifyToken, categoryController.createCategory);
router.put('/:id', jwt.verifyToken, categoryController.updateCategory);
router.delete('/:id', jwt.verifyToken, categoryController.deleteCategory);



module.exports = router;
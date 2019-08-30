const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth')
const categoryController = require('../controllers/categoriesController');

router.get('', categoryController.getCategories);
router.get('/:id', categoryController.getCategory);
router.post('', auth.verifyToken, categoryController.createCategory);
router.put('/:id', auth.verifyToken, categoryController.updateCategory);
router.delete('/:id', auth.verifyToken, categoryController.deleteCategory);



module.exports = router;
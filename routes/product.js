const express = require('express');
const router = express.Router();

const productController = require('../controllers/product_controller');

router.post('/new-product',productController.createproduct);

router.get('/all',productController.allproduct);

router.get('/:id',productController.getproduct);

router.post('/:id',productController.updateaProduct);

router.delete('/:id',productController.deleteaProduct);

module.exports = router;
// Created By Eyder Ascuntar Rosales
const express = require('express');
const controller = require('../../controllers/product/productController');

const router = express.Router();

router.post('/', controller.create);
router.get('/name/:name', controller.getProductByName);
router.delete('/name/:name', controller.deleteProduct);
router.put('/', controller.update);
module.exports = router;

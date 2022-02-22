// Created By Yeison Gustavo Niño Murcia
const express = require('express');
const controller = require('../../controllers/unit-measurement/unitController');

const router = express.Router();

router.get('/findAll', controller.findAll);
router.post('/', controller.create);
router.get('/name/:name', controller.getUnitByName);
router.delete('/name/:name', controller.deleteUnit);
router.put('/', controller.update);
module.exports = router;

// Created By Yeison Gustavo Niño Murcia
const express = require('express');
const controller = require('../../controllers/transaction/transactionController');

const router = express.Router();

router.get('/findByUserId/:userId', controller.findByUserId);
router.post('/', controller.create);
module.exports = router;

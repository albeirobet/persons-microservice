// Created By Yeison Gustavo Niño Murcia
const express = require('express');
const controller = require('../../controllers/user/userController');

const router = express.Router();

router.post('/', controller.create);
router.put('/', controller.update);
module.exports = router;

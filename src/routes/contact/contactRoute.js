// Created By Yeison Gustavo Niño Murcia
const express = require('express');
const controller = require('../../controllers/contact/contactController');

const router = express.Router();

router.post('/', controller.create);
module.exports = router;

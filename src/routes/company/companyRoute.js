// Created By Yeison Gustavo Niño Murcia
const express = require('express');
const controller = require('../../controllers/company/companyController');

const router = express.Router();

router.get('/findByCompanyId/:companyId', controller.findByCompanyId);
router.post('/addCompanyMember/', controller.addCompanyMember);
module.exports = router;

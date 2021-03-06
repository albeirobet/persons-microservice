// Created By Eyder Ascuntar Rosales
const express = require('express');
const controller = require('../../controllers/person/personController');

const router = express.Router();

router.post('/', controller.create);
router.get('/phoneNumber/:phoneNumber', controller.getPersonByPhoneNumber);
router.delete('/phoneNumber/:phoneNumber', controller.deletePerson);
router.put('/', controller.update);
module.exports = router;

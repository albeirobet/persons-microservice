// Created By Eyder Ascuntar Rosales
const customValidator = require('../../utils/validators/validator');
const ApiError = require('../../dto/commons/response/apiErrorDTO');
const ServiceException = require('../../utils/errors/serviceException');
const commonErrors = require('../../utils/constants/commonErrors');
const httpCodes = require('../../utils/constants/httpCodes');
const Person = require('../../models/person/personModel');
const mongoose = require('mongoose');

// =========== Function to create a new Person
exports.create = async req => {
  try {
    customValidator.validateNotNullRequest(req);
    customValidator.validateNotNullParameter(
      req.body.documentNumber,
      'documentNumber'
    );
    let person = await Person.findOne({
      phoneNumber: req.body.phoneNumber
    });
    if (!person) {
      person = await Person.create(req.body);
    } else {
      throw new ServiceException(
        commonErrors.EM_COMMON_07,
        new ApiError(
          `${commonErrors.EM_COMMON_07}`,
          `${commonErrors.EM_COMMON_07}`,
          'EM_COMMON_07',
          httpCodes.BAD_REQUEST
        )
      );
    }
    return person;
  } catch (error) {
    throw error;
  }
};

// =========== Function to get a Person
exports.getPersonByPhoneNumber = async (req, res) => {
  customValidator.validateNotNullParameter(
    req.params.phoneNumber,
    'phoneNumber'
  );
  let person = await Person.findOne({
    phoneNumber: req.params.phoneNumber
  });
  if (!person) {
    throw new ServiceException(
      commonErrors.EM_COMMON_15,
      new ApiError(
        `${commonErrors.EM_COMMON_15}`,
        `${commonErrors.EM_COMMON_15}`,
        'EM_COMMON_15',
        httpCodes.BAD_REQUEST
      )
    );
  }
  return person;
};

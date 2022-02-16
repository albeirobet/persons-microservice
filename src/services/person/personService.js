// Created By Eyder Ascuntar Rosales
const customValidator = require('../../utils/validators/validator');
const ApiError = require('../../dto/commons/response/apiErrorDTO');
const ServiceException = require('../../utils/errors/serviceException');
const commonErrors = require('../../utils/constants/commonErrors');
const httpCodes = require('../../utils/constants/httpCodes');
const Person = require('../../models/person/personModel');
const User = require('../../models/user/userModel');
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
      // person = {};
      let user = await User.create({ status: 'Enable' });
      req.body.userId = user._id;
      person = await Person.create(req.body);
      user.personId = person._id;
      user.save();
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

// =========== Function to delete a Person
// =========== Function to get a Person
exports.deletePerson = async (req, res) => {
  customValidator.validateNotNullParameter(
    req.params.phoneNumber,
    'phoneNumber'
  );
  let person = await Person.findOneAndDelete({
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
  return null;
};

// =========== Function to get a Person
exports.getPersonByPhoneNumber = async (req, res) => {
  customValidator.validateNotNullParameter(
    req.params.phoneNumber,
    'phoneNumber'
  );
  let person = await Person.findOne({
    phoneNumber: req.params.phoneNumber
  })
    .populate('userId')
    .lean();
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
// =========== Function to update a Person
exports.updateOne = async req => {
  try {
    customValidator.validateNotNullRequest(req);
    customValidator.validateNotNullParameter(
      req.body.documentNumber,
      'documentNumber'
    );
    let person = await Person.findOne({
      phoneNumber: req.body.phoneNumber
    });
    if (person) {
      person = await Person.updateOne(req.body);
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
    return 'Update Person Succesfully';
  } catch (error) {
    throw error;
  }
};

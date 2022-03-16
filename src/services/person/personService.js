// Created By Eyder Ascuntar Rosales
const customValidator = require('../../utils/validators/validator');
const ApiError = require('../../dto/commons/response/apiErrorDTO');
const ServiceException = require('../../utils/errors/serviceException');
const commonErrors = require('../../utils/constants/commonErrors');
const httpCodes = require('../../utils/constants/httpCodes');
const Person = require('../../models/person/personModel');

// =========== Function to create a new Person
exports.create = async req => {
  try {
    customValidator.validateNotNullRequest(req);
    customValidator.validateNotNullParameter(
      req.body.phoneNumber,
      'phoneNumber'
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

// =========== Function to delete a Person
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

// =========== Function to update a Person
exports.update = async req => {
  try {
    customValidator.validateNotNullRequest(req);
    customValidator.validateNotNullParameter(req.body.documentNumber, 'documentNumber');
    customValidator.validateNotNullParameter(req.body.firstName, 'firstName');
    customValidator.validateNotNullParameter(req.body.lastName, 'lastName');
    let person = await Person.findOne({
      phoneNumber: req.body.phoneNumber
    });
    if (person) {
      req.body.updatedAt = new Date();
      await Person.updateOne({ _id: person._id }, req.body);
    } else {
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
    return 'Update Person Succesfully';
  } catch (error) {
    throw error;
  }
};

// Created By Yeison Gustavo Niño Murcia
const customValidator = require('../../utils/validators/validator');
const ApiError = require('../../dto/commons/response/apiErrorDTO');
const ServiceException = require('../../utils/errors/serviceException');
const commonErrors = require('../../utils/constants/commonErrors');
const httpCodes = require('../../utils/constants/httpCodes');
const Person = require('../../models/person/personModel');
const User = require('../../models/user/userModel');

// =========== Function to create a new User
exports.create = async req => {
  try {
    customValidator.validateNotNullRequest(req);
    customValidator.validateNotNullParameter(
      req.body.documentNumber,
      'documentNumber'
    );
    let person = await Person.findOne({
      phoneNumber: req.body.phoneNumber
    })
      .populate('user')
      .lean();
    let user = undefined;
    // Si no existe como persona se crea usuario y persona
    if (!person) {
      user = await User.create({ status: 'Enable' });
      req.body.user = user._id;
      person = await Person.create(req.body);
      user.person = person._id;
      user.save();
    }
    // Si existe como persona pero no existe usuario asociado 
    else if (!person.user) {
      user = await User.create({ status: 'Enable', person: person });
      person.user = user._id;
      await Person.updateOne({ _id: person._id }, person);
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
    return user;
  } catch (error) {
    throw error;
  }
};

// =========== Function to get a Person
exports.getUserByPhoneNumber = async (req, res) => {
  customValidator.validateNotNullParameter(
    req.params.phoneNumber,
    'phoneNumber'
  );
  let person = await Person.findOne({
    phoneNumber: req.params.phoneNumber
  });
  let user = null;
  if (person && person.user) {
    user = await User.findById(person.user._id)
      .populate('person')
      .populate('contacts')
      .lean();
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
  return user;
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
  })
    .populate('user')
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

// Created By Eyder Ascuntar Rosales
const customValidator = require('../../utils/validators/validator');
const ApiError = require('../../dto/commons/response/apiErrorDTO');
const ServiceException = require('../../utils/errors/serviceException');
const commonErrors = require('../../utils/constants/commonErrors');
const httpCodes = require('../../utils/constants/httpCodes');
const Unit = require('../../models/unit-measurement/unitModel');
const mongoose = require('mongoose');

// =========== Function to findAll unit
exports.findAll = async req => {
  try {
    return await Unit.find();
  } catch (error) {
    throw error;
  }
};

// =========== Function to create a new Unit
exports.create = async req => {
  try {
    customValidator.validateNotNullRequest(req);
    customValidator.validateNotNullParameter(
      req.body.name,
      'name'
    );
    let unit = await Unit.findOne({
      name: req.body.name
    });
    if (!unit) {
      unit = await Unit.create(req.body);
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
    return unit;
  } catch (error) {
    throw error;
  }
};

// =========== Function to delete a Unit
exports.deleteUnit = async (req, res) => {
  customValidator.validateNotNullParameter(
    req.params.name,
    'name'
  );
  let unit = await Unit.findOneAndDelete({
    name: req.params.name
  });
  if (!unit) {
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


// =========== Function to get a Unit
exports.getUnitByName = async (req, res) => {
  customValidator.validateNotNullParameter(
    req.params.name,
    'name'
  );
  let unit = await Unit.findOne({
    name: req.params.name
  });
  if (!unit) {
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
  return unit;
};
// =========== Function to update a Unit
exports.updateOne = async req => {
  try {
    customValidator.validateNotNullRequest(req);
    customValidator.validateNotNullParameter(
      req.body.name,
      'name'
    );
    let unit = await Unit.findOne({
      name: req.body.name
    });
    if (unit) {
      unit = await Unit.updateOne(req.body);
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
    return "Update Unit Succesfully";
  } catch (error) {
    throw error;
  }
};
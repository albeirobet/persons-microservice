// Created By Eyder Ascuntar Rosales
const customValidator = require('../../utils/validators/validator');
const ApiError = require('../../dto/commons/response/apiErrorDTO');
const ServiceException = require('../../utils/errors/serviceException');
const commonErrors = require('../../utils/constants/commonErrors');
const httpCodes = require('../../utils/constants/httpCodes');
const Product = require('../../models/product/productModel');
const mongoose = require('mongoose');

// =========== Function to findAll Product
exports.findAll = async req => {
  try {
    return await Product.find();
  } catch (error) {
    throw error;
  }
};

// =========== Function to create a new Product
exports.create = async req => {
  try {
    customValidator.validateNotNullRequest(req);
    customValidator.validateNotNullParameter(
      req.body.name,
      'name'
    );
    let product = await Product.findOne({
      name: req.body.name
    });
    if (!product) {
      product = await Product.create(req.body);
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
    return product;
  } catch (error) {
    throw error;
  }
};


// =========== Function to delete a Product
// =========== Function to get a Product
exports.deleteProduct = async (req, res) => {
  customValidator.validateNotNullParameter(
    req.params.name,
    'name'
  );
  let product = await Product.findOneAndDelete({
    name: req.params.name
  });
  if (!product) {
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


// =========== Function to get a Product
exports.getProductByName = async (req, res) => {
  customValidator.validateNotNullParameter(
    req.params.name,
    'name'
  );
  let product = await Product.findOne({
    name: req.params.name
  });
  if (!product) {
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
  return product;
};
// =========== Function to update a Product
exports.updateOne = async req => {
  try {
    customValidator.validateNotNullRequest(req);
    customValidator.validateNotNullParameter(
      req.body.name,
      'name'
    );
    let product = await Product.findOne({
      name: req.body.name
    });
    if (product) {
      product = await Product.updateOne(req.body);
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
    return "Update Product Succesfully";
  } catch (error) {
    throw error;
  }
};
// Created By Yeison Gustavo Niño Murcia
const customValidator = require('../../utils/validators/validator');
const ApiError = require('../../dto/commons/response/apiErrorDTO');
const ServiceException = require('../../utils/errors/serviceException');
const commonErrors = require('../../utils/constants/commonErrors');
const httpCodes = require('../../utils/constants/httpCodes');
const Transaction = require('../../models/transaction/transactionModel');
const User = require('../../models/user/userModel');
const Contact = require('../../models/contact/contactModel');
const Product = require('../../models/product/productModel');
const Unit = require('../../models/unit-measurement/unitModel');

// =========== Function to create a new User
exports.create = async req => {
  let user = await User.findById(req.body.userId);
  let contact = await Contact.findById(req.body.contactId);
  let product = await Product.findById(req.body.productId);
  let unit = await Unit.findById(req.body.unitId);

  try {
    let transaction = {
      user: user._id,
      contact: contact._id,
      product: product._id,
      unit: unit._id,
      amount: req.body.amount,
      transactionType: req.body.transactionType
    };
    return await Transaction.create(transaction);
  } catch (error) {
    throw error;
  }
};

// =========== Function to findAll Product
exports.findByUserId = async req => {
  customValidator.validateNotNullParameter(
    req.params.userId,
    'userId'
  );
  let transactions = await Transaction.find({
    user: req.params.userId
  }).populate('product')
    .populate('unit')
    .lean();;
  if (!transactions) {
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
  return transactions;
};
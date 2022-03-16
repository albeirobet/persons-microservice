// Created By Yeison Gustavo Niño Murcia
const customValidator = require('../../utils/validators/validator');
const ApiError = require('../../dto/commons/response/apiErrorDTO');
const ServiceException = require('../../utils/errors/serviceException');
const commonErrors = require('../../utils/constants/commonErrors');
const httpCodes = require('../../utils/constants/httpCodes');
const Transaction = require('../../models/transaction/transactionModel');
const Item = require('../../models/transaction/itemModel');
const Contact = require('../../models/contact/contactModel');
const Product = require('../../models/product/productModel');
const Unit = require('../../models/unit-measurement/unitModel');
const Company = require('../../models/company/companyModel');

// =========== Function to create a new User
exports.create = async req => {
  customValidator.validateNotNullParameter(req.body.companyId, 'companyId');
  customValidator.validateNotNullParameter(req.body.items, 'items');
  let company = await Company.findById(req.body.companyId);
  let contact = await Contact.findById(req.body.contactId);
  try {
    let transaction = {
      company: company._id,
      contact: contact._id,
      totalOrder: req.body.totalOrder,
      transactionType: req.body.transactionType
    };
    transaction = await Transaction.create(transaction);
    let items = [];

    for (const element of req.body.items.values()) {
      let product = await Product.findById(element.productId);
      let unit = await Unit.findById(element.unitId);
      let item = {
        transaction: transaction._id,
        product: product._id,
        unit: unit._id,
        amount: element.amount,
        priceUnit: element.priceUnit,
        priceTotal: element.priceTotal
      }
      items.push(await Item.create(item));
    }
    transaction.items = items;
    transaction.save();
    return transaction;
  } catch (error) {
    throw error;
  }
};

// =========== Function to findAll Product
exports.findByCompanyId = async req => {
  customValidator.validateNotNullParameter(
    req.params.companyId,
    'companyId'
  );
  let transactions = await Transaction.find({
    company: req.params.companyId
  }).populate('items')
    // .populate('items.item.product')
    // .populate('items.item.unit')
    //.populate({ path: 'items', select: 'product' })
    .lean();
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
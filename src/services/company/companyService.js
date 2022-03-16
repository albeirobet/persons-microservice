// Created By Yeison Gustavo Niño Murcia
const customValidator = require('../../utils/validators/validator');
const ApiError = require('../../dto/commons/response/apiErrorDTO');
const ServiceException = require('../../utils/errors/serviceException');
const commonErrors = require('../../utils/constants/commonErrors');
const companyErrors = require('../../utils/constants/companyErrors');
const httpCodes = require('../../utils/constants/httpCodes');
const Person = require('../../models/person/personModel');
const Company = require('../../models/company/companyModel');

// =========== Function to create a new User
exports.create = async req => {
  try {
    customValidator.validateNotNullRequest(req);
    customValidator.validateNotNullParameter(req.body.company, 'company');
    customValidator.validateNotNullParameter(req.body.documentCompany, 'documentCompany');
    customValidator.validateNotNullParameter(req.body.personId, 'personId');
    let person = await Person.findById(req.body.personId);
    // Si existe como persona pero no existe usuario asociado 
    if (person) {
      let company = await Company.create({ name: req.body.company, owner: person._id, members: [person._id] });
      // Actualizar datos usuario
      person.companies = [];
      person.companies.push(company._id);
      await Person.updateOne({ _id: person._id }, person);
    } else {
      throw new ServiceException(
        commonErrors.EM_COMMON_10,
        new ApiError(
          `${commonErrors.EM_COMMON_10}`,
          `${commonErrors.EM_COMMON_10}`,
          'EM_COMMON_10',
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
exports.addCompanyMember = async (req, res) => {
  customValidator.validateNotNullParameter(req.body.companyId, 'companyId');
  let company = await Company.findById(req.body.companyId);
  if (company) {
    console.info(company.owner);
    console.info(req.body.userId);
    console.info(company.owner == req.body.userId);
    if (company.owner == req.body.userId) {
      let person = await Person.findOne({
        phoneNumber: req.params.phoneNumber
      });
      if (person && person.user) {
        company.members.push(person.user);
        await company.updateOne({ _id: person._id }, company);
      } else {
        throw new ServiceException(
          companyErrors.EM_COMPANY_15,
          new ApiError(
            `${companyErrors.EM_COMMON_15}`,
            `${companyErrors.EM_COMMON_15}`,
            'EM_COMMON_15',
            httpCodes.BAD_REQUEST
          )
        );
      }
    } else {
      throw new ServiceException(companyErrors.E_COMPANY_01,
        new ApiError(
          `${companyErrors.E_COMPANY_01}`,
          `${companyErrors.E_COMPANY_01}`,
          'E_COMPANY_01',
          httpCodes.BAD_REQUEST
        )
      );
    }
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
  return company;
};

// =========== Function to findByCompanyId Product
exports.findByCompanyId = async req => {
  customValidator.validateNotNullParameter(req.params.companyId, 'companyId');
  let company = await Company.findById(req.params.companyId);
  if (!company) {
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
  return company;
};
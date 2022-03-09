// Created By Yeison Gustavo Niño Murcia
const customValidator = require('../../utils/validators/validator');
const ApiError = require('../../dto/commons/response/apiErrorDTO');
const ServiceException = require('../../utils/errors/serviceException');
const contactErrors = require('../../utils/constants/contactErrors');
const httpCodes = require('../../utils/constants/httpCodes');
const Person = require('../../models/person/personModel');
const Contact = require('../../models/contact/contactModel');
const User = require('../../models/user/userModel');
const Company = require('../../models/company/companyModel');

// =========== Function to create a new contact
exports.create = async req => {
  try {
    customValidator.validateNotNullRequest(req);
    customValidator.validateNotNullParameter(req.body.companyId, 'companyId');
    customValidator.validateNotNullParameter(req.body.contact, 'contact');
    customValidator.validateNotNullParameter(req.body.contact.phoneNumber, 'contact.phoneNumber');
    let company = await Company.findById(
      req.body.companyId
    )
      .populate('owner')
      .lean();
    let contact = null;
    // Si existe compañía y usuario principal se crea y asocia contacto
    if (company && company.owner) {
      let personContact = await Person.findOne({ phoneNumber: req.body.contact.phoneNumber });
      if (!personContact) {
        personContact = await Person.create(req.body.contact);
      }
      
      req.body.contact.company = req.body.companyId;
      req.body.contact.person = personContact._id;
      contact = await Contact.create(req.body.contact);

      // Actualizar contactos de usuario
      if (!company.contacts) {
        company.contacts = [];
      }
      company.contacts.push(contact._id);
      await Company.updateOne({ _id: company._id }, company);
    } else {
      throw new ServiceException(
        contactErrors.EM_CONTACT_00,
        new ApiError(
          `${contactErrors.EM_CONTACT_00}`,
          `${contactErrors.EM_CONTACT_00}`,
          'EM_CONTACT_00',
          httpCodes.BAD_REQUEST
        )
      );
    }
    return contact;
  } catch (error) {
    throw error;
  }
};

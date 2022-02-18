// Created By Yeison Gustavo Niño Murcia
const customValidator = require('../../utils/validators/validator');
const ApiError = require('../../dto/commons/response/apiErrorDTO');
const ServiceException = require('../../utils/errors/serviceException');
const contactErrors = require('../../utils/constants/contactErrors');
const httpCodes = require('../../utils/constants/httpCodes');
const Person = require('../../models/person/personModel');
const Contact = require('../../models/contact/contactModel');
const User = require('../../models/user/userModel');

// =========== Function to create a new contact
exports.create = async req => {
  try {
    customValidator.validateNotNullRequest(req);
    customValidator.validateNotNullParameter(req.body.phoneNumber, 'phoneNumber');
    customValidator.validateNotNullParameter(req.body.contact, 'contact');
    customValidator.validateNotNullParameter(req.body.contact.phoneNumber, 'contact.phoneNumber');
    let personUser = await Person.findOne({
      phoneNumber: req.body.phoneNumber
    })
      .populate('user')
      .lean();
    let contact = null;
    // Si existe persona y usuario para el phoneNumber se crea y asocia contacto
    if (personUser && personUser.user) {
      let personContact = await Person.findOne({
        phoneNumber: req.body.contact.phoneNumber
      });
      if (!personContact) {
        personContact = await Person.create(req.body.contact);
      }
      req.body.contact.user = personUser.user._id;
      req.body.contact.person = personContact._id;
      contact = await Contact.create(req.body.contact);

      // Actualizar contactos de usuario
      if (!personUser.user.contacts) {
        personUser.user.contacts = [];
      }
      personUser.user.contacts.push(contact._id);
      await User.updateOne({ _id: personUser.user._id }, personUser.user);
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

// Created By Yeison Gustavo Niño Murcia
const GeneralResponse = require('../../dto/commons/response/generalResponseDTO');
const service = require('../../services/contact/contactService');
const httpCodes = require('../../utils/constants/httpCodes');
const generalResp = require('../../utils/responses/generalResp');

exports.create = async (req, res) => {
  let codeHttp = httpCodes.OK;
  let generalResponse = new GeneralResponse();
  generalResponse.success = true;
  try {
    const data = await service.create(req, res);
    generalResponse = generalResp.generalSuccess(data);
  } catch (err) {
    generalResponse = generalResp.generalError(err);
    codeHttp = generalResponse.apiError.codeHTTP || httpCodes.BAD_REQUEST;
    generalResponse.apiError.codeHTTP = undefined;
  }
  return res.status(codeHttp).json(generalResponse);
};
exports.deleteContact = async (req, res) => {
  let codeHttp = httpCodes.OK;
  let generalResponse = new GeneralResponse();
  generalResponse.success = true;
  try {
    const data = await service.deleteContact(req, res);
    generalResponse = generalResp.generalSuccess(data);
  } catch (err) {
    generalResponse = generalResp.generalError(err);
    codeHttp = generalResponse.apiError.codeHTTP || httpCodes.BAD_REQUEST;
    generalResponse.apiError.codeHTTP = undefined;
  }
  return res.status(codeHttp).json(generalResponse);
};


exports.getContactByPhoneNumber = async (req, res) => {
  let codeHttp = httpCodes.OK;
  let generalResponse = new GeneralResponse();
  generalResponse.success = true;
  try {
    const data = await service.getContactByPhoneNumber(req, res);
    generalResponse = generalResp.generalSuccess(data);
  } catch (err) {
    generalResponse = generalResp.generalError(err);
    codeHttp = generalResponse.apiError.codeHTTP || httpCodes.BAD_REQUEST;
    generalResponse.apiError.codeHTTP = undefined;
  }
  return res.status(codeHttp).json(generalResponse);
};
exports.update = async (req, res) => {
  let codeHttp = httpCodes.OK;
  let generalResponse = new GeneralResponse();
  generalResponse.success = true;
  try {
    const data = await service.updateOne(req, res);
    generalResponse = generalResp.generalSuccess(data);
  } catch (err) {
    generalResponse = generalResp.generalError(err);
    codeHttp = generalResponse.apiError.codeHTTP || httpCodes.BAD_REQUEST;
    generalResponse.apiError.codeHTTP = undefined;
  }
  return res.status(codeHttp).json(generalResponse);
};
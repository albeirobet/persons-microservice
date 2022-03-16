// Created By Eyder Ascuntar Rosales
const GeneralResponse = require('../../dto/commons/response/generalResponseDTO');
const service = require('../../services/person/personService');
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
exports.deletePerson = async (req, res) => {
  let codeHttp = httpCodes.OK;
  let generalResponse = new GeneralResponse();
  generalResponse.success = true;
  try {
    const data = await service.deletePerson(req, res);
    generalResponse = generalResp.generalSuccess(data);
  } catch (err) {
    generalResponse = generalResp.generalError(err);
    codeHttp = generalResponse.apiError.codeHTTP || httpCodes.BAD_REQUEST;
    generalResponse.apiError.codeHTTP = undefined;
  }
  return res.status(codeHttp).json(generalResponse);
};


exports.getPersonByPhoneNumber = async (req, res) => {
  let codeHttp = httpCodes.OK;
  let generalResponse = new GeneralResponse();
  generalResponse.success = true;
  try {
    const data = await service.getPersonByPhoneNumber(req, res);
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
    const data = await service.update(req, res);
    generalResponse = generalResp.generalSuccess(data);
  } catch (err) {
    generalResponse = generalResp.generalError(err);
    codeHttp = generalResponse.apiError.codeHTTP || httpCodes.BAD_REQUEST;
    generalResponse.apiError.codeHTTP = undefined;
  }
  return res.status(codeHttp).json(generalResponse);
};
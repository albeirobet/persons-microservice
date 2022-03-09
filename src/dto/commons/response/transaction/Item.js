// Created By Yeison Niño
class Item {
    constructor(data, success, message, apiError) {
      this.data = data;
      this.success = success;
      this.message = message;
      this.apiError = apiError;
    }
  
    applyData(json) {
      Object.assign(this, json);
    }
  }
  module.exports = GeneralResponse;
  
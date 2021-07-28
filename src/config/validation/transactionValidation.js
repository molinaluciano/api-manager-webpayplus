const { Joi } = require("express-validation");

const transactionValidation = {
  body: Joi.object({
    rut: Joi.number().integer().positive(),
    amount: Joi.number().integer().positive().min(500).required(),
  }),
};
const transactionCaptureValidation = {
  body: Joi.object({
    buy_order: Joi.number().integer().positive().required(),
    authorization_code: Joi.number().integer().positive().required(),
    amount: Joi.number().integer().positive().min(500).required(),
  }),
};

module.exports = {
  transactionValidation,
  transactionCaptureValidation,
};

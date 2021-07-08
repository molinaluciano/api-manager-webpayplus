const { Joi } = require("express-validation");

const transactionValidation = {
  body: Joi.object({
    rut: Joi.number().integer().positive(),
    amount: Joi.number().integer().positive().min(10).required(),
  }),
};

module.exports = {
  transactionValidation,
};

const { configErrorMessages } = require("../util/constantConfiguration");

class transactionNotFoundError extends Error {
  constructor(error) {
    if (error) {
      super(error.message ? error.message : error);
    } else {
      super(configErrorMessages.hasErrorNotFoundTransaction);
    }
  }
}

module.exports = transactionNotFoundError;

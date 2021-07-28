const { configErrorMessages } = require("../util/constantConfiguration");

class createTransactionError extends Error {
  constructor(error) {
    if (error) {
      super(error.message ? error.message : error);
    } else {
      super(configErrorMessages.hasErrorCreateTransaction);
    }
  }
}

module.exports = createTransactionError;

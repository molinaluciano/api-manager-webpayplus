class TransactionCapture {
  constructor(buy_order, authorization_code, capture_amount) {
    this.buy_order = buy_order;
    this.authorization_code = authorization_code;
    this.capture_amount = capture_amount;
  }
}

module.exports = TransactionCapture;

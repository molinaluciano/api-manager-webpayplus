class Transaction{
    constructor(buy_order, session_id, amount, return_url){
        this.buy_order = buy_order;
        this.session_id = session_id;
        this.amount = amount;
        this.return_url = return_url;
    }
}

module.exports = Transaction;
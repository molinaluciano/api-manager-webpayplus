const createTransactionError = require("../../error/createTransactionError");
const transactionNotFoundError = require("../../error/transactionNotFoundError");
const Transaction = require("../../model/transaction");
const {
  createTransaction,
  createCommit,
  getStatus,
} = require("../../facade/transactionFacade");

const transactionTest = new Transaction(
  354535,
  4565435645,
  5000,
  "https://www.google.com"
);

const transactionTestFailed = new Transaction(
  "sdfssdsdf233244",
  "dfgdfgdfgd34234",
  1000000000000000,
  "www.google.com"
);
const validToken =
  "01ab7805dc529ce1f7f720e7a07347368a07cc95fc19514ed2efe61477da140f";
const invalidToken =
  "01ab7805dc529ce1f7f720e7a07347368a07cc95fc19514ed2efe61477da140ff";

describe("SUCCES TEST FACADE TRANSACTION", () => {
  it("function create transaction", async () => {
    expect.assertions(1);

    await expect(createTransaction(transactionTest)).resolves.toEqual(
      expect.objectContaining({
        token: expect.any(String),
        url: expect.any(String),
      })
    );
  });

  it("function commit transaction", async () => {
    expect.assertions(1);

    await expect(createCommit(validToken)).resolves.toEqual(
      expect.objectContaining({
        vci: expect.any(String),
        amount: expect.any(Number),
        status: expect.any(String),
        buy_order: expect.any(String),
        session_id: expect.any(String),
        card_detail: expect.any(Object),
        accounting_date: expect.any(String),
        transaction_date: expect.any(String),
        authorization_code: expect.any(String),
        payment_type_code: expect.any(String),
        response_code: expect.any(Number),
        installments_amount: expect.any(Number),
        installments_number: expect.any(Number),
      })
    );
  });

  it("function get status - transaction authorized", async () => {
    expect.assertions(1);

    await expect(getStatus(validToken)).resolves.toEqual(
      expect.objectContaining({
        vci: expect.any(String),
        amount: expect.any(Number),
        status: expect.any(String),
        buy_order: expect.any(String),
        session_id: expect.any(String),
        card_detail: expect.any(Object),
        accounting_date: expect.any(String),
        transaction_date: expect.any(String),
        authorization_code: expect.any(String),
        payment_type_code: expect.any(String),
        response_code: expect.any(Number),
        installments_amount: expect.any(Number),
        installments_number: expect.any(Number),
      })
    );
  });
});

describe("FAIL TEST FACADE TRANSACTION", () => {
  it("function create transaction", async () => {
    expect.assertions(1);

    await expect(createTransaction(transactionTestFailed)).rejects.toThrowError(
      createTransactionError
    );
  });

  it("function commit transaction - invalid value: token", async () => {
    expect.assertions(1);

    await expect(createCommit(invalidToken)).rejects.toThrowError(
      transactionNotFoundError
    );
  });

  it("function get status - invalid value: token", async () => {
    expect.assertions(1);

    await expect(getStatus(invalidToken)).rejects.toThrowError(
      transactionNotFoundError
    );
  });
});

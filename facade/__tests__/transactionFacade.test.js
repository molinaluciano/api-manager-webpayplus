// const mockAxios = require("axios");
const axios = require("axios");
const Transaction = require("../../model/transaction");
const { createTransaction } = require("../../facade/transactionFacade");

const transactionTest = new Transaction(
  354535,
  4565435645,
  5000,
  "https://www.google.com"
);

describe("SUCCES TEST FACADE TRANSACTION", () => {
  it("function create transaction", async () => {
    const response = await createTransaction(transactionTest);

    expect(response).toEqual(
      expect.objectContaining({
        token: expect.any(String),
        url: expect.any(String),
      })
    );
  });
});

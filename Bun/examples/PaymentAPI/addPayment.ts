import QvicklyPaymentAPI from "../../PaymentAPI";

const paymentAPI = new QvicklyPaymentAPI(Bun.env.EID, Bun.env.SECRET);
const paymentData = {
  PaymentData: {
    method: "8",
    currency: "SEK",
    language: "sv",
    country: "SE",
    orderid: "123456",
    bankid: "true",
    accepturl: "https://example.com/accept",
    cancelurl: "https://example.com/cancel",
    callbackurl: "https://example.com/callback",
  },
  Customer: {
    pno: "550101-1018",
    Billing: {
      firstname: "Tess T",
      lastname: "Person",
      address: "Testvägen 1",
      zip: "12345",
      city: "Testinge",
      country: "SE",
      phone: "0700000000",
      email: "test@example.com",
    },
  },
  Articles: [
    {
      artnr: "1",
      title: "Test",
      aprice: "10000",
      taxrate: "25",
      quantity: "1",
      withouttax: "10000",
    },
  ],
  Cart: {
    Total: {
      withouttax: "10000",
      tax: "2500",
      withtax: "12500",
    },
  },
};

const payment = await paymentAPI.call("addPayment", paymentData);
console.log(payment);

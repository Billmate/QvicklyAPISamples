import QvicklyPaymentAPI from "../../PaymentAPI";

const paymentAPI = new QvicklyPaymentAPI(Bun.env.EID, Bun.env.SECRET);
const credentials = await paymentAPI.call("getAPICredentials", {
  hash: "123456abc123456abc123456abc12345",
  eid: "23456",
});
console.log(credentials);

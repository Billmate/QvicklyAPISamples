import { QvicklyPaymentAPI } from "../../PaymentAPI.js";

const paymentAPI = new QvicklyPaymentAPI(process.env.EID, process.env.SECRET);
const credentials = await paymentAPI.call("getAPICredentials", {
  hash: "123456abc123456abc123456abc12345",
  eid: "23456",
});
console.log(credentials);

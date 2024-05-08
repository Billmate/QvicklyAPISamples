import {QvicklyPaymentAPI, env} from "../../PaymentAPI.ts";

const paymentAPI = new QvicklyPaymentAPI(env["EID"], env["SECRET"]);
const credentials = await paymentAPI.call("getAPICredentials", {
  hash: "123456abc123456abc123456abc12345",
  eid: "23456",
});
console.log(credentials);

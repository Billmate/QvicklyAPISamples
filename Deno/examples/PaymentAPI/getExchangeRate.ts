import {QvicklyPaymentAPI, env} from "../../PaymentAPI.ts";

const paymentAPI = new QvicklyPaymentAPI(env["EID"], env["SECRET"]);
const rate = await paymentAPI.call("getExchangeRate", {
  currency: "USD",
  date: "2024-04-30",
});
console.log(rate);

import {QvicklyPaymentAPI, env} from "../../PaymentAPI.ts";

const paymentAPI = new QvicklyPaymentAPI(env["EID"], env["SECRET"]);
const rate = await paymentAPI.call("getVatRate", {
  country: "FI",
});
console.log(rate);

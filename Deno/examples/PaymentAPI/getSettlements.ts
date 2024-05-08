import {QvicklyPaymentAPI, env} from "../../PaymentAPI.ts";

const paymentAPI = new QvicklyPaymentAPI(env["EID"], env["SECRET"]);
const settlements = await paymentAPI.call("getSettlements", {
  fromDate: "2024-03-01",
});
console.log(settlements);

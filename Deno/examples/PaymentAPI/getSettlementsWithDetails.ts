import {QvicklyPaymentAPI, env} from "../../PaymentAPI.ts";

const paymentAPI = new QvicklyPaymentAPI(env["EID"], env["SECRET"]);
const settlement = await paymentAPI.call("getSettlementsWithDetails", {
  settlementId: "1",
});
console.log(settlement);

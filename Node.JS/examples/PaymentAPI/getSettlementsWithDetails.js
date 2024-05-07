import { QvicklyPaymentAPI } from "../../PaymentAPI.js";

const paymentAPI = new QvicklyPaymentAPI(process.env.EID, process.env.SECRET);
const settlement = await paymentAPI.call("getSettlementsWithDetails", {
  settlementId: "1",
});
console.log(settlement);

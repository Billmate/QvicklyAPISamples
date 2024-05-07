import { QvicklyPaymentAPI } from "../../PaymentAPI.js";

const paymentAPI = new QvicklyPaymentAPI(process.env.EID, process.env.SECRET);
const settlements = await paymentAPI.call("getSettlements", {
  fromDate: "2024-03-01",
});
console.log(settlements);

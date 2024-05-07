import { QvicklyPaymentAPI } from "../../PaymentAPI.js";

const paymentAPI = new QvicklyPaymentAPI(process.env.EID, process.env.SECRET);
const rate = await paymentAPI.call("getVatRate", {
  country: "FI",
});
console.log(rate);

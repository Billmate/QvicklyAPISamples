import { QvicklyPaymentAPI } from "../../PaymentAPI.js";

const paymentAPI = new QvicklyPaymentAPI(process.env.EID, process.env.SECRET);
const rate = await paymentAPI.call("getExchangeRate", {
  currency: "USD",
  date: "2024-04-30",
});
console.log(rate);

import { QvicklyPaymentAPI } from "../../PaymentAPI.js";

const paymentAPI = new QvicklyPaymentAPI(process.env.EID, process.env.SECRET);
const plans = await paymentAPI.call("getPaymentPlans", {
  PaymentData: {
    country: "SE",
    currency: "SEK",
    language: "sv",
  },
});
console.log(plans);

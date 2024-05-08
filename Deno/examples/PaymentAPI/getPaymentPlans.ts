import {QvicklyPaymentAPI, env} from "../../PaymentAPI.ts";

const paymentAPI = new QvicklyPaymentAPI(env["EID"], env["SECRET"]);
const plans = await paymentAPI.call("getPaymentPlans", {
  PaymentData: {
    country: "SE",
    currency: "SEK",
    language: "sv",
  },
});
console.log(plans);

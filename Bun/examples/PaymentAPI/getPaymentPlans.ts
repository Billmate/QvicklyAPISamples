import QvicklyPaymentAPI from "../../PaymentAPI";

const paymentAPI = new QvicklyPaymentAPI(Bun.env.EID, Bun.env.SECRET);
const plans = await paymentAPI.call("getPaymentPlans", {
  PaymentData: {
    country: "SE",
    currency: "SEK",
    language: "sv",
  },
});
console.log(plans);

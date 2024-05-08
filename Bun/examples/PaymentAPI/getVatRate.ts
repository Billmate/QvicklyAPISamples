import QvicklyPaymentAPI from "../../PaymentAPI";

const paymentAPI = new QvicklyPaymentAPI(Bun.env.EID, Bun.env.SECRET);
const rate = await paymentAPI.call("getVatRate", {
  country: "FI",
});
console.log(rate);

import QvicklyPaymentAPI from "../../PaymentAPI";

const paymentAPI = new QvicklyPaymentAPI(Bun.env.EID, Bun.env.SECRET);
const rate = await paymentAPI.call("getExchangeRate", {
  currency: "USD",
  date: "2024-04-30",
});
console.log(rate);

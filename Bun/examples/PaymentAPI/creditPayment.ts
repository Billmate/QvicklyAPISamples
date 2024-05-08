import QvicklyPaymentAPI from "../../PaymentAPI";

const paymentAPI = new QvicklyPaymentAPI(Bun.env.EID, Bun.env.SECRET);
const payment = await paymentAPI.call("creditPayment", {
  number: "12345",
});
console.log(payment);

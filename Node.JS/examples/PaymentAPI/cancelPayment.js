import { QvicklyPaymentAPI } from "../../PaymentAPI.js";

const paymentAPI = new QvicklyPaymentAPI(process.env.EID, process.env.SECRET);
const payment = await paymentAPI.call("cancelPayment", {
  number: "12345",
});
console.log(payment);

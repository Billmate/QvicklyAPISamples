import {QvicklyPaymentAPI, env} from "../../PaymentAPI.ts";

const paymentAPI = new QvicklyPaymentAPI(env["EID"], env["SECRET"]);
const payment = await paymentAPI.call("cancelPayment", {
  number: "12345",
});
console.log(payment);

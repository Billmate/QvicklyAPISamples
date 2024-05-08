import {QvicklyPaymentAPI, env} from "../../PaymentAPI.ts";

const paymentAPI = new QvicklyPaymentAPI(env["EID"], env["SECRET"]);
const payments = await paymentAPI.call("getDuePayments", {
  dueDate: "2024-05-01",
});
console.log(payments);

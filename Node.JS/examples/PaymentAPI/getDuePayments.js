import { QvicklyPaymentAPI } from "../../PaymentAPI.js";

const paymentAPI = new QvicklyPaymentAPI(process.env.EID, process.env.SECRET);
const payments = await paymentAPI.call("getDuePayments", {
  dueDate: "2024-05-01",
});
console.log(payments);

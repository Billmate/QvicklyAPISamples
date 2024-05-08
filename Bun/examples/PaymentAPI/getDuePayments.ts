import QvicklyPaymentAPI from "../../PaymentAPI";

const paymentAPI = new QvicklyPaymentAPI(Bun.env.EID, Bun.env.SECRET);
const payments = await paymentAPI.call("getDuePayments", {
  dueDate: "2024-05-01",
});
console.log(payments);

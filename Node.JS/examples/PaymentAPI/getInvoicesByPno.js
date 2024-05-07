import { QvicklyPaymentAPI } from "../../PaymentAPI.js";

const paymentAPI = new QvicklyPaymentAPI(process.env.EID, process.env.SECRET);
const invoices = await paymentAPI.call("getInvoicesByPno", {
  pno: "0000000000",
});
console.log(invoices);

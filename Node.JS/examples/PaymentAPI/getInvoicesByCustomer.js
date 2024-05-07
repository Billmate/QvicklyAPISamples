import { QvicklyPaymentAPI } from "../../PaymentAPI.js";

const paymentAPI = new QvicklyPaymentAPI(process.env.EID, process.env.SECRET);
const invoices = await paymentAPI.call("getInvoicesByCustomer", {
  customerno: "12345",
});
console.log(invoices);

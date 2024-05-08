import {QvicklyPaymentAPI, env} from "../../PaymentAPI.ts";

const paymentAPI = new QvicklyPaymentAPI(env["EID"], env["SECRET"]);
const invoices = await paymentAPI.call("getInvoicesByCustomer", {
  customerno: "12345",
});
console.log(invoices);

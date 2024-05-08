import {QvicklyPaymentAPI, env} from "../../PaymentAPI.ts";

const paymentAPI = new QvicklyPaymentAPI(env["EID"], env["SECRET"]);
const invoices = await paymentAPI.call("getInvoicesByPno", {
  pno: "0000000000",
});
console.log(invoices);

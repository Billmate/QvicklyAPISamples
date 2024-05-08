import QvicklyPaymentAPI from "../../PaymentAPI";

const paymentAPI = new QvicklyPaymentAPI(Bun.env.EID, Bun.env.SECRET);
const invoices = await paymentAPI.call("getInvoicesByCustomer", {
  customerno: "12345",
});
console.log(invoices);

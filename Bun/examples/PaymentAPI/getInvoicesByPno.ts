import QvicklyPaymentAPI from "../../PaymentAPI";

const paymentAPI = new QvicklyPaymentAPI(Bun.env.EID, Bun.env.SECRET);
const invoices = await paymentAPI.call("getInvoicesByPno", {
  pno: "0000000000",
});
console.log(invoices);

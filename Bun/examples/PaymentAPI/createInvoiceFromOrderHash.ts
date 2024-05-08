import QvicklyPaymentAPI from "../../PaymentAPI";

const paymentAPI = new QvicklyPaymentAPI(Bun.env.EID, Bun.env.SECRET);
const invoice = await paymentAPI.call("createInvoiceFromOrderHash", {
  hash: "123456abc123456abc123456abc12345",
});
console.log(invoice);

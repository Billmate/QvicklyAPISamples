import {QvicklyPaymentAPI, env} from "../../PaymentAPI.ts";

const paymentAPI = new QvicklyPaymentAPI(env["EID"], env["SECRET"]);
const invoice = await paymentAPI.call("getInvoiceByHash", {
  hash: "123456abc123456abc123456abc12345",
});
console.log(invoice);

import { QvicklyPaymentAPI } from "../../PaymentAPI.js";

const paymentAPI = new QvicklyPaymentAPI(process.env.EID, process.env.SECRET);
const result = await paymentAPI.call("updateStatusLogOfInvoiceByHash", {
  hash: "123456abc123456abc123456abc12345",
  body: {
    text: "Updated status log from API",
  },
});
console.log(result);

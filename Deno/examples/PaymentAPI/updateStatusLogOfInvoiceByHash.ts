import {QvicklyPaymentAPI, env} from "../../PaymentAPI.ts";

const paymentAPI = new QvicklyPaymentAPI(env["EID"], env["SECRET"]);
const result = await paymentAPI.call("updateStatusLogOfInvoiceByHash", {
  hash: "123456abc123456abc123456abc12345",
  body: {
    text: "Status log updated by API"
  }
});
console.log(result);

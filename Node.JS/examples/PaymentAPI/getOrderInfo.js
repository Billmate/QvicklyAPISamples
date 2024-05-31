import { QvicklyPaymentAPI } from "../../PaymentAPI.js";

const paymentAPI = new QvicklyPaymentAPI(process.env.EID, process.env.SECRET);
const order = await paymentAPI.call("getOrderInfo", {
  hash: "123456abc123456abc123456abc12345",
});
console.log(order);

import QvicklyPaymentAPI from "../../PaymentAPI";

const paymentAPI = new QvicklyPaymentAPI(Bun.env.EID, Bun.env.SECRET);
const order = await paymentAPI.call("getOrderInfo", {
  hash: "123456abc123456abc123456abc12345",
});
console.log(order);

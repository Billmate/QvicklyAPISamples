import { QvicklyPaymentAPI } from "../../PaymentAPI.js";

const paymentAPI = new QvicklyPaymentAPI(process.env.EID, process.env.SECRET);
const account = await paymentAPI.call("getAccountInfo", {
  comingFromPF2: "1",
});
console.log(account);

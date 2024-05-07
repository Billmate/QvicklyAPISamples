import { QvicklyPaymentAPI } from "../../PaymentAPI.js";

const paymentAPI = new QvicklyPaymentAPI(process.env.EID, process.env.SECRET);
const address = await paymentAPI.call("getAddress", {
  country: "SE",
  pno: "550101-1018",
});
console.log(address);

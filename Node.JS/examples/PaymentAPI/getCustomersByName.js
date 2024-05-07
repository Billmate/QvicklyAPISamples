import { QvicklyPaymentAPI } from "../../PaymentAPI.js";

const paymentAPI = new QvicklyPaymentAPI(process.env.EID, process.env.SECRET);
const customers = await paymentAPI.call("getCustomersByName", {
  name: "Tess",
});
console.log(customers);

import {QvicklyPaymentAPI, env} from "../../PaymentAPI.ts";

const paymentAPI = new QvicklyPaymentAPI(env["EID"], env["SECRET"]);
const customers = await paymentAPI.call("getCustomersByName", {
  name: "Tess",
});
console.log(customers);

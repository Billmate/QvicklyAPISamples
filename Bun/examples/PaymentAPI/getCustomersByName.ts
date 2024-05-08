import QvicklyPaymentAPI from "../../PaymentAPI";

const paymentAPI = new QvicklyPaymentAPI(Bun.env.EID, Bun.env.SECRET);
const customers = await paymentAPI.call("getCustomersByName", {
  name: "Tess",
});
console.log(customers);

import QvicklyPaymentAPI from "../../PaymentAPI";

const paymentAPI = new QvicklyPaymentAPI(Bun.env.EID, Bun.env.SECRET);
const address = await paymentAPI.call("getAddress", { pno: "5501011018" })
console.log(address);

import { QvicklyPaymentAPI } from "../../PaymentAPI.js";

const paymentAPI = new QvicklyPaymentAPI(process.env.EID, process.env.SECRET);
const parties = await paymentAPI.call("crediflowSearchParty", {
  orgnum: "5566779988",
});
console.log(parties);

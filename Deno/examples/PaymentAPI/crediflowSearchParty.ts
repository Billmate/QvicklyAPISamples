import {QvicklyPaymentAPI, env} from "../../PaymentAPI.ts";

const paymentAPI = new QvicklyPaymentAPI(env["EID"], env["SECRET"]);
const parties = await paymentAPI.call("crediflowSearchParty", {
  orgnum: "5566779988",
});
console.log(parties);

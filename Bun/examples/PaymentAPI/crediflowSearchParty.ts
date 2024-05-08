import QvicklyPaymentAPI from "../../PaymentAPI";

const paymentAPI = new QvicklyPaymentAPI(Bun.env.EID, Bun.env.SECRET);
const parties = await paymentAPI.call("crediflowSearchParty", {
  orgnum: "5566779988",
});
console.log(parties);

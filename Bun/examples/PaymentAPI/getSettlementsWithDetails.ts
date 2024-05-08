import QvicklyPaymentAPI from "../../PaymentAPI";

const paymentAPI = new QvicklyPaymentAPI(Bun.env.EID, Bun.env.SECRET);
const settlement = await paymentAPI.call("getSettlementsWithDetails", {
  settlementId: "1",
});
console.log(settlement);

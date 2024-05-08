import QvicklyPaymentAPI from "../../PaymentAPI";

const paymentAPI = new QvicklyPaymentAPI(Bun.env.EID, Bun.env.SECRET);
const settlements = await paymentAPI.call("getSettlements", {
  fromDate: "2024-03-01",
});
console.log(settlements);

import QvicklyPaymentAPI from "../../PaymentAPI";

const paymentAPI = new QvicklyPaymentAPI(Bun.env.EID, Bun.env.SECRET);
const merchant = await paymentAPI.call("getMerchantByOrgnum", {
  orgnum: "5555555555",
});
console.log(merchant);

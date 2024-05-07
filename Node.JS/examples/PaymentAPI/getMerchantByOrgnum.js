import { QvicklyPaymentAPI } from "../../PaymentAPI.js";

const paymentAPI = new QvicklyPaymentAPI(process.env.EID, process.env.SECRET);
const merchant = await paymentAPI.call("getMerchantByOrgnum", {
  orgnum: "5555555555",
});
console.log(merchant);

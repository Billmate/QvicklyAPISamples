import {QvicklyPaymentAPI, env} from "../../PaymentAPI.ts";

const paymentAPI = new QvicklyPaymentAPI(env["EID"], env["SECRET"]);
const merchant = await paymentAPI.call("getMerchantByOrgnum", {
  orgnum: "5555555555",
});
console.log(merchant);

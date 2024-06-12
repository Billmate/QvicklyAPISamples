import {QvicklyPaymentAPI, env} from "../../PaymentAPI.ts";

const paymentAPI = new QvicklyPaymentAPI(env["EID"], env["SECRET"]);
const account = await paymentAPI.call("getAccountInfo", {
    "comingFromPF2": "1"
});
console.log(account);

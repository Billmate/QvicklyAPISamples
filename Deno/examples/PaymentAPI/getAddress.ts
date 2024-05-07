import {QvicklyPaymentAPI, env} from "../../PaymentAPI.ts";

const paymentAPI = new QvicklyPaymentAPI(env["EID"], env["SECRET"]);
const address = await paymentAPI.call("getAddress", { pno: "5501011018" })
console.log(address);

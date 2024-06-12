import QvicklyPaymentAPI from "../../PaymentAPI";

const paymentAPI = new QvicklyPaymentAPI(Bun.env.EID, Bun.env.SECRET);
const account = await paymentAPI.call("getAccountInfo", {
    "comingFromPF2": "1"
});
console.log(account);

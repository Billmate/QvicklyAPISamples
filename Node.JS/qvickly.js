const PaymentAPI = require('./PaymentAPI').default;

console.log(PaymentAPI);
const papi = new PaymentAPI(12345, '12345678901234567890');
papi.call('getAddress', { pno: '5501011001' }).then((response) => {;
    console.log(response);
})
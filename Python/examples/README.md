# Python examples for Qvickly APIs

## PaymentAPI

| Function                                                               | Description                                                                |
| ---------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| [getAddress](PaymentAPI/getAddress.py)                                 | Get address information based on (swedish) personal indentification number |
| [addPayment](PaymentAPI/addPayment.py)                                 | Create a payment                                                           |
| [activatePayment](PaymentAPI/addPayment.py)                            | Create a payment                                                           |
| [cancelPayment](PaymentAPI/cancelPayment.py)                           | Cancel a payment                                                           |
| [creditPayment](PaymentAPI/creditPayment.py)                           | Credit a payment                                                           |
| [partCreditPayment](PaymentAPI/partCreditPayment.py)                   | Partially credit a payment                                                 |
| [getAccountInfo](PaymentAPI/getAccountInfo.py)                         |                                                                            |
| [getTerms](PaymentAPI/getTerms.py)                                     |                                                                            |
| [getPaymentPlans](PaymentAPI/getPaymentPlans.py)                       |                                                                            |
| [getPaymentInfo](PaymentAPI/getPaymentInfo.py)                         |                                                                            |
| [getDuePayments](PaymentAPI/getDuePayments.py)                         |                                                                            |
| [getSettlements](PaymentAPI/getSettlements.py)                         |                                                                            |
| [getSettlementsWithDetails](PaymentAPI/getSettlementsWithDetails.py)   |                                                                            |
| [getCustomersByName](PaymentAPI/getCustomersByName.py)                 |                                                                            |
| [getMerchantByOrgnum](PaymentAPI/getMerchantByOrgnum.py)               |                                                                            |
| [getInvoicesByPno](PaymentAPI/getInvoicesByPno.py)                     |                                                                            |
| [getInvoicesByCustomer](PaymentAPI/getInvoicesByCustomer.py)           |                                                                            |
| [getExchangeRate](PaymentAPI/getExchangeRate.py)                       |                                                                            |
| [getVatRate](PaymentAPI/getVatRate.py)                                 |                                                                            |
| [getFees](PaymentAPI/getFees.py)                                       |                                                                            |
| [crediflowSearchParty](PaymentAPI/crediflowSearchParty.py)             |                                                                            |
| [getOrderByHash](PaymentAPI/getOrderByHash.py)                         |                                                                            |
| [getInvoiceByHash](PaymentAPI/getInvoiceByHash.py)                     |                                                                            |
| [createInvoiceFromOrderHash](PaymentAPI/createInvoiceFromOrderHash.py) |                                                                            |
| [getAPICredentials](PaymentAPI/getAPICredentials.py)                   |                                                                            |

### .env

EID and SECRET is designed to be put in a .env file located in the same directory.

Here is an example .env file

```env
EID=12345
SECRET=12345678901234567980
```

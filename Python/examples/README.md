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
| [getAccountInfo](PaymentAPI/getAccountInfo.py)                         | Get account information                                                    |
| [getTerms](PaymentAPI/getTerms.py)                                     | Get terms                                                                  |
| [getPaymentPlans](PaymentAPI/getPaymentPlans.py)                       | Get payment plans                                                          |
| [getPaymentInfo](PaymentAPI/getPaymentInfo.py)                         | Get payment information                                                    |
| [getDuePayments](PaymentAPI/getDuePayments.py)                         | Get due payments                                                           |
| [getSettlements](PaymentAPI/getSettlements.py)                         | Getsettlements                                                             |
| [getSettlementsWithDetails](PaymentAPI/getSettlementsWithDetails.py)   | Get a detailed settlement.                                                 |
| [getCustomersByName](PaymentAPI/getCustomersByName.py)                 | Get customers by name                                                      |
| [getMerchantByOrgnum](PaymentAPI/getMerchantByOrgnum.py)               | Get merchant by orgnum                                                     |
| [getInvoicesByPno](PaymentAPI/getInvoicesByPno.py)                     | Get invoices by pno                                                        |
| [getInvoicesByCustomer](PaymentAPI/getInvoicesByCustomer.py)           | Get invoices by customer                                                   |
| [getExchangeRate](PaymentAPI/getExchangeRate.py)                       | Get exchange rate for currency                                             |
| [getVatRate](PaymentAPI/getVatRate.py)                                 | Get VAT rate by country.                                                   |
| [getFees](PaymentAPI/getFees.py)                                       | Get fees                                                                   |
| [crediflowSearchParty](PaymentAPI/crediflowSearchParty.py)             | Perform a crediflow search                                                 |
| [getOrderByHash](PaymentAPI/getOrderByHash.py)                         | Get a order by hash                                                        |
| [getInvoiceByHash](PaymentAPI/getInvoiceByHash.py)                     | Get an invoice by hash                                                     |
| [createInvoiceFromOrderHash](PaymentAPI/createInvoiceFromOrderHash.py) | Create invoice from order hash                                             |
| [getAPICredentials](PaymentAPI/getAPICredentials.py)                   | Get API credentials                                                        |

### .env

EID and SECRET is designed to be put in a .env file located in the same directory.

Here is an example .env file

```env
EID=12345
SECRET=12345678901234567980
```

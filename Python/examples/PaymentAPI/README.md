# Python examples for Qvickly PaymentAPI

| Function                                                            | Description                                                                |
| ------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| [getAddress](getAddress.py)                                         | Get address information based on (swedish) personal indentification number |
| [addPayment](addPayment.py)                                         | Create a payment                                                           |
| [activatePayment](addPayment.py)                                    | Create a payment                                                           |
| [cancelPayment](cancelPayment.py)                                   | Cancel a payment                                                           |
| [creditPayment](creditPayment.py)                                   | Credit a payment                                                           |
| [partCreditPayment](partCreditPayment.py)                           | Partially credit a payment                                                 |
| [getAccountInfo](getAccountInfo.py)                                 | Get account information                                                    |
| [getTerms](getTerms.py)                                             | Get terms                                                                  |
| [getPaymentPlans](getPaymentPlans.py)                               | Get payment plans                                                          |
| [getPaymentInfo](getPaymentInfo.py)                                 | Get payment information                                                    |
| [getDuePayments](getDuePayments.py)                                 | Get due payments                                                           |
| [getSettlements](getSettlements.py)                                 | Getsettlements                                                             |
| [getSettlementsWithDetails](getSettlementsWithDetails.py)           | Get a detailed settlement.                                                 |
| [getCustomersByName](getCustomersByName.py)                         | Get customers by name                                                      |
| [getMerchantByOrgnum](getMerchantByOrgnum.py)                       | Get merchant by orgnum                                                     |
| [getInvoicesByPno](getInvoicesByPno.py)                             | Get invoices by pno                                                        |
| [getInvoicesByCustomer](getInvoicesByCustomer.py)                   | Get invoices by customer                                                   |
| [getExchangeRate](getExchangeRate.py)                               | Get exchange rate for currency                                             |
| [getVatRate](getVatRate.py)                                         | Get VAT rate by country.                                                   |
| [getFees](getFees.py)                                               | Get fees                                                                   |
| [crediflowSearchParty](crediflowSearchParty.py)                     | Perform a crediflow search                                                 |
| [getOrderInfo](getOrderInfo.py)                                     | Get a order by hash                                                        |
| [getOrderByHash](getOrderByHash.py)                                 | Get a order by hash                                                        |
| [getInvoiceByHash](getInvoiceByHash.py)                             | Get an invoice by hash                                                     |
| [updateStatusLogOfInvoiceByHash](updateStatusLogOfInvoiceByHash.py) | Update the status log of an invoice by hash                                |
| [createInvoiceFromOrderHash](createInvoiceFromOrderHash.py)         | Create invoice from order hash                                             |
| [getAPICredentials](getAPICredentials.py)                           | Get API credentials                                                        |

### .env

EID and SECRET is designed to be put in a .env file located in the parent directory.

Here is an example .env file.

```env
EID=12345
SECRET=12345678901234567980
```

Add your own credentials to make it work.

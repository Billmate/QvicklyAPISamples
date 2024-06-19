import os
import os.path
import sys
from time import sleep
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), os.path.pardir + os.path.sep + os.path.pardir)))
from dotenv import load_dotenv
import json

load_dotenv(os.path.pardir + os.sep + ".env")
eid = os.getenv("EID")
secret = os.getenv("SECRET")

from PaymentAPI import PaymentAPI

# Create a PaymentAPI object
api = PaymentAPI(eid, secret)
paymentPayload = {
    "PaymentData": {
        "method": "256",
        "currency": "SEK",
        "language": "sv",
        "country": "SE",
        "orderid": "123456791",
        "bankid": "true",
        "accepturl": "https://example.com/accept",
        "cancelurl": "https://example.com/cancel",
        "callbackurl": "https://example.com/callback",
        "autocancel": "30",
    },
    "Customer": {
        "pno": "550101-1018",
        "Billing": {
            "firstname": "Tess T",
            "lastname": "Person",
            "street": "Testvägen 1",
            "zip": "12345",
            "city": "Testinge",
            "country": "SE",
            "phone": "0700000000",
            "email": "test@example.com",
        },
        "Shipping": {
            "firstname": "Tessy T",
            "lastname": "Pärson",
            "street": "Testvägen 2",
            "zip": "23456",
            "city": "Testinge",
            "country": "SE",
        }
    },
    "Articles": [
        {
            "artnr": "1",
            "title": "Test",
            "aprice": "10000",
            "taxrate": "25",
            "quantity": "1",
            "withouttax": "10000",
        }
    ],
    "Cart": {
        "Total": {
            "withouttax": "10000",
            "tax": "2500",
            "withtax": "12500",
        },
    },            
}
payment = api.call(function="addPayment", data=paymentPayload)
print(json.dumps(payment, indent=4))

print("Redirect customer to " + payment["data"]["url"] + "/pay")
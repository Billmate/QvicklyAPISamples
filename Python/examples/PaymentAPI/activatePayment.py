import os
import os.path
import sys
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), os.path.pardir + os.path.sep + os.path.pardir)))
from dotenv import load_dotenv
import json

load_dotenv(os.path.pardir + os.sep + ".env")
eid = os.getenv("EID")
secret = os.getenv("SECRET")

from PaymentAPI import PaymentAPI

# Create a PaymentAPI object
api = PaymentAPI(eid, secret, language="en")
payment = api.call(function="activatePayment", data={"number":"13286"})
print(json.dumps(payment, indent=4))
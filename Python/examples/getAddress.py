import os
import os.path
import sys
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), os.path.pardir)))
from PaymentAPI import PaymentAPI
from dotenv import load_dotenv
import json

load_dotenv("." + os.sep + ".env")
eid = os.getenv("EID")
secret = os.getenv("SECRET")

# Create a PaymentAPI object
api = PaymentAPI(eid, secret)
address = api.call(function="getAddress", data={"country":"SE","pno":"550101-1018"})
print(json.dumps(address, indent=4))
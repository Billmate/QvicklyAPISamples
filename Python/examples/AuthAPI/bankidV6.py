import os
import os.path
import sys
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), os.path.pardir + os.path.sep + os.path.pardir)))
import json
from dotenv import load_dotenv
import json

load_dotenv(os.path.pardir + os.sep + ".env")
username = os.getenv("USERNAME")
password = os.getenv("PASSWORD")

from AuthAPI import AuthAPI

auth = AuthAPI()
bankidV6 = auth.bankidV6()
print(json.dumps(bankidV6, indent=4))

print("Not a valid example file yet!")
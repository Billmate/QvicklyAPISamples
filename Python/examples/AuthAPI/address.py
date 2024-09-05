import base64
import os
import os.path
import sys
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), os.path.pardir + os.path.sep + os.path.pardir)))
import json
from dotenv import load_dotenv

load_dotenv(os.path.pardir + os.sep + ".env")
username = os.getenv("USERNAME")
password = os.getenv("PASSWORD")

from AuthAPI import AuthAPI

auth = AuthAPI()
login = auth.login(username, password)

token = login["token"]

address = auth.address(token)
print(json.dumps(address, indent=4))

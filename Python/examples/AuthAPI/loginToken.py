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
# Unpack jwt token
tokenPart = token.split(".")[1]
tokenPart += "=" * ((4 - len(tokenPart) % 4) % 4)
# Decode base64 string to json
jsonToken = base64.b64decode(tokenPart)
# Convert json to python dict
payloadData = json.loads(jsonToken)

loginToken = auth.loginToken(token, payloadData["iat"])
print(json.dumps(loginToken, indent=4))
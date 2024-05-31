import os
import os.path
import sys
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), os.path.pardir + os.path.sep + os.path.pardir)))
import json
from AuthAPI import AuthAPI

auth = AuthAPI()
login = auth.login("tesstperson", "123456")
print(json.dumps(login, indent=4))
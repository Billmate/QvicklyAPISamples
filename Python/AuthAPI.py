# Qvickly
#
# Qvickly Auth API - Python Class
#
# LICENSE: This source file is part of Qvickly Payment API, that is fully owned by Billmate AB
# This is not open source. For licensing queries, please contact Qvickly at support@qvickly.io.
#
# @category Qvickly
# @package AuthAPI
# @author Thomas Björk <thomas.bjork@qvickly.io>
# @copyright 2024 Billmate AB
# @license Proprietary and fully owned by Billmate AB
# @version 1.0.0
# @link http://www.qvickly.io
#
# History:
# 1.0.0 20240512 Thomas Björk: First version
#

import json
import hmac
import hashlib
import requests

class AuthAPI:
    def __init__(self, test=False, debug=False, referer=None, language=None ):
        self.test = test
        self.DEBUG = debug
        self.referer = referer or []
        self.language = language or "sv"
        self.url = "auth.billmate.se"

    def login(self, username, password):
        data = {
            "username": username,
            "password": password,
        }
        self.out("LOGIN", data)

        return self.post("login", data)    

    def post(self, url, data = None):
        data = json.dumps(data)
        headers = {'Content-Type': 'application/json', 'Content-Length': str(len(data))}
        callUrl = f"https://{self.url}/{url}"
        response = requests.post(callUrl, data=data, headers=headers)
        self.out("POST", response)
        if response.status_code != 200:
            raise Exception(f"HTTP {response.status_code} {response.text}")
        return response.json()
    
    def out(self, name, output):
        if not self.DEBUG:
            return
        joutput = json.dumps(output, indent=4)
        print(f"{name}: '{joutput}'")


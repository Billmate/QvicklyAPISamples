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
import time
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

        return self.post(f"login", data)    

    def me(self, token):
        headers = {
            "x-auth-token": token,
        }
        data = {}
        self.out("ME", headers)

        return self.get(f"me", data, headers)
    
    def address(self, token):
        headers = {
            "x-auth-token": token,
        }
        data = {}
        self.out("ADDRESS", headers)

        return self.get(f"me/address", data, headers)
    
    def merchant(self, token, id):
        headers = {
            "x-auth-token": token,
        }
        data = {}
        self.out("MERCHANT", headers)

        return self.get(f"merchant/{id}", data, headers)
    
    # Not working yet!
    def loginToken(self, token, timeStamp):
        data = {
            "time": timeStamp,
        }
        headers = {
            "x-auth-token": token,
        }

        self.out("LOGIN TOKEN", [data, headers])

        return self.post(f"login/token", data, headers)
    
    # Not working yet!
    def bankidV6(self):
        data = {}
        return self.post(f"bankidV6", data)

    # Not working yet!
    def bankidV6get(self, orderRef):
        data = {}
        return self.get(f"bankidV6/{orderRef}", data)

    # Not working yet!
    def bankidV6delete(self):
        data = {}
        return self.delete(f"bankidV6/{orderRef}", data)

    # Not working yet!
    def bankidV6authenticate(self):
        data = {}
        return self.post(f"bankidV6/authenticate", data)

    # Not working yet!
    def bankidV6sign(self):
        data = {}
        return self.post(f"bankidV6/sign", data)

    # Not working yet!
    def bankidV6signCollect(self, orderRef):
        data = {}
        return self.post(f"bankidV6/sign/collect/{orderRef}", data)

    # Not working yet!
    def bankidV6signName(self, name):
        data = {}
        return self.post(f"bankidV6/sign/{name}", data)

    def get(self, url, data = None, headers = None):
        data = json.dumps(data)
        sendHeaders = {'Content-Type': 'application/json', 'Content-Length': str(len(data))}
        if headers is not None:
            sendHeaders.update(headers)
        callUrl = f"https://{self.url}/{url}"
        response = requests.get(callUrl, data=data, headers=sendHeaders)
        self.out("GET", response.text)
        if response.status_code != 200:
            raise Exception(f"HTTP {response.status_code} {response.text}")
        return response.json()
    
    def post(self, url, data = None, headers = None):
        data = json.dumps(data)
        sendHeaders = {'Content-Type': 'application/json', 'Content-Length': str(len(data))}
        if headers is not None:
            sendHeaders.update(headers)
        callUrl = f"https://{self.url}/{url}"
        response = requests.post(callUrl, data=data, headers=sendHeaders)
        self.out("POST", response.text)
        if response.status_code != 200:
            raise Exception(f"HTTP {response.status_code} {response.text} {callUrl}")
        return response.json()
    
    def delete(self, url, data = None, headers = None):
        data = json.dumps(data)
        sendHeaders = {'Content-Type': 'application/json', 'Content-Length': str(len(data))}
        if headers is not None:
            sendHeaders.update(headers)
        callUrl = f"https://{self.url}/{url}"
        response = requests.delete(callUrl, data=data, headers=sendHeaders)
        self.out("DELETE", response.text)
        if response.status_code != 200:
            raise Exception(f"HTTP {response.status_code} {response.text}")
        return response.json()
    
    def out(self, name, output):
        if not self.DEBUG:
            return
        print(f"{name}: {output}")
        joutput = json.dumps(output, indent=4)
        print(f"{name}: '{joutput}'")


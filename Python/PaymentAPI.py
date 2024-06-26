# Qvickly
#
# Qvickly Payment API - Python Class
#
# LICENSE: This source file is part of Qvickly Payment API, that is fully owned by Billmate AB
# This is not open source. For licensing queries, please contact Qvickly at support@qvickly.io.
#
# @category Qvickly
# @package PaymentAPI
# @author Thomas Björk <thomas.bjork@qvickly.io>
# @copyright 2024 Billmate AB
# @license Proprietary and fully owned by Billmate AB
# @version 1.0.0
# @link http://www.qvickly.io
#
# History:
# 1.0.0 20240212 Thomas Björk: First version
#

import json
import hmac
import hashlib
import requests
import time

class PaymentAPI:
    def __init__(self, id, key, ssl=True, test=False, debug=False, referer=None, language=None ):
        self.ID = id
        self.KEY = key
        self.URL = "api.qvickly.io"
        self.MODE = "CURL"
        self.SSL = ssl
        self.TEST = test
        self.DEBUG = debug
        self.REFERER = referer or []
        self.LANGUAGE = language or "sv"

    def call(self, function, data = None):
        if data is None:
            data = { "dummyData": time.time_ns() }
        values = {
            "credentials": {
                "id": self.ID,
                "hash": self.hash(data),
                "version": "2.3.0",
                "client": "Qvickly:Python:1.0.0",
                "time": time.time(),
                "test": "1" if self.TEST else "0",
                "language": self.LANGUAGE,
            },
            "data": data,
            "function": function,
        }
        self.out("CALLED FUNCTION", function)
        self.out("PARAMETERS TO BE SENT", values)

        response = None

        if self.MODE == "CURL":
            response = self.curl(json.dumps(values))

        return self.verify_hash(response)

    def verify_hash(self, response):
        try:
            response_array = response if isinstance(response, dict) else json.loads(response)
        except json.JSONDecodeError:
            return response
        
        if not response_array and not isinstance(response, dict):
            return response

        if isinstance(response, dict):
            response_array['credentials'] = json.loads(response['credentials'])
            response_array['data'] = json.loads(response['data'])

        if "credentials" in response_array:
            hash_value = self.hash(response_array["data"])

            if response_array["credentials"]["hash"] == hash_value:
                return response_array
            else:
                return {"code": 9511, "message": "Verification error", "hash": hash_value,
                        "hash_received": response_array["credentials"]["hash"]}

        return {k: v for k, v in response_array.items()}

    def curl(self, parameters):
        url = f"http{'s' if self.SSL else ''}://{self.URL}"
        headers = {'Content-Type': 'application/json', 'Content-Length': str(len(parameters))}
        response = requests.post(url, data=parameters, headers=headers)

        if response.status_code != 200:
            return json.dumps({"error": 9510, "message": f"HTTP Error {response.status_code}"})

        return response.text

    def hash(self, args):
        self.out("TO BE HASHED DATA", args)
        dataString = json.dumps(args, separators=(',', ':'))
        dataString = dataString.replace('/', '\\/')
        secretbytes = bytes(self.KEY, 'utf-8')
        return hmac.new(secretbytes, dataString.encode("utf-8"), hashlib.sha512).hexdigest()

    def out(self, name, output):
        if not self.DEBUG:
            return
        joutput = json.dumps(output, indent=4)
        print(f"{name}: '{joutput}'")


# # Example usage:
# payment_api = PaymentAPI(id="your_id", key="your_key", ssl=True, test=False, debug=True, referer={"Referer": "example.com"})
# result = payment_api.call("example_function", {"param1": "value1", "param2": "value2"})
# print(result)

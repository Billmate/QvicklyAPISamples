"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
const axios = require("axios");

const CLIENT_NAME = ''
const BASE_URI = ''

class QvicklyPaymentAPI {
    constructor(eid, secret, test = false) {
        this.eid = eid;
        this.secret = secret;
        this.test = test;
    }

    hash(jsonEncodedRequestData) {
        return crypto.createHmac('sha512', this.secret).update(jsonEncodedRequestData).digest('hex');
    }

    async call(func, data, extraHeaders = {}) {
        const credentials = {
            id: this.eid,
            hash: this.hash(JSON.stringify(data)),
            version: '2.3.0',
            client: CLIENT_NAME,
            language: 'sv',
            test: false
        };
        credentials.test = this.test;
        const requestData = JSON.stringify({
            credentials,
            data,
            function: func
        });
        const headers = {
            ...extraHeaders, ...{
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(requestData, "utf-8")
            }
        };
        let responseRaw;
        try {
            responseRaw = await axios.default.post(BASE_URI, requestData, {
                withCredentials: true,
                headers: headers,
                transformResponse: (res) => res
            });
        }
        catch (error) {
            throw new Error(error.message);
        }
        const response = JSON.parse(responseRaw.data);
        if (response.code > 0) {
            throw new Error(`${response.code} - ${response.message}`);
        }
        else {
            const tobeHashed = responseRaw.data.substring(responseRaw.data.indexOf('"data":') + 7, responseRaw.data.length - 1);
            /* istanbul ignore next */
            if (response.credentials.hash !== this.hash(tobeHashed)) {
                throw new Error(`9090 - Response credentials hash does not match the expected hash.`);
            }
            return response.data;
        }
    }
}
exports.default = QvicklyPaymentAPI;

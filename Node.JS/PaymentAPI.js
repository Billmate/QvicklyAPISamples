/**
 * Qvickly
 *
 * Qvickly Payment API - Node.JS Class
 *
 * LICENSE: This source file is part of Qvickly Payment API, that is fully owned by Billmate AB
 * This is not open source. For licensing queries, please contact Qvickly at support@qvickly.io.
 *
 * @category Qvickly
 * @package PaymentAPI
 * @author Thomas Björk <thomas.bjork@qvickly.io>
 * @copyright 2013-2024 Billmate AB
 * @license Proprietary and fully owned by Billmate AB
 * @version 1.0.0
 * @link http://www.qvickly.io
 *
 * History:
 * 1.0.0 20240212 Thomas Björk: First version
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
const axios = require("axios");

const CLIENT_NAME = "Qvickly:Node:1.0.0";
const API_VERSION = "2.3.0";
const BASE_URI = "https://api.qvickly.io/";

class QvicklyPaymentAPI {
  constructor(eid, secret, test = false) {
    this.eid = eid;
    this.secret = secret;
    this.test = test;
  }

  hash(jsonEncodedRequestData) {
    return crypto
      .createHmac("sha512", this.secret)
      .update(jsonEncodedRequestData)
      .digest("hex");
  }

  async call(func, data, extraHeaders = {}) {
    const credentials = {
      id: this.eid,
      hash: this.hash(JSON.stringify(data)),
      version: API_VERSION,
      client: CLIENT_NAME,
      language: "sv",
      test: false,
    };
    credentials.test = this.test;
    const requestData = JSON.stringify({
      credentials,
      data,
      function: func,
    });
    const headers = {
      ...extraHeaders,
      ...{
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(requestData, "utf-8"),
      },
    };
    let responseRaw;
    try {
      responseRaw = await axios.default.post(BASE_URI, requestData, {
        withCredentials: true,
        headers: headers,
        transformResponse: (res) => res,
      });
    } catch (error) {
      throw new Error(error.message);
    }
    const response = JSON.parse(responseRaw.data);
    if (response.code > 0) {
      throw new Error(`${response.code} - ${response.message}`);
    } else {
      const tobeHashed = responseRaw.data.substring(
        responseRaw.data.indexOf('"data":') + 7,
        responseRaw.data.length - 1
      );
      /* istanbul ignore next */
      if (response.credentials.hash !== this.hash(tobeHashed)) {
        throw new Error(
          `9090 - Response credentials hash does not match the expected hash.`
        );
      }
      return response.data;
    }
  }
}
exports.default = QvicklyPaymentAPI;

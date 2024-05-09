/**
 * Qvickly
 *
 * Qvickly Payment API - Deno Class
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
 * 1.0.0 20240313 Thomas Björk: First version
 */

import { hmac } from "https://deno.land/x/hmac/mod.ts";
import { load } from "https://deno.land/std/dotenv/mod.ts";

const env = await load();

const CLIENT_NAME = 'Qvickly:Deno:1.0.0'
const API_VERSION = '2.5.0'
const BASE_URI = 'https://api.qvickly.io/'


class QvicklyPaymentAPI {
    eid: string;
    secret: string;
    test: boolean;

    constructor(eid: string, secret: string, test = false) {
        this.eid = eid;
        this.secret = secret;
        this.test = test;
    }

    hash(jsonEncodedRequestData: string) {
        const hash = hmac("sha512", this.secret, jsonEncodedRequestData, "utf-8", "hex")
        return hash;
    }

    async call(func: string, data: any = null, extraHeaders = {}) {
        if (!data) {
            data = {
                dummyData: "dummy",
            };
        }
        const credentials = {
            id: this.eid,
            hash: this.hash(JSON.stringify(data)),
            version: API_VERSION,
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
                'Content-Length': new TextEncoder().encode(requestData).length
            }
        };
        let responseRaw;
        try {
            responseRaw = await fetch(BASE_URI, {
                "method": 'POST',
                "headers": headers as Record<string, any>,
                "body": requestData
            });
        }
        catch (error) {
            throw new Error(error.message);
        }
        const responseText = await responseRaw.text();

        let response;
        try {
          response = JSON.parse(responseText);
        } catch (error) {
          return responseText;
        }
    
        if (response.code > 0) {
            throw new Error(`${response.code} - ${response.message}`);
        }
        else {
            const tobeHashed = responseText.substring(
                responseText.indexOf('"data":') + 7,
                responseText.length - 1
            );
            if (response.credentials.hash !== this.hash(tobeHashed)) {
                throw new Error(`9090 - Response credentials hash does not match the expected hash.`);
            }
            return response;
        }
    }
}

export default QvicklyPaymentAPI;
export { QvicklyPaymentAPI, env };
<?php
/**
 * Qvickly
 *
 * Qvickly Payment API - PHP Class
 *
 * LICENSE: This source file is part of Qvickly Payment API, that is fully owned by Billmate AB
 * This is not open source. For licensing queries, please contact Qvickly at support@qvickly.io.
 *
 * @category Qvickly
 * @package PaymentAPI
 * @author Thomas Björk <thomas.bjork@qvickly.io>
 * @copyright 2013-2024 Billmate AB
 * @license Proprietary and fully owned by Billmate AB
 * @version 2.2.1
 * @link http://www.qvickly.io
 *
 * History:
 * 2.0 20140625 Yuksel Findik: Second Version
 * 2.0.8 20141125 Yuksel Findik: Url is updated. Some variables are updated
 * 2.0.9 20141204 Yuksel Findik: Returns array and verifies the data is safe
 * 2.1.0 20141215 Yuksel Findik: Unnecessary variables are removed
 * 2.1.1 20141218 Yuksel Findik: If response can not be json_decoded, will return actual response
 * 2.1.2 20150112 Yuksel Findik: verify_hash function is added.
 * 2.1.4 20150115 Yuksel Findik: verify_hash is improved. The serverdata is added instead of useragent
 * 2.1.5 20150122 Yuksel Findik: Will make a utf8_decode before it returns the result
 * 2.1.6 20150129 Yuksel Findik: Language is added as an optional paramater in credentials, version_compare is added for Curl setup
 * 2.1.7 20150922 Yuksel Findik: PHP Notice for CURLOPT_SSL_VERIFYHOST is fixed
 * 2.1.8 20151103 Yuksel Findik: CURLOPT_CONNECTTIMEOUT is added
 * 2.2.0 20240212 Thomas Björk: Rebranded och fixed code
 * 2.2.1 20240601 Thomas Björk: Removed SSL option
 */
class PaymentAPI
{
    var $ID = "";
    var $KEY = "";
    var $URL = "api.qvickly.io";
    var $MODE = "CURL";
    var $TEST = false;
    var $DEBUG = false;
    var $REFERER = false;
    public function __construct(
        $id,
        $key,
        $test = false,
        $debug = false,
        $referer = []
    ) {
        $this->ID = $id;
        $this->KEY = $key;
        defined("QVICKLY_CLIENT") || define("QVICKLY_CLIENT", "Qvickly:PHPLegacy:2.2.1");
        defined("QVICKLY_SERVER") || define("QVICKLY_SERVER", "2.5.0");
        defined("QVICKLY_LANGUAGE") || define("QVICKLY_LANGUAGE", "");
        $this->DEBUG = $debug;
        $this->TEST = $test;
        $this->REFERER = $referer;
    }
    public function __call($name, $args)
    {
        if (count($args) == 0) {
            return;
        } //Function call should be skipped
        return $this->call($name, $args[0]);
    }
    function call($function, $params)
    {
        $values = [
            "credentials" => [
                "id" => $this->ID,
                "hash" => $this->hash(json_encode($params)),
                "version" => QVICKLY_SERVER,
                "client" => QVICKLY_CLIENT,
                "serverdata" => $this->REFERER ? array_merge($_SERVER, $this->REFERER) : $_SERVER,
                "time" => microtime(true),
                "test" => $this->TEST ? "1" : "0",
                "language" => QVICKLY_LANGUAGE,
            ],
            "data" => $params,
            "function" => $function,
        ];
        $this->out("CALLED FUNCTION", $function);
        $this->out("PARAMETERS TO BE SENT", $values);
        switch ($this->MODE) {
            case "CURL":
                $response = $this->curl(json_encode($values));
                break;
        }
        return $this->verify_hash($response);
    }
    function verify_hash($response)
    {
        $response_array = is_array($response)
            ? $response
            : json_decode($response, true);
        //If it is not decodable, the actual response will be returned.
        if (!$response_array && !is_array($response)) {
            return $response;
        }
        if (is_array($response)) {
            $response_array["credentials"] = json_decode(
                $response["credentials"],
                true
            );
            $response_array["data"] = json_decode($response["data"], true);
        }
        //If it is a valid response without any errors, it will be verified with the hash.
        if (isset($response_array["credentials"])) {
            $hash = $this->hash(json_encode($response_array["data"]));
            //If hash matches, the data will be returnt as array.
            if ($response_array["credentials"]["hash"] == $hash) {
                return $response_array["data"];
            } else {
                return [
                    "code" => 9511,
                    "message" => "Verification error",
                    "hash" => $hash,
                    "hash_received" => $response_array["credentials"]["hash"],
                ];
            }
        }
        return array_map("utf8_decode", $response_array);
    }
    function curl($parameters)
    {
        $ch = curl_init();
        curl_setopt(
            $ch,
            CURLOPT_URL,
            "https://" . $this->URL
        );
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
        @curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            "Content-Type: application/json",
            "Content-Length: " . strlen($parameters),
        ]);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $parameters);
        $data = curl_exec($ch);
        if (curl_errno($ch)) {
            $curlerror = curl_error($ch);
            return json_encode([
                "error" => 9510,
                "message" => htmlentities($curlerror),
            ]);
        } else {
            curl_close($ch);
        }
        return $data;
    }
    function hash($args)
    {
        $this->out("TO BE HASHED DATA", $args);
        return hash_hmac("sha512", $args, $this->KEY);
    }
    function out($name, $out)
    {
        if (!$this->DEBUG) {
            return;
        }
        print "$name: '";
        if (is_array($out) or is_object($out)) {
            print_r($out);
        } else {
            print $out;
        }
        print "'\n";
    }
}
?>
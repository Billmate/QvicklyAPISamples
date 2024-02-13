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
 * @version 1.0.0
 * @link http://www.qvickly.io
 *
 * History:
 * 1.0.0 20240212 Thomas Björk: First version
 */

class PaymentAPI {
    private string $ID;
    private string $KEY;
    private string $URL = "api.qvickly.io";
    private string $MODE = "CURL";
    private string $LANGUAGE = "sv";
    private bool $SSL = true;
    private bool $TEST = false;
    private bool $DEBUG = false;
    private array $REFERER = [];

    public function __construct(
        string $id,
        string $key,
        bool $ssl = true,
        bool $test = false,
        bool $debug = false,
        string $language = "sv",
        array $referer = []
    ) {
        $this->ID = $id;
        $this->KEY = $key;
        defined('QVICKLY_CLIENT') || define('QVICKLY_CLIENT', "Qvickly:2.2.0");
        defined('QVICKLY_SERVER') || define('QVICKLY_SERVER', "2.2.3");
        $this->SSL = $ssl;
        $this->DEBUG = $debug;
        $this->TEST = $test;
        $this->LANGUAGE = $language;
        $this->REFERER = $referer;
    }

    public function __call(string $name, array $args): mixed {
        if (count($args) === 0) {
            return null; // Function call should be skipped
        }
        return $this->call($name, $args[0]);
    }

    public function call(string $function, array $params): mixed {
        $values = [
            "credentials" => [
                "id" => $this->ID,
                "hash" => $this->hash(json_encode($params)),
                "version" => QVICKLY_SERVER,
                "client" => QVICKLY_CLIENT,
                "serverdata" => array_merge($_SERVER, $this->REFERER),
                "time" => microtime(true),
                "test" => $this->TEST ? "1" : "0",
                "language" => $this->LANGUAGE,
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

    public function verify_hash(mixed $response): mixed {
        $response_array = is_array($response) ? $response : json_decode($response, true);

        if (!$response_array && !is_array($response)) {
            return $response;
        }

        if (is_array($response)) {
            $response_array['credentials'] = json_decode($response['credentials'], true);
            $response_array['data'] = json_decode($response['data'], true);
        }

        if (isset($response_array["credentials"])) {
            $hash = $this->hash(json_encode($response_array["data"]));

            if ($response_array["credentials"]["hash"] === $hash) {
                return $response_array["data"];
            } else {
                return ["code" => 9511, "message" => "Verification error", "hash" => $hash, "hash_received" => $response_array["credentials"]["hash"]];
            }
        }

        return array_map("utf8_decode", $response_array);
    }

    public function curl(string $parameters): string {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, "http" . ($this->SSL ? "s" : "") . "://" . $this->URL);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, $this->SSL);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);

        $vh = $this->SSL
            ? ((function_exists("phpversion") && function_exists("version_compare") && version_compare(phpversion(), '5.4', '>=')) ? 2 : true)
            : false;

        if ($this->SSL) {
            if (function_exists("phpversion") && function_exists("version_compare")) {
                $cv = curl_version();
                $vh = version_compare(phpversion(), '5.4', '>=') || version_compare($cv["version"], '7.28.1', '>=');
            }
        }

        @curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, $vh);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json',
            'Content-Length: ' . strlen($parameters),
        ]);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $parameters);

        $data = curl_exec($ch);

        if (curl_errno($ch)) {
            $curlerror = curl_error($ch);
            return json_encode(["error" => 9510, "message" => htmlentities($curlerror)]);
        } else {
            curl_close($ch);
        }

        return $data;
    }

    private function hash(string $args): string {
        $this->out("TO BE HASHED DATA", $args);
        return hash_hmac('sha512', $args, $this->KEY);
    }

    private function out(string $name, mixed $out): void {
        if (!$this->DEBUG) {
            return;
        }

        print "$name: '";

        if (is_array($out) || is_object($out)) {
            print_r($out);
        } else {
            print $out;
        }

        print "'\n";
    }
}
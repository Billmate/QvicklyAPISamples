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
 * 3.0.0 20240212 Thomas Björk: First updated version not based on PHP 5.x
 */

declare(strict_types=1);

namespace Qvickly;

class PaymentAPI
{
    private string $id;
    private string $key;
    private string $url = "api.qvickly.io";
    private string $mode = "CURL";
    private bool $ssl;
    private bool $test;
    private bool $debug;
    private array $referer;

    public function __construct(
        string $id,
        string $key,
        bool $ssl = true,
        bool $test = false,
        bool $debug = false,
        array $referer = []
    ) {
        $this->id = $id;
        $this->key = $key;
        $this->ssl = $ssl;
        $this->debug = $debug;
        $this->test = $test;
        $this->referer = $referer;
        
        defined('QVICKLY_CLIENT') || define('QVICKLY_CLIENT', 'Qvickly:PHPLegacy:2.2.0');
        defined('QVICKLY_SERVER') || define('QVICKLY_SERVER', '2.3.0');
        defined('QVICKLY_LANGUAGE') || define('QVICKLY_LANGUAGE', '');
    }

    public function __call(string $name, array $args)
    {
        if (count($args) === 0) {
            return;
        }
        return $this->call($name, $args[0]);
    }

    private function call(string $function, array $params)
    {
        $values = [
            'credentials' => [
                'id' => $this->id,
                'hash' => $this->hash(json_encode($params)),
                'version' => QVICKLY_SERVER,
                'client' => QVICKLY_CLIENT,
                'serverdata' => array_merge($_SERVER, $this->referer),
                'time' => microtime(true),
                'test' => $this->test ? '1' : '0',
                'language' => QVICKLY_LANGUAGE,
            ],
            'data' => $params,
            'function' => $function,
        ];

        $this->out('CALLED FUNCTION', $function);
        $this->out('PARAMETERS TO BE SENT', $values);

        switch ($this->mode) {
            case 'CURL':
                $response = $this->curl(json_encode($values));
                break;
        }

        return $this->verifyHash($response);
    }

    private function verifyHash($response)
    {
        $responseArray = is_array($response)
            ? $response
            : json_decode($response, true);

        if (!$responseArray && !is_array($response)) {
            return $response;
        }

        if (is_array($response)) {
            $responseArray['credentials'] = json_decode($response['credentials'], true);
            $responseArray['data'] = json_decode($response['data'], true);
        }

        if (isset($responseArray['credentials'])) {
            $hash = $this->hash(json_encode($responseArray['data']));

            if ($responseArray['credentials']['hash'] === $hash) {
                return $responseArray['data'];
            }

            return [
                'code' => 9511,
                'message' => 'Verification error',
                'hash' => $hash,
                'hash_received' => $responseArray['credentials']['hash'],
            ];
        }

        return array_map('utf8_decode', $responseArray);
    }

    private function curl(string $parameters)
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'http' . ($this->ssl ? 's' : '') . '://' . $this->url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, $this->ssl);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);

        $vh = $this->ssl
            ? (function_exists('phpversion') && function_exists('version_compare') && version_compare(phpversion(), '5.4', '>='))
                ? 2
                : true
            : false;

        if ($this->ssl) {
            if (function_exists('phpversion') && function_exists('version_compare')) {
                $cv = curl_version();
                if (version_compare(phpversion(), '5.4', '>=') || version_compare($cv['version'], '7.28.1', '>=')) {
                    $vh = 2;
                } else {
                    $vh = true;
                }
            } else {
                $vh = true;
            }
        } else {
            $vh = false;
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
            return json_encode([
                'error' => 9510,
                'message' => htmlentities($curlerror),
            ]);
        }

        curl_close($ch);

        return $data;
    }

    public function hash(string $args): string
    {
        $this->out('TO BE HASHED DATA', $args);
        return hash_hmac('sha512', $args, $this->key);
    }

    private function out(string $name, $out): void
    {
        if (!$this->debug) {
            return;
        }
        echo "$name: '";
        if (is_array($out) || is_object($out)) {
            print_r($out);
        } else {
            echo $out;
        }
        echo "'\n";
    }
}

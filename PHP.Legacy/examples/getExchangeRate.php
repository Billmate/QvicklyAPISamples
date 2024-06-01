<?php
include('../PaymentAPI.php');
$test = false;
$debug = false;

/* Credentials for Auth */

$id = "12345";
$key = "123451234512";
define("QVICKLY_SERVER", "2.5.0"); // API version
define("QVICKLY_CLIENT", "Pluginname:Qvickly:1.0");
define("QVICKLY_LANGUAGE", "sv");
$api = new PaymentAPI($id, $key, $test, $debug);

$values = array(
    "currency" => "USD",
    "date" => "2024-04-30"
);

print_r($api->getExchangeRate($values));
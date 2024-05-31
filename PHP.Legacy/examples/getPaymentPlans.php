<?php
include('../PaymentAPI.php');
$test = true;
$ssl = true;
$debug = false;

/* Credentials for Auth */

$id = "12345";
$key = "123451234512";
define("QVICKLY_SERVER", "2.5.0"); // API version
define("QVICKLY_CLIENT", "Pluginname:Qvickly:1.0");
define("QVICKLY_LANGUAGE", "sv");
$api = new PaymentAPI($id, $key, $ssl, $test, $debug);
$values = array();

/* Payment Data */

/**
* @param array Payment Data : Buyer details.
  */

$values["PaymentData"] = array(
    "currency" => "SEK",
    "language" => "sv",
    "country" => "SE",
    "totalwithtax" => "50000"
);

print_r($api->getPaymentplans($values));
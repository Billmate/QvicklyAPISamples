<?php
include('../PaymentAPI.php');
$test = true;
$debug = false;

/* Credentials for Auth */

$id = "12345";
$key = "123451234512";
define("QVICKLY_SERVER", "2.5.0"); // API version
define("QVICKLY_CLIENT", "Pluginname:Qvickly:1.0");
define("QVICKLY_LANGUAGE", "sv");
$api = new PaymentAPI($id, $key, $test, $debug);
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

echo json_encode($api->getPaymentplans($values), JSON_PRETTY_PRINT);
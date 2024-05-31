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

/* Customer Data */
/**
* @param array Customer Data : Customer details.
  */

$values = array(
    "pno" => "550101-1018",
    "country" => "SE"
);

print_r($api->getAddress($values));
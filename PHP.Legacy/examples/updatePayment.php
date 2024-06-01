<?php
include('../PaymentAPI.php');
$test = true;
$debug = false;

/* Credentials for Auth */

$id = "12345";
$key = "123451234512";
define("QVICKLY_SERVER", "2.5.0");    /* API version */
define("QVICKLY_CLIENT", "Pluginname:Qvickly:1.0");
define("QVICKLY_LANGUAGE", "sv");
$api = new PaymentAPI($id,$key,$test,$debug);
$values = array();

/* Payment Data */
/**
* @param array Payment Data : Buyer details.
  */

$values["PaymentData"] = array(
    "number" => "1000235",
    "currency" => "SEK",
    "language" => "sv",
    "country" => "SE",
    "orderid" => "P123456789",
    "logo" => "Logo2.jpg",
);

/**
* @param array $values : Information about the invoice values.
  */

$values["PaymentInfo"] = array(
    "paymentdate" => "2014-07-31",
    "paymentterms" => "14",
    "yourreference" => "Purchaser X",
    "ourreference" => "Seller Y",
    "projectname" => "Project Z",
    "delivery" => "Post",
    "deliveryterms" => "FOB",
);

$values["Customer"] = array(
    "nr" => "12",
    "pno" => "550101-1018",
    "Billing" => array(
        "firstname" => "Testperson",
        "lastname" => "Approved",
        "Company" => "Company",
        "street" => "Teststreet",
        "street2" => "Street2",
        "zip" => "12345",
        "city" => "Testcity",
        "country" => "Sweden",
        "phone" => "0712-345678",
        "email" => "test@developer.qvickly.io",
    ),
    "Shipping" => array(
        "firstname" => "Testperson",
        "lastname" => "Approved",
        "Company" => "Company",
        "street" => "Teststreet",
        "street2" => "Shipping Street2",
        "zip" => "12345",
        "city" => "Testcity",
        "country" => "Sweden",
        "phone" => "0711-345678",
    )
);

/**
* @param array articles : article details.
  */

$values["Articles"][0] = array(
    "artnr" => "A123",
    "title" => "Article 1",
    "quantity" => "2",
    "aprice" => "1234",
    "taxrate" => "25",
    "discount" => "0",
    "withouttax" => "2468"
);
$values["Articles"][1] = array(
    "artnr" => "B456",
    "title" => "Article 2",
    "quantity" => "3.5",
    "aprice" => "56780",
    "taxrate" => "25",
    "discount" => "10",
    "withouttax" => "178857"
);

/**
* @param array Cart Data : Cart details.
  */

$values["Cart"] = array(
    "Handling" => array(
        "withouttax" => "1000",
        "taxrate" => "25"
    ),
    "Shipping" => array(
        "withouttax" => "3000",
        "taxrate" => "25"
    ),
    "Total" => array(
        "withouttax" => "185325",
        "tax" => "46331",
        "rounding" => "44",
        "withtax" => "231700"
    )
);

print_r($api->updatePayment($values));

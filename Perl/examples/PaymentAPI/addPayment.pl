#!/usr/bin/perl
use strict;
use warnings;
use JSON::PP;
use Data::Dumper;
use Tie::IxHash;
use lib '../..';
require "TieThisHash.pm";
require "PaymentAPI.pl";
require "LoadEnv.pl";
LoadEnv('../../.env');

my $test = 1;
my $debug = 0;

# Credentials for Auth
my $id = $ENV{"EID"};
my $key = $ENV{"SECRET"};

my $api = PaymentAPI->new($id, $key, $test, $debug);
my $values = {};

# Need to tie the hash to preserve the order of the keys
tie %$values, 'Tie::IxHash' or die "tie(\%values, 'Tie::IxHash') failed!\n";


$values->{"PaymentData"} = TieThisHash({
    "method" => "1",
    "paymentplanid" => "",
    "currency" => "SEK",
    "language" => "sv",
    "country" => "SE",
    "autoactivate" => "0",
    "orderid" => "P123456789",
    "logo" => "Logo2.jpg",
});

$values->{"PaymentInfo"} = TieThisHash({
    "paymentdate" => "2014-07-31",
    "paymentterms" => "14",
    "yourreference" => "Purchaser X",
    "ourreference" => "Seller Y",
    "projectname" => "Project Z",
    "delivery" => "Post",
    "deliveryterms" => "FOB",
    "autocredit" => "false",
});

$values->{"Card"} = TieThisHash({
    "promptname" => "",
    "recurring" => "",
    "recurringnr" => "",
    "accepturl" => "https://www.mystore.se/completedpayment",
    "cancelurl" => "https://www.mystore.se/failedpayment",
    "returnmethod" => "",
    "callbackurl" => "https://www.mystore.se/callback.php",
});

$values->{"Customer"} = TieThisHash({
    "nr" => "12",
    "pno" => "550101-1018",
    "Billing" => TieThisHash({
        "firstname" => "Testperson",
        "lastname" => "Approved",
        "company" => "Company",
        "street" => "Teststreet",
        "street2" => "Street2",
        "zip" => "12345",
        "city" => "Testcity",
        "country" => "SE",
        "phone" => "0712-345678",
        "email" => "test\@developer.qvickly.io",
    }),
    "Shipping" => TieThisHash({
        "firstname" => "Testperson",
        "lastname" => "Approved",
        "company" => "Company",
        "street" => "Teststreet",
        "street2" => "Shipping Street2",
        "zip" => "12345",
        "city" => "Testcity",
        "country" => "SE",
        "phone" => "0711-345678",
    })
});

$values->{"Articles"} = [];
push @{$values->{"Articles"}}, TieThisHash({
    "artnr" => "A123",
    "title" => "Article 1",
    "quantity" => "2",
    "aprice" => "1234",
    "taxrate" => "25",
    "discount" => "0",
    "withouttax" => "2468",
});
push @{$values->{"Articles"}}, TieThisHash({
    "artnr" => "B456",
    "title" => "Article 2",
    "quantity" => "3.5",
    "aprice" => "56780",
    "taxrate" => "25",
    "discount" => "10",
    "withouttax" => "178857",
});

$values->{"Cart"} = TieThisHash({
    "Handling" => TieThisHash({
        "withouttax" => "1000",
        "taxrate" => "25"
    }),
    "Shipping" => TieThisHash({
        "withouttax" => "3000",
        "taxrate" => "25"
    }),
    "Total" => TieThisHash({
        "withouttax" => "185325",
        "tax" => "46331",
        "rounding" => "44",
        "withtax" => "231700"
    })
});

print(Dumper($api->call("addPayment", $values)));

1;
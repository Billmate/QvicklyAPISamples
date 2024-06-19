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
    "number" => "12345",
    "method" => "8",
    "currency" => "SEK",
    "language" => "sv",
    "country" => "SE",
    "orderid" => "123456",
    "bankid" => "true",
    "accepturl" => "https://example.com/accept",
    "cancelurl" => "https://example.com/cancel",
    "callbackurl" => "https://example.com/callback"
});


$values->{"Customer"} = TieThisHash({
    "pno" => "550101-1018",
    "Billing" => TieThisHash({
        "firstname" => "Tess T",
        "lastname" => "Person",
        "street" => "Testvägen 1",
        "zip" => "12345",
        "city" => "Testinge",
        "country" => "SE",
        "phone" => "0700000000",
        "email" => "test\@example.com"
    })
});

$values->{"Articles"} = [];
push @{$values->{"Articles"}}, TieThisHash({
    "artnr" => "1",
    "title" => "Test",
    "aprice" => "10000",
    "taxrate" => "25",
    "quantity" => "1",
    "withouttax" => "10000"
});


$values->{"Cart"} = TieThisHash({
    "Total" => TieThisHash({
        "withouttax" => "10000",
        "tax" => "2500",
        "withtax" => "12500"
    })
});

print(Dumper($api->call("updatePayment", $values)));

1;
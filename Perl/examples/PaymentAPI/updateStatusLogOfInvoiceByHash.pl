#!/usr/bin/perl
use strict;
use warnings;
use JSON::PP;
use Data::Dumper;
use lib '../..';
require "PaymentAPI.pl";
require "LoadEnv.pl";
LoadEnv('../../.env');

my $test = 0;
my $debug = 0;

# Credentials for Auth
my $id = $ENV{"EID"};
my $key = $ENV{"SECRET"};

my $api = PaymentAPI->new($id, $key, $test, $debug);
my $values = {
    "hash" => "123456abc123456abc123456abc12345",
    "body" => {
        "text" => "Status log updated by API",
    }
};
print(Dumper($api->call("updateStatusLogOfInvoiceByHash", $values)));

1;
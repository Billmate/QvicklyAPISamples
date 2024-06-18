#!/usr/bin/perl

# Qvickly
#
# Qvickly Payment API - Perl Class
#
# LICENSE: This source file is part of Qvickly Payment API, that is fully owned by Billmate AB
# This is not open source. For licensing queries, please contact Qvickly at support@qvickly.io.
#
# @category Qvickly
# @package PaymentAPI
# @author Thomas Björk <thomas.bjork@qvickly.io>
# @copyright 2024 Billmate AB
# @license Proprietary and fully owned by Billmate AB
# @version 1.0.0
# @link http://www.qvickly.io
#
# History:
# 1.0.0 20240616 Thomas Björk: First version
#
package PaymentAPI;

use strict;
use warnings;
use JSON::PP;
use LWP::UserAgent;
use Digest::SHA qw(hmac_sha512_hex);
use Encode qw(decode_utf8);

use Tie::IxHash;
use Monkey::Patch qw[patch_package];

# Monkey-patch JSON::PP::object() subroutine to use Tie::IxHash.
my $handle = patch_package 'JSON::PP' => 'object' => sub {
    my $orig = shift;
    my %obj;
    tie %obj, 'Tie::IxHash' or die "tie(\%obj, 'Tie::IxHash') failed!\n";
    $orig->(\%obj)
};

use constant {
    QVICKLY_SERVER => "2.5.0",
    QVICKLY_CLIENT => "Qvickly:Perl:1.0.0",
    QVICKLY_LANGUAGE => "sv"
};

sub new {
    my ($class, $id, $key, $test, $debug, $referer) = @_;
    $test //= 0;
    $debug //= 0;
    $referer //= {};

    my $self = {
        ID => $id,
        KEY => $key,
        URL => 'api.qvickly.io',
        MODE => 'CURL',
        TEST => $test,
        DEBUG => $debug,
        REFERER => $referer,
        VERSION => QVICKLY_SERVER,
        CLIENT => QVICKLY_CLIENT,
        LANGUAGE => QVICKLY_LANGUAGE,
    };

    bless $self, $class;
    return $self;
}

sub call {
    my ($self, $function, $params) = @_;

    my $values = {
        credentials => {
            id => $self->{ID},
            hash => $self->hash(encode_json($params)),
            version => $self->{VERSION},
            client => $self->{CLIENT},
            serverdata => $self->{REFERER} ? { %ENV, %{$self->{REFERER}} } : \%ENV,
            time => time(),
            test => $self->{TEST} ? '1' : '0',
            language => $self->{LANGUAGE},
        },
        data => $params,
        function => $function,
    };

    $self->out('CALLED FUNCTION', $function);
    $self->out('PARAMETERS TO BE SENT', $values);

    my $response;
    if ($self->{MODE} eq 'CURL') {
        $response = $self->curl(encode_json($values));
    }

    return $self->verify_hash($response);
}

sub verify_hash {
    my ($self, $response) = @_;

    my $response_array = ref $response eq 'HASH' ? $response : decode_json($response);

    unless ($response_array) {
        return $response;
    }

    if (ref $response eq 'HASH') {
        $response_array->{credentials} = decode_json($response->{credentials});
        $response_array->{data} = decode_json($response->{data});
    }

    if (exists $response_array->{credentials}) {
        if (ref ($response) ne 'HASH') {
            my $data = substr($response, index($response, ',"data":{') + 8);
            $data = substr($data, 0, -1);
            my $hash = $self->hash($data);
            if($response_array->{credentials}->{hash} eq $self->hash($data)) {
                return $response_array->{data};
            }
        }
        my $hash = $self->hash(encode_json($response_array->{data}));
        if ($response_array->{credentials}->{hash} eq $hash) {
            return $response_array->{data};
        } else {
            return {
                code => 9511,
                message => 'Verification error',
                hash => $hash,
                hash_received => $response_array->{credentials}->{hash},
            };
        }
    }

    return { map { $_ => decode_utf8($response_array->{$_}) } keys %$response_array };
}

sub curl {
    my ($self, $parameters) = @_;
    my $ua = LWP::UserAgent->new;
    $ua->timeout(10);
    $ua->ssl_opts(
        # SSL_verify_mode => 'SSL_VERIFY_PEER',
        verify_hostname => 0
    );

    my $response = $ua->post(
        'https://' . $self->{URL},
        'Content-Type' => 'application/json',
        Content => $parameters
    );

    if ($response->is_success) {
        return $response->decoded_content;
    } else {
        return encode_json({
            error => 9510,
            message => $response->status_line,
        });
    }
}

sub hash {
    my ($self, $args) = @_;
    $self->out('TO BE HASHED DATA', $args);
    return hmac_sha512_hex($args, $self->{KEY});
}

sub out {
    my ($self, $name, $out) = @_;
    return unless $self->{DEBUG};
    print "$name: '";
    if (ref $out eq 'HASH' or ref $out eq 'ARRAY') {
        print encode_json($out);
    } else {
        print $out;
    }
    print "'\n";
}

1;
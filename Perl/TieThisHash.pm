#!/usr/bin/perl
use strict;
use warnings;
use Tie::IxHash;

sub TieThisHash {
    my $hash = shift;
    my $newHash = {};
    tie %$newHash, 'Tie::IxHash' or die "tie(\%hash, 'Tie::IxHash') failed!\n";
    foreach my $key (sort keys %$hash) {
        $newHash->{$key} = $hash->{$key};
    }
    return $newHash;
}

1;
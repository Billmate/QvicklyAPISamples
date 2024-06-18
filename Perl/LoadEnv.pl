#!/usr/bin/perl
use strict;
use warnings;

# Read environment variables from .env file
sub LoadEnv {
    my $env = shift;
    if (-e $env) {
        open(my $fh, '<', $env) or die "Cannot open .env file: $!";
        while (my $line = <$fh>) {
            chomp $line;
            if($line) {
                my ($key, $value) = split(/=/, $line);
                continue if not defined $key or not defined $value;
                $ENV{$key} = $value;
            }
        }
        close($fh);
    }
}

1;
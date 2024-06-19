# Perl

This is a very rudimentary implementation of our API. It's by no means a perfect solution. But it gives an idea of how integrations in Perl can be done.

## Libraries

| Lib                          | Version | Status             | Description                                                   |
| ---------------------------- | ------- | ------------------ | ------------------------------------------------------------- |
| [Payment API](PaymentAPI.pl) | 1.0.0   | Basic testing done | Simple code that required Monkey::Patch and JSON::PP to work. |

## Examples

| Lib                               | Version | Status                          | Description |
| --------------------------------- | ------- | ------------------------------- | ----------- |
| [PaymentAPI](examples/PaymentAPI) | 1.0.0   | 18/26 functions are implemented |             |

## Extra files and their usage

| File                             | Used in lib | Used in examples | Description                                                                                  |
| -------------------------------- | ----------- | ---------------- | -------------------------------------------------------------------------------------------- |
| [LoadEnv.pl](LoadEnv.pl)         | No          | Yes              | Simple implementation of loading keys and values into environment                            |
| [TieThisHash.pm](TieThisHash.pm) | No          | Yes              | A simple function that copies a hash to a "tied" hash to make more complex structures easier |

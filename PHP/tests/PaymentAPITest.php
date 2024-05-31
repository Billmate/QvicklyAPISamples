<?php

use PHPUnit\Framework\TestCase;
use Qvickly\PaymentAPI;

class PaymentAPITest extends TestCase
{
    private $paymentAPI;
    
    protected function setUp(): void
    {
        $this->paymentAPI = new PaymentAPI('testId', 'testKey', true, false, true, ['HTTP_REFERER' => 'http://example.com']);
    }

    public function testConstructor(): void
    {
        $this->assertInstanceOf(PaymentAPI::class, $this->paymentAPI);
    }

    public function testCall(): void
    {
        // We need to mock the curl and hash methods
        $paymentAPI = $this->getMockBuilder(PaymentAPI::class)
            ->setConstructorArgs(['testId', 'testKey', true, false, true, ['HTTP_REFERER' => 'http://example.com']])
            ->onlyMethods(['__call'])
            ->getMock();

        $response = $paymentAPI->testFunction(['foo' => 'bar']);

        $this->assertSame(['foo' => 'bar'], $response);
    }

    public function testVerifyHash(): void
    {
        $method = new ReflectionMethod(PaymentAPI::class, 'verifyHash');
        $method->setAccessible(true);

        $response = [
            'credentials' => json_encode(['hash' => 'testHash']),
            'data' => json_encode(['foo' => 'bar'])
        ];

        $paymentAPI = $this->getMockBuilder(PaymentAPI::class)
            ->setConstructorArgs(['testId', 'testKey', true, false, true, ['HTTP_REFERER' => 'http://example.com']])
            ->onlyMethods(['hash'])
            ->getMock();

        $paymentAPI->expects($this->once())
            ->method('hash')
            ->with($this->anything())
            ->willReturn('testHash');

        $result = $method->invoke($paymentAPI, json_encode($response));

        $this->assertSame(['foo' => 'bar'], $result);
    }
}


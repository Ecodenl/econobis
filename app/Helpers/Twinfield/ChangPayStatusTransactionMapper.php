<?php

namespace App\Helpers\Twinfield;

use PhpTwinfield\BaseTransaction;
use PhpTwinfield\Exception;
use PhpTwinfield\Message\Message;
use PhpTwinfield\Office;
use PhpTwinfield\Response\Response;

class ChangPayStatusTransactionMapper
{
    /**
     * @param string   $transactionClassName
     * @param Response $response
     *
     * @return iterable|BaseTransaction[]
     * @throws Exception
     */
    public static function mapAll(string $transactionClassName, Response $response): iterable
    {
        foreach ($response->getResponseDocument()->getElementsByTagName('transaction') as $transactionElement) {
            yield self::map($transactionClassName, $transactionElement);
        }
    }

    public static function map(string $transactionClassName, Response $response): BaseTransaction
    {
        if (!is_a($transactionClassName, BaseTransaction::class, true)) {
            throw Exception::invalidTransactionClassName($transactionClassName);
        }

        $document = $response->getResponseDocument();
        $transactionElement = $document->documentElement;

        /** @var BaseTransaction $transaction */
        $transaction = new $transactionClassName();
        $transaction->setResult($transactionElement->getAttribute('result'));

        $office = new Office();
        $office->setCode(self::getField($transaction, $transactionElement, 'office'));

        $transaction
            ->setOffice($office)
            ->setCode(self::getField($transaction, $transactionElement, 'code'))
            ->setNumber(self::getField($transaction, $transactionElement, 'number'))
            ->setPaystatus(self::getField($transaction, $transactionElement, 'paystatus'));

        return $transaction;
    }

    private static function getField(BaseTransaction $transaction, \DOMElement $element, string $fieldTagName): ?string
    {
        $fieldElement = $element->getElementsByTagName($fieldTagName)->item(0);

        if (!isset($fieldElement)) {
            return null;
        }

        self::checkForMessage($transaction, $fieldElement);

        return $fieldElement->textContent;
    }

    private static function checkForMessage(BaseTransaction $transaction, \DOMElement $element): void
    {
        if ($element->hasAttribute('msg')) {
            $message = new Message();
            $message->setType($element->getAttribute('msgtype'));
            $message->setMessage($element->getAttribute('msg'));
            $message->setField($element->nodeName);

            $transaction->addMessage($message);
        }
    }
}

<?php

namespace App\Helpers\Twinfield;

use PhpTwinfield\DomDocuments\BaseDocument;

/**
 * ChangPayStatusTransactionDocument class.
 *
 */
class ChangPayStatusTransactionDocument extends BaseDocument
{
    final protected function getRootTagName(): string
    {
        return "transactions";
    }

    public function addTransactionChangePayStatus(ChangPayStatusTransaction $transaction)
    {
        // Transaction
        $transactionElement = $this->createElement('transaction');
        $transactionElement->setAttribute('action', "changepaystatus");

        $this->rootElement->appendChild($transactionElement);

        // Office, code, number and paystatus element
        $officeElement = $this->createNodeWithTextContent('office', $transaction->getOffice());
        $transactionElement->appendChild($officeElement);

        $codeElement = $this->createNodeWithTextContent('code', $transaction->getCode());
        $transactionElement->appendChild($codeElement);

        if ($transaction->getNumber() !== null) {
            $numberElement = $this->createNodeWithTextContent('number', $transaction->getNumber());
            $transactionElement->appendChild($numberElement);
        }

        if ($transaction->getPaystatus() !== null) {
            $paystatusElement = $this->createNodeWithTextContent('paystatus', $transaction->getPaystatus());
            $transactionElement->appendChild($paystatusElement);
        }
    }
}

<?php

namespace App\Helpers\Twinfield;

trait PayStatusField
{
    /**
     * Attribute to indicate the paystatus of the transaction. Only used in the request XML.
     *
     * @var PayStatus
     */
    private $payStatus;

    public function getPayStatus(): ?string
    {
        return $this->payStatus;
    }

    /**
     * @param PayStatus $payStatus
     * @return $this
     */
    public function setPayStatus(?string $payStatus): self
    {
        $this->payStatus = $payStatus;

        return $this;
    }
}
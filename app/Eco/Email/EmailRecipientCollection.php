<?php

namespace App\Eco\Email;

use Illuminate\Support\Collection;

class EmailRecipientCollection extends Collection
{
    public static function createFromValues(array $values)
    {
        $collection = new static();
        foreach ($values as $value) {
            $collection->push(new EmailRecipient($value));
        }

        return $collection->filter(function (EmailRecipient $emailRecipient) {
            return $emailRecipient->isValid();
        });
    }

    public function toReactArray()
    {
        return $this->map(function (EmailRecipient $emailRecipient) {
            return $emailRecipient->toReactValue();
        })->toArray();
    }

    public function toValues()
    {
        return $this->map(function (EmailRecipient $emailRecipient) {
            return $emailRecipient->getValue();
        })->toArray();
    }

    public function hasSingleContact()
    {
        return ($this->count() === 1 && $this->first()->hasModel());
    }

    public function getEmailAdresses(): Collection
    {
        return collect($this->map(function (EmailRecipient $emailRecipient) {
            return $emailRecipient->getEmailAddress();
        })->toArray());
    }
}
<?php

namespace App\Eco\Email;

use App\Eco\EmailAddress\EmailAddress;

class EmailRecipient
{
    const TYPE_MODEL = 'model';
    const TYPE_VALUE = 'value';

    protected string $type;

    protected EmailAddress $emailAddressModel;

    protected string $emailAddress;

    public function __construct(mixed $idOrEmailAddress)
    {
        if (is_numeric($idOrEmailAddress)) {
            $this->type = static::TYPE_MODEL;
            $this->emailAddressModel = EmailAddress::find($idOrEmailAddress);

            return;
        }

        $this->type = static::TYPE_VALUE;
        $this->emailAddress = $idOrEmailAddress;
    }

    public function isValid()
    {
        if ($this->type === static::TYPE_MODEL) {
            return $this->emailAddressModel !== null;
        }

        return filter_var($this->emailAddress, FILTER_VALIDATE_EMAIL) !== false;
    }

    /**
     * Geef waarde terug in een format die gebruikt kan worden in de AsyncSelectSet React component.
     */
    public function toReactValue()
    {
        if ($this->type === static::TYPE_MODEL) {
            return [
                'id' => $this->emailAddressModel->id,
                'email' => $this->emailAddressModel->email,
                'name' => $this->emailAddressModel->contact->full_name,
            ];
        }

        return [
            'id' => $this->emailAddress, // Het AsyncSelectSet React component gebruikt emailadres ook in 'id', dus dit ook zo teruggeven vanuit api.
            'email' => $this->emailAddress,
            'name' => $this->emailAddress,
        ];
    }

    public function getValue()
    {
        if ($this->type === static::TYPE_MODEL) {
            return $this->emailAddressModel->id;
        }

        return $this->emailAddress;
    }

    public function getEmailAddressModel()
    {
        return $this->emailAddressModel;
    }

    public function getEmailAddress()
    {
        if ($this->type === static::TYPE_MODEL) {
            return $this->emailAddressModel->email;
        }

        return $this->emailAddress;
    }

    public function hasModel()
    {
        return $this->type === static::TYPE_MODEL;
    }
}
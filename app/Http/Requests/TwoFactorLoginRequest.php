<?php

namespace App\Http\Requests;

class TwoFactorLoginRequest extends \Laravel\Fortify\Http\Requests\TwoFactorLoginRequest
{
    public function challengedUser()
    {
        if ($this->challengedUser) {
            return $this->challengedUser;
        }

        return $this->challengedUser = $this->user();
    }

    public function validRecoveryCode()
    {
        if (! $this->recovery_code) {
            return;
        }

        return collect($this->challengedUser()->recoveryCodes())->first(function ($code) {
            return hash_equals($this->recovery_code, $code) ? $code : null;
        });
    }
}
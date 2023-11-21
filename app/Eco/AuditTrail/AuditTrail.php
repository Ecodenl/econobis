<?php

namespace App\Eco\AuditTrail;

use App\Eco\User\User;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Crypt;

class AuditTrail extends Model
{
    protected $table = 'revisions';

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getOldValueAttribute($value)
    {
        $decryptedValue = $value;
        try {
            if($value) {
                $decryptedValue = Crypt::decrypt($value);
            }
        } catch (DecryptException $e) {
            $decryptedValue = $value;
        }

        // Indien IBAN leeg is, dan niet ge-encrypte waarde tonen
        if(($this->key == 'iban' || $this->key == 'IBAN' || $this->key == 'api_key' || $this->key == 'mollie_api_key') && trim($decryptedValue) == '' ) {
            return '';
        }

        return $value;
    }

    public function getNewValueAttribute($value)
    {
        $decryptedValue = $value;
        try {
            if($value) {
                $decryptedValue = Crypt::decrypt($value);
            }
        } catch (DecryptException $e) {
            $decryptedValue = $value;
        }

        // Indien IBAN of API key leeg is, dan niet ge-encrypte waarde tonen
        if(($this->key == 'iban' || $this->key == 'IBAN' || $this->key == 'api_key' || $this->key == 'mollie_api_key') && trim($decryptedValue) == '' ) {
            return '';
        }
        return $value;
    }

    public function getValueChangedAttribute()
    {
        $decryptedOldValue = $this->old_value;
        $decryptedNewValue = $this->new_value;

        try {
            if($this->old_value) {
                $decryptedOldValue = Crypt::decrypt($this->old_value);
            }
            if($this->old_value) {
                $decryptedNewValue = Crypt::decrypt($this->new_value);
            }
        } catch (DecryptException $e) {
            $decryptedOldValue = $this->old_value;
            $decryptedNewValue = $this->new_value;
        }

        return $decryptedOldValue != $decryptedNewValue;
    }

}



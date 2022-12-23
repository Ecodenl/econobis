<?php

namespace App\Eco\AuditTrail;

use App\Eco\Contact\Contact;
use App\Eco\Measure\Measure;
use App\Eco\Opportunity\Opportunity;
use App\Eco\Organisation\Organisation;
use App\Eco\Intake\Intake;
use App\Eco\Task\Task;
use App\Eco\User\User;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Crypt;
use Venturecraft\Revisionable\RevisionableTrait;

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
        if(($this->key == 'iban' || $this->key == 'IBAN') && trim($decryptedValue) == '' ) {
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

        // Indien IBAN leeg is, dan niet ge-encrypte waarde tonen
        if(($this->key == 'iban' || $this->key == 'IBAN') && trim($decryptedValue) == '' ) {
            return '';
        }
        return $value;
    }

}



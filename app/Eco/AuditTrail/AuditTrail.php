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
        // Indien IBAN of twinfield_password leeg is, dan niet ge-encrypte waarde tonen
        if(($this->key == 'iban' || $this->key == 'IBAN' || $this->key == 'twinfield_password') && trim(Crypt::decrypt($value)) == '' ) {
            return '';
        }
//        try {
//            if($value) {
//                $value = Crypt::decrypt($value);
//                return $value;
//            }
//        } catch (DecryptException $e) {
            return $value;
//        }
    }

    public function getNewValueAttribute($value)
    {
        // Indien IBAN of twinfield_password leeg is, dan niet ge-encrypte waarde tonen
        if(($this->key == 'iban' || $this->key == 'IBAN' || $this->key == 'twinfield_password') && trim(Crypt::decrypt($value)) == '' ) {
            return '';
        }
//        try {
//            if($value) {
//                $value = Crypt::decrypt($value);
//                return $value;
//            }
//        } catch (DecryptException $e) {
            return $value;
//        }
    }

}



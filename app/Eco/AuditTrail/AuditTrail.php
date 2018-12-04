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
        try {
            if($value) {
                $value = Crypt::decrypt($value);
                return $value;
            }
        } catch (DecryptException $e) {
            return $value;
        }
    }

    public function getNewValueAttribute($value)
    {
        try {
            if($value) {
                $value = Crypt::decrypt($value);
                return $value;
            }
        } catch (DecryptException $e) {
            return $value;
        }
    }

}



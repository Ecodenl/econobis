<?php

namespace App\Eco\Email;

use Illuminate\Database\Eloquent\Model;

class EmailAttachment extends Model
{
    protected $guarded = ['id'];

    public function email()
    {
        return $this->belongsTo(Email::class);
    }
}


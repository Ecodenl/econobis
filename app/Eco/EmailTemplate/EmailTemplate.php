<?php

namespace App\Eco\EmailTemplate;

use App\Eco\User\User;
use Illuminate\Database\Eloquent\Model;

class EmailTemplate extends Model
{
    protected $guarded = ['id'];

    public function createdBy()
    {
        return $this->belongsTo(User::class);
    }

}

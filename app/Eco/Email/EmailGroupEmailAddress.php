<?php

namespace App\Eco\Email;

use Illuminate\Database\Eloquent\Model;

class EmailGroupEmailAddress extends Model
{
    protected $guarded = ['id'];

    protected $table = 'email_group_email_addresses';
}

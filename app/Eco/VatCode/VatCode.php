<?php

namespace App\Eco\VatCode;

use Illuminate\Database\Eloquent\Model;

class VatCode extends Model
{
    protected $guarded = ['id'];

    protected $dates = [
        'start_date',
        'created_at',
        'updated_at',
    ];

}

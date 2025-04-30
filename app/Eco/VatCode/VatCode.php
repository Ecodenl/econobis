<?php

namespace App\Eco\VatCode;

use Illuminate\Database\Eloquent\Model;

class VatCode extends Model
{
    protected $guarded = ['id'];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

}

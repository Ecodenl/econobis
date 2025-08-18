<?php

namespace App\Eco\Source;

use Illuminate\Database\Eloquent\Model;

class Source extends Model
{

    protected $guarded = ['id'];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

}

<?php

namespace App\Eco\VatCode;

use Illuminate\Database\Eloquent\Model;
use JosKolenberg\LaravelJory\Traits\JoryTrait;

class VatCode extends Model
{
    use JoryTrait;

    protected $guarded = ['id'];

    protected $dates = [
        'start_date',
        'created_at',
        'updated_at',
    ];

}

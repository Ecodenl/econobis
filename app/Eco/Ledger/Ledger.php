<?php

namespace App\Eco\Ledger;

use Illuminate\Database\Eloquent\Model;
use JosKolenberg\LaravelJory\Traits\JoryTrait;

class Ledger extends Model
{
    use JoryTrait;

    protected $guarded = ['id'];

    protected $dates = [
        'created_at',
        'updated_at',
    ];

}

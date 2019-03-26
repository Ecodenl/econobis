<?php

namespace App\Eco\Ledger;

use App\Eco\VatCode\VatCode;
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

    public function vatCode()
    {
        return $this->belongsTo(VatCode::class);
    }
}

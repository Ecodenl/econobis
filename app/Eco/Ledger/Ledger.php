<?php

namespace App\Eco\Ledger;

use App\Eco\Product\Product;
use App\Eco\VatCode\VatCode;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use JosKolenberg\LaravelJory\Traits\JoryTrait;

class Ledger extends Model
{
    use JoryTrait, SoftDeletes;

    protected $guarded = ['id'];

    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    public function vatCode()
    {
        return $this->belongsTo(VatCode::class);
    }
    public function products()
    {
        return $this->hasMany(Product::class);
    }

}

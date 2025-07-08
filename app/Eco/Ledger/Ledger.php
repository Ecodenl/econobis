<?php

namespace App\Eco\Ledger;

use App\Eco\Product\Product;
use App\Eco\VatCode\VatCode;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Ledger extends Model
{
    use SoftDeletes;

    protected $guarded = ['id'];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
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

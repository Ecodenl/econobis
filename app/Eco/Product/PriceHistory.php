<?php

namespace App\Eco\Product;

use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;

class PriceHistory extends Model
{
    use RevisionableTrait;

    protected $guarded = ['id'];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

}

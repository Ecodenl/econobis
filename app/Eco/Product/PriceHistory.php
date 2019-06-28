<?php

namespace App\Eco\Product;

use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;

class PriceHistory extends Model
{
    use RevisionableTrait;

    protected $guarded = ['id'];

    protected $table = 'price_history_product';

    public function product()
    {
        return $this->belongsTo(Product::class)->withoutGlobalScope('is_not_one_time');
    }

}

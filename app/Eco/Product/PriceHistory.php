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

    public function getPriceInclVatAttribute()
    {
        $price_ex_vat = $this->price;

        if($price_ex_vat === null){
            $price_ex_vat = 0;
        }

        $vat_percentage = $this->vat_percentage;

        if($vat_percentage === null || $vat_percentage === 0){
            return $price_ex_vat;
        }

        return ($price_ex_vat + ($price_ex_vat*($vat_percentage / 100)));
    }
}

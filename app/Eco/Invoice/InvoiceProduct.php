<?php

namespace App\Eco\Invoice;

use App\Eco\Product\Product;
use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;

class InvoiceProduct extends Model
{
    use RevisionableTrait;

    protected $table = 'invoice_product';
    /**
     * The attributes that are not mass assignable.
     *
     * @var array
     */
    protected $guarded
        = [
            'id'
        ];

    protected $appends
        = [
            'price_incl_vat_and_reduction',
        ];

    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function getPriceInclVatAndReductionAttribute()
    {
        $price = $this->price;

        if ($price === null) {
            $price = 0;
        }

        $vat_percentage = $this->vat_percentage;

        if($vat_percentage) {
            $price = ($price + ($price
                    * ($vat_percentage / 100)));
        }

        $price = ($this->amount
            * $price);

        if ($this->percentage_reduction) {
            if ($this->percentage_reduction >= 100) {
                return 0;
            }
            $price = ($price * ((100 - $this->percentage_reduction)
                    / 100));
        }

        if ($this->amount_reduction) {
            $price -= $this->amount_reduction;
        }

        return $price;

    }
}

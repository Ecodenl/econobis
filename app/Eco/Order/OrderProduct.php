<?php

namespace App\Eco\Order;

use App\Eco\Product\Product;
use Illuminate\Database\Eloquent\Model;

class OrderProduct extends Model
{
    protected $table = 'order_product';
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
            'total_price_incl_vat_and_reduction',
            'total_price_incl_vat_and_reduction_per_year',
        ];

    public function orders()
    {
        return $this->belongsTo(Order::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function getTotalPriceInclVatAndReductionAttribute()
    {
        $price = 0;

        $price += ($this->amount
            * $this->product->price_incl_vat);

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

    public function getTotalPriceInclVatAndReductionPerYearAttribute()
    {
        switch ($this->product->invoice_frequency_id){
            case 'monthly':
                return ($this->total_price_incl_vat_and_reduction * 12);
            case 'quarterly':
                return ($this->total_price_incl_vat_and_reduction * 4);
            default:
                return $this->total_price_incl_vat_and_reduction;

        }
    }
}

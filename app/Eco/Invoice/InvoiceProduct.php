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

    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class)->withoutGlobalScope('is_not_one_time');
    }

    public function getPriceInclVatAndReductionAttribute()
    {
        $price = $this->price;
        $priceInclVat = $this->price_incl_vat;
        $inputInclVat = false;
        if ($this->product->currentPrice) {
            $inputInclVat = $this->product->currentPrice->input_incl_vat;
        }
        if ($price === null) {
            $price = 0;
        }
        if ($priceInclVat === null) {
            $priceInclVat = 0;
        }

        $vat_percentage = $this->vat_percentage;
        $price = ($this->amount * $price);
        $priceInclVat = ($this->amount * $priceInclVat);

        if($inputInclVat)
        {
            //indien invoer prijs incl. BTW is geweest, dan kortingsbedragen ook incl. BTW bepalen en eraf halen
            if ($this->percentage_reduction) {
                if($priceInclVat < 0){
                    $priceInclVat = ($priceInclVat * ((100 + $this->percentage_reduction) / 100));
                }
                else {
                    $priceInclVat = ($priceInclVat * ((100 - $this->percentage_reduction) / 100));
                }
            }
            if ($this->amount_reduction) {
                $priceInclVat -= $this->amount_reduction;
            }

        } else {
            //indien invoer prijs excl. BTW is geweest, dan kortingsbedragen over excl. BTW bepalen en resultaat incl. BTW
            if ($this->percentage_reduction) {
                if($price < 0){
                    $price = ($price * ((100 + $this->percentage_reduction) / 100));
                }
                else {
                    $price = ($price * ((100 - $this->percentage_reduction) / 100));
                }
            }
            if ($this->amount_reduction) {
                $price -= $this->amount_reduction;
            }
            if($vat_percentage) {
                $priceInclVat = ($price + ($price * ($vat_percentage / 100)));
            }

        }

        return $priceInclVat;
    }

    public function getPriceExVatInclReductionAttribute()
    {
        $price = $this->price;
        if ($price === null) {
            $price = 0;
        }
        $price = ($this->amount * $price);

        if ($this->percentage_reduction) {
            if($price < 0){
                $price = ($price * ((100 + $this->percentage_reduction) / 100));
            }
            else {
                $price = ($price * ((100 - $this->percentage_reduction) / 100));
            }
        }

        if ($this->amount_reduction) {
            $price -= $this->amount_reduction;
        }

        return $price;

    }

    public function getAmountVatAttribute()
    {
        return ($this->getPriceInclVatAndReductionAttribute() - $this->getPriceExVatInclReductionAttribute() );
    }

}

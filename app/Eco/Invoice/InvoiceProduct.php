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

    public function getAmountReductionAmountAttribute()
    {
        $amountReduction = 0;
        if ($this->amount_reduction) {
            $amountReduction = $this->amount_reduction;
            $inputInclVat = false;
            if ($this->product->currentPrice) {
                $inputInclVat = $this->product->currentPrice->input_incl_vat;
            }
            if($inputInclVat)
            {
                $vatPercentage = $this->vat_percentage;
                $vatFactor = (100 + $vatPercentage) / 100;
                $amountReduction = floatval( number_format( $amountReduction / $vatFactor, 2, '.', '') );
            }
        }
        return $amountReduction;

    }

    public function getAmountReductionPercentageAttribute()
    {
        $amountReduction = 0;
        if ($this->percentage_reduction) {
            $inputInclVat = false;
            if ($this->product->currentPrice) {
                $inputInclVat = $this->product->currentPrice->input_incl_vat;
            }

            if($inputInclVat)
            {
                $priceInclVat = $this->price_incl_vat;
                if ($priceInclVat === null) {
                    $priceInclVat = 0;
                }
                $priceInclVat = ($this->amount * $priceInclVat);
                $amountReduction = floatval( number_format( ($priceInclVat * ($this->percentage_reduction / 100) ), 2, '.', '') );
                $vatPercentage = $this->vat_percentage;
                $vatFactor = (100 + $vatPercentage) / 100;
                $amountReduction = floatval( number_format( $amountReduction / $vatFactor, 2) );
            }else {
                $price = $this->price;
                if ($price === null) {
                    $price = 0;
                }
                $price = ($this->amount * $price);
                $amountReduction = floatval( number_format( ($price * ($this->percentage_reduction) / 100), 2, '.', '') );
            }
        }
    return $amountReduction;

    }

    public function getPriceInclVatAndReductionAttribute()
    {
        $inputInclVat = false;
        if ($this->product->currentPrice) {
            $inputInclVat = $this->product->currentPrice->input_incl_vat;
        }

        if($inputInclVat)
        {
            $priceInclVat = $this->price_incl_vat;
            if ($priceInclVat === null) {
                $priceInclVat = 0;
            }
            $priceInclVat = ($this->amount * $priceInclVat);
            //indien invoer prijs incl. BTW is geweest, dan kortingsbedragen ook incl. BTW bepalen en eraf halen
            if ($this->percentage_reduction) {
                if ($priceInclVat < 0) {
                    $priceInclVat = floatval( number_format( ($priceInclVat * ((100 + $this->percentage_reduction) / 100)), 2, '.', '') );
                } else {
                    $priceInclVat = floatval( number_format( ($priceInclVat * ((100 - $this->percentage_reduction) / 100)), 2, '.', '') );
                }
            }
            if ($this->amount_reduction) {
                $priceInclVat -= $this->amount_reduction;
            }
        }
        else{
            $vatPercentage = $this->vat_percentage;
            $vatFactor = (100 + $vatPercentage) / 100;
            $priceExclVat = $this->getPriceExVatInclReductionAttribute();
            $priceInclVat = floatval( number_format( $priceExclVat * $vatFactor, 2, '.', '') );
        }
        return $priceInclVat;
    }

    public function getPriceExVatInclReductionAttribute()
    {
        $priceExclVat = $this->price;
        if ($priceExclVat === null) {
            $priceExclVat = 0;
        }
        $priceExclVat = ($this->amount * $priceExclVat);
        if ($this->percentage_reduction) {
            if ($priceExclVat < 0) {
                $priceExclVat = floatval( number_format( ($priceExclVat * ((100 + $this->percentage_reduction) / 100)), 2, '.', '') ) ;
            } else {
                $priceExclVat = floatval( number_format( ($priceExclVat * ((100 - $this->percentage_reduction) / 100)), 2, '.', '') ) ;
            }
        }
        if ($this->amount_reduction) {
            $priceExclVat -= $this->amount_reduction;
        }
        return $priceExclVat;
    }

    public function getAmountVatAttribute()
    {
        return ( $this->getPriceInclVatAndReductionAttribute() - $this->getPriceExVatInclReductionAttribute() );
    }

}

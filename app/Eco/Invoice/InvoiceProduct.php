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
                $amountReduction = $amountReduction / $vatFactor;
            }
        }
        return floatval(number_format( ($amountReduction * -1), 2, '.', ''));
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
                $amountReduction = $priceInclVat * ($this->percentage_reduction / 100);
                $vatPercentage = $this->vat_percentage;
                $vatFactor = (100 + $vatPercentage) / 100;
                $amountReduction = $amountReduction / $vatFactor;
            }else {
                $price = $this->price;
                if ($price === null) {
                    $price = 0;
                }
                $price = ($this->amount * $price);
                $amountReduction = $price * ($this->percentage_reduction) / 100;
            }
        }
    return floatval( number_format(  ($amountReduction* -1), 2, '.', '') );

    }

    public function getPriceInclVatAndReductionAttribute()
    {
        if($this->getAmountReductionAmountAttribute() == 0 && $this->getAmountReductionPercentageAttribute() == 0){
            return floatval( number_format( ($this->amount * $this->price_incl_vat), 2, '.', ''));
        }
        $vatPercentage = $this->vat_percentage;
        $vatFactor = (100 + $vatPercentage) / 100;
        $priceExclVat = $this->getPriceExVatInclReductionAttribute();
        return floatval( number_format( ($priceExclVat * $vatFactor), 2, '.', ''));
    }

    public function getPriceExVatInclReductionAttribute()
    {
        $priceExclVat = $this->price;
        if ($priceExclVat === null) {
            $priceExclVat = 0;
        }
        $priceExclVat = ($this->amount * $priceExclVat);
        if ($this->percentage_reduction) {
            $amountReductionPercentage = $this->getAmountReductionPercentageAttribute();
            $priceExclVat = $priceExclVat + $amountReductionPercentage;
        }
        if ($this->amount_reduction) {
            $amountReduction = $this->getAmountReductionAmountAttribute();
            $priceExclVat += $amountReduction;
        }
        return floatval( number_format( $priceExclVat, 2, '.', '') );
    }

    public function getAmountVatAttribute()
    {
        $vatPercentage = $this->vat_percentage;
        $vatFactor = ($vatPercentage) / 100;
        $priceExclVat = $this->getPriceExVatInclReductionAttribute();
        return floatval( number_format( $priceExclVat * $vatFactor, 2, '.', '') );
    }

}

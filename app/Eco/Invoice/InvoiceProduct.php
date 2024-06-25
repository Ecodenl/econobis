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

    public function getAmountExclVat()
    {
        $amountExclVat = $this->price * $this->amount;
        return floatval( number_format( $amountExclVat, 2, '.', ''));
    }
    public function getAmountVat()
    {
        $amountVat = $this->getAmountInclVat() - $this->getAmountExclVat();
        return floatval( number_format( $amountVat, 2, '.', ''));
    }
    public function getAmountInclVat()
    {
        $amountInclVat = $this->price_incl_vat * $this->amount;
        return floatval( number_format( $amountInclVat, 2, '.', ''));
    }
    public function getAmountReductionAmountExclVat()
    {
        $amountReduction = 0;
        if ($this->amount_reduction) {
            $amountReduction = $this->amount_reduction; // ingevoerd bedrag korting
            $inputInclVat = false;
            if ($this->product->currentPrice) {
                $inputInclVat = $this->product->currentPrice->input_incl_vat;
            }
            if($inputInclVat) // indien price ingevoerd incl. BTW dan ingevoerd bedrag korting ook incl.
            {
                $vatPercentage = $this->vat_percentage;
                $vatFactor = (100 + $vatPercentage) / 100;
                $amountReduction = $amountReduction / $vatFactor;
            }
        }
        return floatval(number_format( ($amountReduction * -1), 2, '.', ''));
    }
    public function getAmountReductionAmountVat()
    {
        $amountVat = $this->getAmountReductionAmountInclVat() - $this->getAmountReductionAmountExclVat();
        return floatval( number_format( $amountVat, 2, '.', ''));
    }
    public function getAmountReductionAmountInclVat()
    {
        $amountReduction = 0;
        if ($this->amount_reduction) {
            $amountReduction = $this->amount_reduction; // ingevoerd bedrag korting
            $inputInclVat = false;
            if ($this->product->currentPrice) {
                $inputInclVat = $this->product->currentPrice->input_incl_vat;
            }
            if(!$inputInclVat) // indien price ingevoerd excl. BTW dan ingevoerd bedrag korting ook excl.
            {
                $vatPercentage = $this->vat_percentage;
                $vatFactor = (100 + $vatPercentage) / 100;
                $amountReduction = $amountReduction * $vatFactor;
            }
        }
        return floatval(number_format( ($amountReduction * -1), 2, '.', ''));
    }
    public function getAmountReductionPercentageExclVat()
    {
        $amountReduction = 0;
        if ($this->percentage_reduction) {
            $inputInclVat = false;
            if ($this->product->currentPrice) {
                $inputInclVat = $this->product->currentPrice->input_incl_vat;
            }

            if($inputInclVat) // indien price ingevoerd incl. BTW dan percentage korting ook over incl.
            {
                $amountReduction = $this->getAmountInclVat() * ($this->percentage_reduction / 100);
                $vatPercentage = $this->vat_percentage;
                $vatFactor = (100 + $vatPercentage) / 100;
                $amountReduction = $amountReduction / $vatFactor;
            }else {
                $amountReduction = $this->getAmountExclVat() * ($this->percentage_reduction) / 100;
            }
        }
        return floatval( number_format(  ($amountReduction* -1), 2, '.', '') );
    }
    public function getAmountReductionPercentageVat()
    {
        $amountVat = $this->getAmountReductionPercentageInclVat() - $this->getAmountReductionPercentageExclVat();
        return floatval( number_format( $amountVat, 2, '.', ''));
    }
    public function getAmountReductionPercentageInclVat()
    {
        $amountReduction = 0;
        if ($this->percentage_reduction) {
            $inputInclVat = false;
            if ($this->product->currentPrice) {
                $inputInclVat = $this->product->currentPrice->input_incl_vat;
            }

            if($inputInclVat) // indien price ingevoerd incl. BTW dan percentage korting ook over incl.
            {
                $amountReduction = $this->getAmountInclVat() * ($this->percentage_reduction / 100);
            }else {
                $amountReduction = $this->getAmountExclVat() * ($this->percentage_reduction) / 100;
                $vatPercentage = $this->vat_percentage;
                $vatFactor = (100 + $vatPercentage) / 100;
                $amountReduction = $amountReduction * $vatFactor;
            }
        }
        return floatval( number_format(  ($amountReduction* -1), 2, '.', '') );
    }

    public function getAmountInclReductionExclVat()
    {
        $amountExclVat = $this->getAmountExclVat();
        $amountReductionAmountExclVat = $this->getAmountReductionAmountExclVat();
        $amountReductionPercentageExclVat = $this->getAmountReductionPercentageExclVat();
        return floatval( number_format( ($amountExclVat + $amountReductionAmountExclVat + $amountReductionPercentageExclVat), 2, '.', ''));
    }

    public function getAmountInclReductionExclVatAttribute()
    {
        return number_format($this->getAmountInclReductionExclVat(), 2, ',', '');
    }

    public function getAmountInclReductionVat()
    {
        $inputInclVat = false;
        if ($this->product->currentPrice) {
            $inputInclVat = $this->product->currentPrice->input_incl_vat;
        }
        $vatPercentage = $this->vat_percentage;
        if($inputInclVat)
        {
            $amountInclReductionVat = $this->getAmountInclReductionInclVat() - $this->getAmountInclReductionExclVat();
        }else{
            $vatFactor = $vatPercentage / 100;
            $amountInclReductionVat = $this->getAmountInclReductionExclVat() * $vatFactor;
        }
        return floatval( number_format( $amountInclReductionVat, 2, '.', ''));
    }

    public function getAmountInclReductionInclVatAttribute()
    {
        return number_format($this->getAmountInclReductionInclVat(), 2, ',', '');
    }

    public function getAmountInclReductionInclVat()
    {
        $inputInclVat = false;
        if ($this->product->currentPrice) {
            $inputInclVat = $this->product->currentPrice->input_incl_vat;
        }
        if($inputInclVat)
        {
            $amountInclVat = $this->getAmountInclVat();
            $amountReductionAmountInclVat = $this->getAmountReductionAmountInclVat();
            $amountReductionPercentageInclVat = $this->getAmountReductionPercentageInclVat();
            $amountInclReductionInclVat = $amountInclVat + $amountReductionAmountInclVat + $amountReductionPercentageInclVat;
        }else{
            $amountInclReductionInclVat = $this->getAmountInclReductionExclVat() + $this->getAmountInclReductionVat();
        }

        return floatval( number_format( $amountInclReductionInclVat, 2, '.', ''));
    }

    public function getAmountExclVatFormattedAttribute(){
        return $this->formatFinancial($this->getAmountExclVat());
    }

    public function getAmountReductionAmountExclVatFormattedAttribute(){
        return $this->formatFinancial($this->getAmountReductionAmountExclVat());
    }

    public function getAmountReductionPercentageExclVatFormattedAttribute(){
        return $this->formatFinancial($this->getAmountReductionPercentageExclVat());
    }

    private function formatFinancial($amount){
        return number_format($amount, 2, ',', '.');
    }

}

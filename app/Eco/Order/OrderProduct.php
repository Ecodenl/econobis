<?php

namespace App\Eco\Order;

use App\Eco\CostCenter\CostCenter;
use App\Eco\Product\Product;
use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;

class OrderProduct extends Model
{
    use RevisionableTrait;

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

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class)->withoutGlobalScope('is_not_one_time');
    }

    public function costCenter(){
        return $this->belongsTo(CostCenter::class);
    }

    public function getAmountExclVat()
    {
        if(!$this->product->currentPrice) return 0;

        $inputInclVat = $this->product->currentPrice->input_incl_vat;

        //Indien variabele prijs
        if ($this->variable_price) {
            if($inputInclVat) // indien ingevoerd incl. BTW dan excl. BTW bepalen.
            {
                $vatPercentage = $this->product->currentPrice->vat_percentage;
                $vatFactor = (100 + $vatPercentage) / 100;
                $productPrice = $this->variable_price / $vatFactor;
            } else {
                $productPrice = $this->variable_price;
            }
        } else {
            $productPrice = $this->product->currentPrice->price;
        }

        $amountExclVat = $productPrice * $this->amount;
        return floatval( number_format( $amountExclVat, 2, '.', ''));
    }
    public function getAmountVat()
    {
        $amountVat = $this->getAmountInclVat() - $this->getAmountExclVat();
        return floatval( number_format( $amountVat, 2, '.', ''));
    }
    public function getAmountInclVat()
    {
        if(!$this->product->currentPrice) return 0;

        $inputInclVat = $this->product->currentPrice->input_incl_vat;

        //Indien variabele prijs
        if ($this->variable_price) {
            if(!$inputInclVat) // indien ingevoerd excl. BTW dan incl. BTW bepalen.
            {
                $vatPercentage = $this->product->currentPrice->vat_percentage;
                $vatFactor = (100 + $vatPercentage) / 100;
                $productPrice = $this->variable_price * $vatFactor;
            } else {
                $productPrice = $this->variable_price;
            }
        } else {
            $productPrice = $this->product->currentPrice->price_incl_vat;
        }

        $amountInclVat = $productPrice * $this->amount;
        return floatval( number_format( $amountInclVat, 2, '.', ''));
    }
    public function getAmountReductionAmountExclVat()
    {
        if(!$this->product->currentPrice) return 0;

        $amountReduction = 0;
        if ($this->amount_reduction) {
            $amountReduction = $this->amount_reduction; // ingevoerd bedrag korting
            $inputInclVat = false;
            if ($this->product->currentPrice) {
                $inputInclVat = $this->product->currentPrice->input_incl_vat;
            }
            if($inputInclVat) // indien price ingevoerd incl. BTW dan ingevoerd bedrag korting ook incl.
            {
                $vatPercentage = $this->product->currentPrice->vat_percentage;
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
        if(!$this->product->currentPrice) return 0;

        $amountReduction = 0;
        if ($this->amount_reduction) {
            $amountReduction = $this->amount_reduction; // ingevoerd bedrag korting
            $inputInclVat = false;
            if ($this->product->currentPrice) {
                $inputInclVat = $this->product->currentPrice->input_incl_vat;
            }
            if(!$inputInclVat) // indien price ingevoerd excl. BTW dan ingevoerd bedrag korting ook excl.
            {
                $vatPercentage = $this->product->currentPrice->vat_percentage;
                $vatFactor = (100 + $vatPercentage) / 100;
                $amountReduction = $amountReduction * $vatFactor;
            }
        }
        return floatval(number_format( ($amountReduction * -1), 2, '.', ''));
    }
    public function getAmountReductionPercentageExclVat()
    {
        if(!$this->product->currentPrice) return 0;

        $amountReduction = 0;
        if ($this->percentage_reduction) {
            $inputInclVat = false;
            if ($this->product->currentPrice) {
                $inputInclVat = $this->product->currentPrice->input_incl_vat;
            }

            if($inputInclVat) // indien price ingevoerd incl. BTW dan percentage korting ook over incl.
            {
                $amountReduction = $this->getAmountInclVat() * ($this->percentage_reduction / 100);
                $vatPercentage = $this->product->currentPrice->vat_percentage;
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
        if(!$this->product->currentPrice) return 0;

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
                $vatPercentage = $this->product->currentPrice->vat_percentage;
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
        if(!$this->product->currentPrice) return 0;

        $inputInclVat = false;
        if ($this->product->currentPrice) {
            $inputInclVat = $this->product->currentPrice->input_incl_vat;
        }
        $vatPercentage = $this->product->currentPrice->vat_percentage;
        if($inputInclVat)
        {
            $amountInclReductionVat = $this->getAmountInclReductionInclVat() - $this->getAmountInclReductionExclVat();
        }else{
            $vatFactor = $vatPercentage / 100;
            $amountInclReductionVat = $this->getAmountInclReductionExclVat() * $vatFactor;
        }
        return floatval( number_format( $amountInclReductionVat, 2, '.', ''));
    }

    public function getAmountInclReductionInclVat()
    {
        if(!$this->product->currentPrice) return 0;

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

    public function getAmountInclReductionInclVatAttribute()
    {
        return number_format($this->getAmountInclReductionInclVat(), 2, ',', '');
    }

    public function getAmountInclReductionInclVatPerYear()
    {
        return $this->getAmountInclReductionInclVat();
        switch ($this->product->invoice_frequency_id){
            case 'monthly':
                return ($this->getAmountInclReductionInclVat() * 12);
            case 'quarterly':
                return ($this->getAmountInclReductionInclVat() * 4);
            case 'half-year':
                return ($this->getAmountInclReductionInclVat() * 2);
            default:
                return $this->getAmountInclReductionInclVat();
        }
    }

    public function getAmountInclReductionInclVatForPeriod()
    {
        switch ($this->order->collection_frequency_id) {
            case 'monthly':
                return ($this->getAmountInclReductionInclVatPerYear() / 12);
            case 'quarterly':
                return ($this->getAmountInclReductionInclVatPerYear() / 4);
            case 'half-year':
                return ($this->getAmountInclReductionInclVatPerYear() / 2);
            default:
                return $this->getAmountInclReductionInclVatPerYear();
        }
    }

    private function formatFinancial($amount){
        return number_format($amount, 2, ',', '.');
    }

    public function getIsOneTimeAndPaidProductAttribute(){
        if($this->product->duration_id === 'none' && $this->date_last_invoice){
            return true;
        }
        else{
            return false;
        }
    }
}

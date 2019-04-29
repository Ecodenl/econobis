<?php

namespace App\Eco\Order;

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

    public function getTotalPriceInclVatAndReductionAttribute()
    {
        $priceInclVat = 0;
        $inputInclVat = false;
        if ($this->product->currentPrice) {
            $inputInclVat = $this->product->currentPrice->input_incl_vat;
        }
        $vat_percentage = $this->product->currentPrice->vat_percentage;

        if($inputInclVat){
            $productPrice = $this->product->currentPrice->price_incl_vat;
            $priceInclVat = ($this->amount * $productPrice);
            if ($this->percentage_reduction) {
                if($priceInclVat < 0){
                    $priceInclVat = ($priceInclVat * ((100 + $this->percentage_reduction) / 100));
                }
                else {
                    $priceInclVat = ($priceInclVat * ((100 - $this->percentage_reduction) / 100));
                }
            }
            if ($this->amount_reduction) {
                $priceInclVat = $priceInclVat - $this->amount_reduction;
            }

        } else {
            //indien invoer prijs excl. BTW is geweest, dan kortingsbedragen over excl. BTW bepalen en resultaat incl. BTW
            if ($this->variable_price) {
                //Indien variabele prijs (is ook excl.)
                $productPrice = $this->variable_price;
            } else {
                $productPrice = $this->product->currentPrice->price;
            }
            $price = ($this->amount * $productPrice);

            //indien invoer prijs excl. BTW is geweest, dan kortingsbedragen over excl. BTW bepalen en resultaat incl. BTW
            if ($this->percentage_reduction) {
                if ($price < 0) {
                    $price = ($price * ((100 + $this->percentage_reduction) / 100));
                } else {
                    $price = ($price * ((100 - $this->percentage_reduction) / 100));
                }
            }
            if ($this->amount_reduction) {
                $price -= $this->amount_reduction;
            }
            if ($vat_percentage) {
                $priceInclVat = ($price + ($price * ($vat_percentage / 100)));
            }
        }

        return $priceInclVat;

    }

    public function getTotalPriceExVatInclReductionAttribute()
    {
        $price = 0;

        if(!$this->product->current_price) return 0;

        if($this->variable_price) {
            $productPrice = $this->variable_price;
        }
        else{
            $productPrice = $this->product->current_price->price;
        }

        $price += ($this->amount * $productPrice);

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

    public function getTotalPriceInclVatAndReductionPerYearAttribute()
    {
        switch ($this->product->invoice_frequency_id){
            case 'monthly':
                return ($this->total_price_incl_vat_and_reduction * 12);
            case 'quarterly':
                return ($this->total_price_incl_vat_and_reduction * 4);
            case 'half-year':
                return ($this->total_price_incl_vat_and_reduction * 2);
            default:
                return $this->total_price_incl_vat_and_reduction;
        }
    }

    public function getTotalPriceInclVatAndReductionForPeriodAttribute()
    {
        switch ($this->order->collection_frequency_id) {
            case 'monthly':
                return ($this->total_price_incl_vat_and_reduction_per_year / 12);
            case 'quarterly':
                return ($this->total_price_incl_vat_and_reduction_per_year / 4);
            case 'half-year':
                return ($this->total_price_incl_vat_and_reduction_per_year / 2);
            default:
                return $this->total_price_incl_vat_and_reduction_per_year;
        }
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

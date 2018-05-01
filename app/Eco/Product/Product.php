<?php

namespace App\Eco\Product;

use App\Eco\Administration\Administration;
use App\Eco\User\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;
use Venturecraft\Revisionable\RevisionableTrait;

class Product extends Model
{
    use RevisionableTrait, SoftDeletes;

    protected $guarded = ['id'];

    protected $appends
        = [
            'price_incl_vat',
        ];
    //Dont boot softdelete scopes. We handle this ourselves
    public static function bootSoftDeletes()
    {
        return false;
    }

    public function priceHistory()
    {
        return $this->belongsToMany(PriceHistory::class);
    }

    public function price()
    {
        return $this->hasOne(PriceHistory::class)->where('date_start' < Carbon::now())->orderBy('date_start', 'desc')->orderBy('created_at', 'desc')->first();
    }

    public function administration()
    {
        return $this->belongsTo(Administration::class);
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class);
    }

    public function getDuration()
    {
        if(!$this->duration_id) return null;

        return ProductDuration::get($this->duration_id);
    }

    public function getInvoiceFrequency()
    {
        if(!$this->invoice_frequency_id) return null;

        return ProductInvoiceFrequency::get($this->invoice_frequency_id);
    }

    public function getPaymentType()
    {
        if(!$this->payment_type_id) return null;

        return ProductPaymentType::get($this->payment_type_id);
    }

    public function getPriceInclVatAttribute()
    {
        $price_ex_vat = $this->price()->price;

        if($price_ex_vat === null){
            $price_ex_vat = 0;
        }

        $vat_percentage = $this->price()->vat_percentage;

        if($vat_percentage === null || $vat_percentage === 0){
            return $price_ex_vat;
        }

        return ($price_ex_vat + ($price_ex_vat*($vat_percentage / 100)));
    }

}

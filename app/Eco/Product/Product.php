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
        return $this->hasOne(PriceHistory::class)->where('date_start' < Carbon::now())->orderBy('date_start', 'desc')->first();
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

        return ProductDuration::get($this->status_id);
    }

    public function getInvoiceFrequency()
    {
        if(!$this->invoice_frequency_id) return null;

        return ProductInvoiceFrequency::get($this->status_id);
    }

}

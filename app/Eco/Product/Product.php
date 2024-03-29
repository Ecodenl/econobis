<?php

namespace App\Eco\Product;

use App\Eco\Administration\Administration;
use App\Eco\Invoice\InvoiceProduct;
use App\Eco\CostCenter\CostCenter;
use App\Eco\Ledger\Ledger;
use App\Eco\Order\OrderProduct;
use App\Eco\User\User;
use App\Scopes\NotOneTimeProductScope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;
use Venturecraft\Revisionable\RevisionableTrait;

class Product extends Model
{
    use RevisionableTrait, SoftDeletes;

    protected $guarded = ['id'];

    protected static function boot()
    {
        parent::boot();

        static::addGlobalScope('is_not_one_time', function (Builder $builder) {
            $builder->where('is_one_time', false);
        });
    }

    public function ledger(){
        return $this->belongsTo(Ledger::class);
    }

    public function costCenter(){
        return $this->belongsTo(CostCenter::class);
    }

    public function priceHistory()
    {
        return $this->hasMany(PriceHistory::class)->orderBy('date_start', 'asc')->orderBy('created_at', 'asc');
    }

    public function priceHistoryUnsorted()
    {
        return $this->hasMany(PriceHistory::class);
    }

    public function invoiceProducts()
    {
        return $this->hasMany(InvoiceProduct::class);
    }

    // todo moeten we hier ook niet wat doen met invoice status in-progress, error-making en/of error-sending ??
    public function invoiceProductsToSend()
    {
        return $this->hasMany(InvoiceProduct::class)->whereHas('invoice', function ($q) {
            $q->whereIn('invoices.status_id', ['to-send', 'in-progress', 'is-sending', 'error-making', 'error-sending', 'is-resending' ]);
        });
    }

    public function orderProducts()
    {
        return $this->hasMany(OrderProduct::class);
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

    public function getCurrentPriceAttribute()
    {
       return $this->priceHistoryUnsorted()->where('date_start', '<', Carbon::now())->orderBy('date_start', 'desc')->orderBy('created_at', 'desc')->first();
    }

    /**
     * @return string 'none' for no price history, 'variable' for variable price, 'static' for static price.
     */
    public function getHasVariablePriceAttribute()
    {
        if($this->priceHistory()->exists()){
            if($this->priceHistory()->first()->has_variable_price){
                return 'variable';
            }
            else{
                return 'static';
            }
        }

        return 'none';
    }
}

<?php

namespace App\Eco\Administration;

use App\Eco\Country\Country;
use App\Eco\Order\Order;
use App\Eco\Product\Product;
use App\Eco\User\User;
use App\Http\Traits\Encryptable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Venturecraft\Revisionable\RevisionableTrait;

class Administration extends Model
{
    use RevisionableTrait, SoftDeletes, Encryptable;

    protected $guarded = ['id'];

    protected $encryptable = [
        'IBAN'
    ];

    protected $appends
        = [
            'total_orders',
            'total_orders_concepts',
            'total_orders_invoices',
            'total_orders_collections',
            'total_orders_closed',
        ];

    //Dont boot softdelete scopes. We handle this ourselves
    public static function bootSoftDeletes()
    {
        return false;
    }

    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    public function products(){
        return $this->hasMany(Product::class);
    }

    public function orders(){
        return $this->hasMany(Order::class);
    }

    public function country(){
        return $this->belongsTo(Country::class);
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class);
    }

    public function getTotalOrdersAttribute()
    {
        return $this->orders()->count();
    }

    public function getTotalOrdersConceptsAttribute()
    {
        return $this->orders()->where('status_id', 'concept')->count();
    }

    public function getTotalOrdersInvoicesAttribute()
    {
        return $this->orders()->where('status_id', 'active')->where('payment_type_id', 'transfer')->count();
    }

    public function getTotalOrdersCollectionsAttribute()
    {
        return $this->orders()->where('status_id', 'active')->where('payment_type_id', 'collection')->count();
    }

    public function getTotalOrdersClosedAttribute()
    {
        return $this->orders()->where('status_id', 'closed')->count();
    }

}

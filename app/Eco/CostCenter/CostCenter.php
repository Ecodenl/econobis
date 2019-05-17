<?php

namespace App\Eco\Ledger;

use App\Eco\Order\OrderProduct;
use App\Eco\Product\Product;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use JosKolenberg\LaravelJory\Traits\JoryTrait;

class CostCenter extends Model
{
    use JoryTrait, SoftDeletes;

    protected $guarded = ['id'];

    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public function orderProducts()
    {
        return $this->hasMany(OrderProduct::class);
    }

}

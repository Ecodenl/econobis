<?php

namespace App\Eco\CostCenter;

use App\Eco\Order\OrderProduct;
use App\Eco\Product\Product;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CostCenter extends Model
{
    use SoftDeletes;

    protected $guarded = ['id'];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
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

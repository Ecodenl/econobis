<?php

namespace App\Eco\RevenuesKwh;

use Illuminate\Database\Eloquent\Model;
//use Venturecraft\Revisionable\RevisionableTrait;

class RevenueValuesKwh extends Model
{
//    use RevisionableTrait;

    protected $table = 'revenue_values_kwh';

     /**
     * The attributes that are not mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id'
    ];

    public function revenuesKwh()
    {
        return $this->belongsTo(RevenuesKwh::class, 'revenue_id');
    }

}

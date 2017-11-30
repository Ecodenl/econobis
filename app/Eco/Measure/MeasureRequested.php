<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 30-11-2017
 * Time: 16:27
 */

namespace App\Eco\Measure;


use Illuminate\Database\Eloquent\Model;

class MeasureRequested extends Model
{
    protected $table = 'measure_requested_address';

    protected $dates = [
        'desired_date',
    ];

    protected $casts = [
        'degree_interest' => 'int',
    ];

    public function measure()
    {
        return $this->belongsTo(Measure::class);
    }
}
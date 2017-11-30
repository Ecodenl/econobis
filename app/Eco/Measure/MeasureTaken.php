<?php
/**
 * Created by PhpStorm.
 * User: Beheerder
 * Date: 30-11-2017
 * Time: 16:27
 */

namespace App\Eco\Measure;


use App\Eco\EnergyLabel\EnergyLabel;
use Illuminate\Database\Eloquent\Model;

class MeasureTaken extends Model
{
    protected $table = 'measure_taken_address';

    protected $guarded = ['id'];

    protected $dates = [
        'measure_date',
    ];

    public function measure()
    {
        return $this->belongsTo(Measure::class);
    }

    public function energy_label()
    {
        return $this->belongsTo(EnergyLabel::class);
    }
}
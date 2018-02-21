<?php

namespace App\Eco\Intake;

use App\Eco\Intake\Intake;
use Illuminate\Database\Eloquent\Model;

class IntakeStatus extends Model
{
    protected $table = 'intake_status';

     /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id', 'name'
    ];

    public function intakes()
    {;
        return $this->belongsToMany(Intake::class);
    }

}

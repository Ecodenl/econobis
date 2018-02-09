<?php

namespace App\Eco\Intake;

use App\Eco\Intake\Intake;
use Illuminate\Database\Eloquent\Model;

class IntakeSource extends Model
{
    protected $table = 'sources';

     /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id', 'name'
    ];

    public function intakes()
    {
        return $this->belongsToMany(Intake::class);
    }

}

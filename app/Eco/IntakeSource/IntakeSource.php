<?php

namespace App\Eco\IntakeSource;

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

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function intakes()
    {
        return $this->belongsToMany(Intake::class);
    }

    public function getNameSourceAttribute()
    {
        if($this->name_custom) {
            return $this->name_custom;
        } else {
            return $this->name;
        }
    }
}

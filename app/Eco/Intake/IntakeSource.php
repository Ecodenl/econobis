<?php

namespace App\Eco\Intake;

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

}

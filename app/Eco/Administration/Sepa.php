<?php

namespace App\Eco\Administration;

use App\Eco\Intake\Intake;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Sepa extends Model
{
    use SoftDeletes;
    
    protected $table = 'sepas';

     /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id'
    ];

    public function getType()
    {
        return SepaType::get($this->sepa_type_id);
    }

}

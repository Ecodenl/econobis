<?php

namespace App\Eco\District;

use App\Eco\Contact\Contact;
use Illuminate\Database\Eloquent\Model;

class District extends Model
{
    public function coaches()
    {
        return $this->belongsToMany(Contact::class, 'district_has_coaches', 'district_id', 'coach_id');
    }
}

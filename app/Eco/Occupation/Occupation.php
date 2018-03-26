<?php

namespace App\Eco\Occupation;

use Illuminate\Database\Eloquent\Model;

class Occupation extends Model
{
    public function occupationContacts()
    {
        return $this->hasMany(OccupationContact::class);
    }
}

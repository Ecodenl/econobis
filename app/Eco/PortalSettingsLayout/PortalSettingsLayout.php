<?php

namespace App\Eco\PortalSettingsLayout;

use App\Eco\Administration\Administration;
use Illuminate\Database\Eloquent\Model;

class PortalSettingsLayout extends Model
{
    protected $guarded = ['id'];

    protected $dates = [
        'created_at',
        'updated_at',
    ];

    public function administrations()
    {
        return $this->hasMany(Administration::class);
    }

}

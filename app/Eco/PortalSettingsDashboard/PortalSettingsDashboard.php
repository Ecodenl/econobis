<?php

namespace App\Eco\PortalSettingsDashboard;

use App\Eco\Administration\Administration;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PortalSettingsDashboard extends Model
{
    use SoftDeletes;

    protected $guarded = ['id'];

    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    public function administrations()
    {
        return $this->hasMany(Administration::class);
    }

}
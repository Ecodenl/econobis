<?php

namespace App\Eco\PortalSettingsLayout;

use App\Eco\Administration\Administration;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PortalSettingsLayout extends Model
{
    use SoftDeletes;

    protected $guarded = ['id'];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

    public function administrations()
    {
        return $this->hasMany(Administration::class);
    }

}

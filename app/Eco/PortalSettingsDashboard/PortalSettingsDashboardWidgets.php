<?php

namespace App\Eco\PortalSettingsDashboard;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PortalSettingsDashboardWidgets extends Model
{
    use SoftDeletes;

    protected $guarded = ['id'];

    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    public function portalSettingsDashboard()
    {
        return $this->belongsTo(PortalSettingsDashboards::class);
    }

}

<?php

namespace App\Eco\PortalSettingsDashboard;

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

    public function widgets()
    {
        return $this->hasMany(PortalSettingsDashboardWidget::class);
    }

}
